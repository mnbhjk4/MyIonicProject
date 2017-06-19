import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskDetailComponent } from '../../components/task-detail/task-detail'
import { ManageTaskDetailComponent } from '../../components/manage-task-detail/manage-task-detail';
import { TaskProvider,Task,TaskOwner,TaskComment,TaskStatus } from '../../providers/task/task';
import { ProjectProvider,Project,ProjectOwner,ProjectStatus} from '../../providers/project/project';
import { Storage } from '@ionic/storage';
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
    private projectProvider:ProjectProvider,
    private taskProvider:TaskProvider,
    private storage :　Storage) {
  }

  
  ionViewDidLoad() {
    this.storage.get("access_obj").then((access_obj)=>{
      this.getProject(access_obj.uid);
    }); 
  }

  openDetail(task_id : string,title:string){
   this.navCtrl.push(TaskDetailComponent,{task_id : task_id,title:title});
  }
  openManageTaskDetail(task_id:string,title:string){
    this.navCtrl.push(ManageTaskDetailComponent,{task_id : task_id,title:title});
  }

  getProject(uid:string){
    this.projectProvider.getProjectByUid(uid).subscribe(data=>{
      if(data != null &&　data instanceof Array){
        for(let index = 0 ;index < data.length ;index++){
          let project = Project.fromObject(data[index]);
          this.projects.push(project);
        }
      }
    });
  }


}


