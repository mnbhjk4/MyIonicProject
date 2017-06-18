import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskDetailComponent } from '../../components/task-detail/task-detail'
import { ManageTaskDetailComponent } from '../../components/manage-task-detail/manage-task-detail';
import {TaskProvider} from '../../providers/task/task'
/**
 * Generated class for the TaskPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {
private plannerContent : string = "my-plans";
  private projects:Array<Project> =[];
  private manageProjects:Array<Project> = [];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private taskProvider:TaskProvider) {
  }

  
  ionViewDidLoad() {
    for(let index = 1 ; index <= 5;index++){
      let proj = this.demoProjectData(index.toString(),"Test"+index,index.toString())
      let taskCount = this.getRandomInt(1,10);
      for(let taskIndex=1;taskIndex <= taskCount;taskIndex++){
        this.demoTaskData(
        proj,
        taskIndex.toString(),
        ["Agi_wu"],
        "This title is "+this.getRandomInt(0,100).toString(),
        new Date(),taskIndex%5 == 0?"1":(taskIndex%5).toString(),
        [{checked:true,itemTitle:"Testing1"},{checked:true,itemTitle:"Testing2"},{checked:false,itemTitle:"Testing3"},{checked:false,itemTitle:"Testing4"},{checked:false,itemTitle:"Testing5"}]);
      }
      this.projects.push(proj);
       this.manageProjects.push(proj);
    }
  }

  openDetail(task_id : string,title:string){
   this.navCtrl.push(TaskDetailComponent,{task_id : task_id,title:title});
  }
  openManageTaskDetail(task_id:string,title:string){
    this.navCtrl.push(ManageTaskDetailComponent,{task_id : task_id,title:title});
  }

  demoProjectData(id:string,title:string,priority:string){
    let project = new Project();
    project.id= id;
    project.title=title;
    project.priority = priority;
    return project;
  }
  demoTaskData(project:Project,task_id:string,owner:Array<string>
    ,title:string,endDate:Date,priority:string,
    itemArray:Array<{checked:boolean,itemTitle:string}>){
    let task = new Task();
    task.id = task_id;
    task.endDate = endDate;
    task.owner = owner;
    task.title = title;
    task.priority = priority;
    task.itemArray = itemArray;
    project.taskArray.push(task);
  }

   getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}


