import { Component, Input, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, Loading, PopoverController, Select } from 'ionic-angular';
import { MyApp } from '../../../app/app.component';
import { Employee } from '../../../providers/organize/organize';
import { TaskProvider, Task, TaskOwner, TaskComment, TaskStatus } from '../../../providers/task/task';
import { ProjectProvider, Project, ProjectOwner, ProjectStatus } from '../../../providers/project/project';
import { PriorityComponent } from '../priority';
import { UserListComponent } from '../../../components/user-list/user-list';
import { TaskTitleEditorComponent } from '../tasktitleeditor';
 /**
 * Generated class for the TaskPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'task-normal',
  templateUrl: 'normaltask.html',
})
export class NormalTaskCopmonent {
  @Input('parentTask') parentTask: Task = new Task();
  @Input('subTask') subtask: Task = new Task();

  @ViewChildren('subselect')
  subtaskBlock: QueryList<Select>;
  @ViewChildren('subselectPriority')
  subTaskPriority: QueryList<Select>;

  companyUsers: Map<string, Employee> = MyApp.companyUsers;
  constructor(private popoverController: PopoverController) {

  }

  ionViewDidLoad() {


  }
  upTaskIndex(parentTask: Task, goupChildrenTask: Task) {
    for (let index = 0; index < parentTask.subTaskList.length; index++) {
      let cTask = parentTask.subTaskList[index];
      if (cTask.taskNo == goupChildrenTask.taskNo) {
        if (index == 0) {//確認是否為第一個陣列(就不用往上提了吧)
          break;
        } else {//就把它往上提一個Index
          parentTask.subTaskList.splice(index, 1);
          parentTask.subTaskList.splice((index - 1), 0, goupChildrenTask);
          break;//找到了要Break調否則會一直往上跑
        }

      }
    }
  }
  downTaskIndex(parentTask: Task, goupChildrenTask: Task) {
    for (let index = 0; index < parentTask.subTaskList.length; index++) {
      let cTask = parentTask.subTaskList[index];
      if (cTask.taskNo == goupChildrenTask.taskNo) {
        if (index == parentTask.subTaskList.length - 1) {//確認是否為第一個陣列(就不用往下提了吧)
          break;
        } else {//就把它往下提一個Index
          parentTask.subTaskList.splice(index, 1);
          parentTask.subTaskList.splice((index + 1), 0, goupChildrenTask);
          break;//找到了要Break調否則會一直往下掉
        }
      }
    }
  }
  chgSubtaskPriority(task: Task) {
    let pop = this.popoverController.create(PriorityComponent, { priority: task.taskStatusList[0].priority }, { cssClass: "priorityPopup" });

    pop.present();
    pop.onDidDismiss((data) => {
      if (data != null) {
        task.taskStatusList[0].priority = data;
      }
    });
  }
  removeRow(task: Task) {
   task.taskStatusList[0].status = "DELETE";
  }

  selectUsers(task: Task) {
    let taskOwnerList = task.taskOwnerList;
    let selectedOwner: Array<string> = [];
    for (let index = 0; index < taskOwnerList.length; index++) {
      selectedOwner.push(taskOwnerList[index].uid);
    }
    let popover = this.popoverController.create(UserListComponent, { selectedOwner: selectedOwner }, { enableBackdropDismiss: false, cssClass: 'contact-popover' });
    popover.present({

    });
    popover.onDidDismiss((data) => {
      if (data != null) {
        let newTaskOwnerList: Array<TaskOwner> = new Array<TaskOwner>();
        for (let dataIndex = 0; dataIndex < data.length; dataIndex++) {
          let item = data[dataIndex];
          let selectedOwner: TaskOwner = null; //先前已經選取過了
          for (let index = 0; index < taskOwnerList.length; index++) {
            let hadSelected = (taskOwnerList[index].uid == item.id);
            if (hadSelected) {
              selectedOwner = taskOwnerList[index];
            }
          }
          if (selectedOwner != null) {
            newTaskOwnerList.push(selectedOwner)
          } else {
            let newTaskOwner: TaskOwner = new TaskOwner();
            newTaskOwner.joinDate = new Date();
            newTaskOwner.uid = item.id;
            newTaskOwner.taskNo = task.taskNo;
            newTaskOwnerList.push(newTaskOwner);
          }
        }
        //更新Task Owner list
        task.taskOwnerList = newTaskOwnerList;
      }
    });
  }
  selectTaskStatus(id: any) {
    this.subtaskBlock.forEach(item => {
      if (item.getElementRef().nativeElement.id == id) {
        item.open();
      }
    });
  }

  commitComment(task: Task) {
    if(task.tempComment.comment == null || task.tempComment.comment.trim() == ''){
      return;
    }
    task.tempComment.commentDate = new Date();
    task.tempComment.taskNo = task.taskNo;
    task.tempComment.uid = MyApp.targetUser.uid;
    task.taskCommentList.push(task.tempComment);
    task.taskCommentList = task.taskCommentList.sort((a: TaskComment, b: TaskComment) => {
      if (a.commentDate.getTime() > b.commentDate.getTime()) {
        return -1;
      } else if (a.commentDate.getTime() < b.commentDate.getTime()) {
        return 1;
      } else {
        return 0;
      }
    });
    task.tempComment = new TaskComment();
  }

   getUser(uid : string){
    let employee = this.companyUsers.get(uid);
    if(employee == null){
       employee = new Employee();
    }
    return employee;
  }
  editTaskNameAndPriority(task){
    let con = this.popoverController.create(TaskTitleEditorComponent,{task:task},{ cssClass: 'tasktitle'});
    con.present();
  }
}