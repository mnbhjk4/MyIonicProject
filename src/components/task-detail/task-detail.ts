import { Component ,ViewChildren,QueryList,ElementRef,Renderer} from '@angular/core';
import { NavParams, PopoverController, PopoverOptions,Select } from 'ionic-angular';
import { Task, TaskStatus, TaskComment, TaskOwner } from '../../providers/task/task';
import { MyApp, Employee } from '../../app/app.component';
import { UserListComponent } from '../../components/user-list/user-list';
import { LoginProvider } from '../../providers/login/login';

/**
 * Generated class for the TaskDetailComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'task-detail',
  templateUrl: 'task-detail.html'
})
export class TaskDetailComponent {
  @ViewChildren('subselect')
  subtaskBlock:QueryList<Select>;

  companyUsers: Map<string, Employee> = MyApp.companyUsers;
  task: Task = null;
  newIndex: number = 1;
  constructor(private navParams: NavParams,
    private popoverController: PopoverController,
    private loginProvider : LoginProvider,
    private renderer: Renderer) {
    let obj = this.navParams.get('task');
    if (obj instanceof Task) {
      this.task = obj;
    }
  }

  addRow(parentTask : Task) {
    let newTask = new Task();
    newTask.taskNo = "NEW" + this.newIndex;
    let initTaskStatus = new TaskStatus();
    initTaskStatus.status = "Not Action";
    initTaskStatus.priority = "6";
    initTaskStatus.parentTaskNo  = parentTask.taskNo;
    newTask.taskStatusList.push(initTaskStatus);
    this.task.subTaskList.push(newTask);

    this.newIndex = this.newIndex + 1;
  }
  selectUsers(task: Task) {
    let taskOwnerList = task.taskOwnerList;
    let selectedOwner: Array<string> = [];
    for (let index = 0; index < taskOwnerList.length; index++) {
      selectedOwner.push(taskOwnerList[index].uid);
    }
    let popover = this.popoverController.create(UserListComponent, { selectedOwner: selectedOwner }, { enableBackdropDismiss: false });
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
  removeRow(task: Task) {
    for (let i = 0; i < this.task.subTaskList.length; i++) {
      if (this.task.subTaskList[i].taskNo == task.taskNo) {
        this.task.subTaskList.splice(i, 1);
      }
    }
  }
  changePriority(priority: string) {
    this.task.taskStatusList[0].priority = priority;
  }

  selectTaskStatus(id : any){
    this.subtaskBlock.forEach(item =>{
      if(item.id == id){
        item.open();
      }
    });
  }
}
