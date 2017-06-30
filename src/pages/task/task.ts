import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events,LoadingController,Loading } from 'ionic-angular';
import { TaskDetailComponent } from '../../components/task-detail/task-detail'
import { ManageTaskDetailComponent } from '../../components/manage-task-detail/manage-task-detail';
import { MyApp, Employee } from '../../app/app.component';
import { TaskProvider, Task, TaskOwner, TaskComment, TaskStatus } from '../../providers/task/task';
import { ProjectProvider, Project, ProjectOwner, ProjectStatus } from '../../providers/project/project';
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
  private companyUserMap: Map<string, Employee> = MyApp.companyUsers;
  private plannerContent: string = "my-plans";
  private projects: Array<Project> = [];
  private loading : Loading;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private projectProvider: ProjectProvider,
    private taskProvider: TaskProvider,
    private storage: 　Storage,
    private events: Events,
    private loadingController : LoadingController) {
    //顯示載入中
    this.loading = this.loadingController.create({
      content : "Loading projects"
    });
    this.loading.present();
    //當Task detail pop回來時會觸發本事件後指定要哪一個Project需要進行內容更新
    this.events.subscribe("refresh:project", (event) => {
      let targetProjectNo = event.projectNo;
      for (let i = 0; i < 　this.projects.length; i++) {
        if (this.projects[i].projectNo == targetProjectNo) {
          this.projects[i].taskList.splice(0,this.projects[i].taskList.length);
          this.taskProvider.getTaskByProjectNo(this.projects[i].projectNo).subscribe((taskArray) => {
            for (let taskIndex = 0; taskIndex < taskArray.length; taskIndex++) {
              let task = Task.fromObject(taskArray[taskIndex]);
              
              this.projects[i].taskList.push(task);
            }
          });
          break;
        }
      }
    });
  }


  ionViewDidLoad() {
    this.storage.get("access_obj").then((access_obj) => {
      this.getProject(access_obj.uid);
    });
  }



  openDetail(task: Task) {
    this.navCtrl.push(TaskDetailComponent, { task: task });
  }
  openManageTaskDetail(task_id: string, title: string) {
    this.navCtrl.push(ManageTaskDetailComponent, { task_id: task_id, title: title });
  }

  getProject(uid: string) {
    this.projectProvider.getProjectByUid(uid).subscribe(data => {
      if (data != null && 　data instanceof Array) {
        for (let index = 0; index < data.length; index++) {
          let project = Project.fromObject(data[index]);
          this.projects.push(project);
          this.taskProvider.getTaskByProjectNo(project.projectNo).subscribe((taskArray) => {
            for (let taskIndex = 0; taskIndex < taskArray.length; taskIndex++) {
              let task = Task.fromObject(taskArray[taskIndex]);
              project.taskList.push(task);
            }
          });
        }
        this.loading.dismiss();
      }
    });
  }

  setProgess(task: Task) {
    let total = task.subTaskList.length;
    let complete = 0;
    for (let index = 0; index < task.subTaskList.length; index++) {
      let t = task.subTaskList[index];
      if (t.taskStatusList[0].status == "Done") {
        complete++;
      }
    }
    return complete + "/" + total;
  }
}


