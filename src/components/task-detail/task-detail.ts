import { Component, ViewChildren, QueryList, ElementRef, Pipe } from '@angular/core';
import { NavParams, PopoverController, PopoverOptions, Select, Events,NavController,ViewController,LoadingController  } from 'ionic-angular';
import { Task, TaskStatus, TaskComment, TaskOwner,TaskProvider } from '../../providers/task/task';
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
  subtaskBlock: QueryList<Select>;

  @ViewChildren('subselectPriority')
  subTaskPriority: QueryList<Select>;

  companyUsers: Map<string, Employee> = MyApp.companyUsers;
  task: Task = null;
  newIndex: number = 1;
  constructor(private navParams: NavParams,
    private popoverController: PopoverController,
    private loginProvider: LoginProvider,
    private taskProvider : TaskProvider,
    private navCtrl: NavController,
    private loadingController : LoadingController,
    private events : Events ) {
    let obj = this.navParams.get('task');
    if (obj instanceof Task) {
      this.task = obj;
    }
  }

  pop(){
    let loader = this.loadingController.create({
      content : "Saveing data..."
    });
    loader.present();
     this.taskProvider.saveTask(this.task).subscribe((data)=>{
     if(data != null && (data instanceof Object || data.indexOf("Error") == -1)){
       let newTask = Task.fromObject(data);
       this.task = newTask;
       loader.dismiss();
       this.navCtrl.pop().then( a=>{
         this.events.publish("refresh:project",{projectNo:this.task.projectNumber});
       });
     }
    });
    
  }
  addRow(parentTask: Task) {
    let newTask = new Task();
    newTask.taskNo = "NEW" + this.newIndex;
    newTask.customerId = parentTask.customerId;
    newTask.parentTaskNo = parentTask.taskNo;
    newTask.projectNumber = parentTask.projectNumber;

    let initTaskStatus = new TaskStatus();
    initTaskStatus.status = "Not Action";
    initTaskStatus.priority = "6";
    initTaskStatus.parentTaskNo = parentTask.taskNo;
    initTaskStatus.taskNo = "NEW"+this.newIndex;
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

  selectTaskStatus(id: any) {
    this.subtaskBlock.forEach(item => {
      if (item.getElementRef().nativeElement.id == id) {
        item.open();
      }
    });
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

  uploadComment(taskComment: TaskComment) {

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
}

@Component({
  selector: 'task-detail',
  template: ` <button ion-button icon-only class="priority-1" (click)="changePriority('1')">
        <div *ngIf="priority == '1';else else1">
          <ion-icon name="ios-checkmark" ></ion-icon>
        </div>
        <ng-template #else1>
          <ion-icon name="" ></ion-icon>
        </ng-template>
      </button>
      <button ion-button icon-only class="priority-2" (click)="changePriority('2')">
         <div *ngIf="priority  == '2';else else2">
          <ion-icon name="ios-checkmark" ></ion-icon>
        </div>
        <ng-template #else2>
         <ion-icon name="" ></ion-icon>
        </ng-template>
      </button>
      <button ion-button icon-only class="priority-3" (click)="changePriority('3')">
        <div *ngIf="priority  == '3';else else3">
          <ion-icon name="ios-checkmark" ></ion-icon>
        </div>
        <ng-template #else3>
          <ion-icon name="" ></ion-icon>
        </ng-template>
      </button>
      <button ion-button icon-only class="priority-4" (click)="changePriority('4')">
        <div *ngIf="priority  == '4';else else4">
          <ion-icon name="ios-checkmark" ></ion-icon>
        </div>
        <ng-template #else4>
          <ion-icon name="" ></ion-icon>
        </ng-template>
      </button>
      <button ion-button icon-only class="priority-5" (click)="changePriority('5')">
        <div *ngIf="priority  == '5';else else5">
          <ion-icon name="ios-checkmark" ></ion-icon>
        </div>
        <ng-template #else5>
          <ion-icon name="" ></ion-icon>
        </ng-template>
      </button>
      <button ion-button icon-only class="priority-6" (click)="changePriority('6')">
        <div *ngIf="priority  == '6';else else6">
          <ion-icon name="ios-checkmark" ></ion-icon>
        </div>
        <ng-template #else6>
          <ion-icon name="" ></ion-icon>
        </ng-template>
      </button>
      <button ion-button (click)="applyPriority()"><ion-icon name="md-checkmark">Apply</ion-icon></button>`
})
export class PriorityComponent {
  priority: string = "6";
  constructor(public viewCtrl: ViewController) {
    let nowPriority = this.viewCtrl.getNavParams().data["priority"];
    this.priority = nowPriority;
  }

  changePriority(priority: string) {
    this.priority = priority;
  }

  applyPriority() {
    this.viewCtrl.dismiss(this.priority);
  }
}

