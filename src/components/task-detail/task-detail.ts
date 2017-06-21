import { Component } from '@angular/core';
import { NavParams,PopoverController  } from 'ionic-angular';
import { Task,TaskStatus,TaskComment,TaskOwner } from '../../providers/task/task';
import { MyApp,UserInfo } from '../../app/app.component';
import { UserListComponent } from '../../components/user-list/user-list';

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
  companyUsers : Map<string,UserInfo> = MyApp.companyUsers;
  task : Task = null;
  priority : string = "6";
  newIndex : number = 1;
  constructor(private navParams: NavParams,
    private popoverController:PopoverController ) {
    let obj = this.navParams.get('task');
    if(obj instanceof Task){
      this.task = obj;
      console.log(MyApp.companyUsers);
    }
  }

  addRow(){
    let newTask = new Task();
    newTask.taskNo = "NEW"+this.newIndex;
    let initTaskStatus = new TaskStatus();
    initTaskStatus.status = "Not action";
    newTask.taskStatusList.push(initTaskStatus);
    this.task.subTaskList.push(newTask);

    this.newIndex = this.newIndex+1;
  }
  selectUsers(event){
    let popover = this.popoverController.create(UserListComponent);
    popover.present({
      ev: event
    });
  }
  removeRow(task : Task){
    for(let i = 0;i < this.task.subTaskList.length;i++){
      if(this.task.subTaskList[i].taskNo == task.taskNo){
        this.task.subTaskList.splice(i,1);
      }
    }
  }
  changePriority(priority :string){
    this.priority = priority;
  }
}