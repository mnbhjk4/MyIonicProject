import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, Loading } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { Employee } from '../../providers/organize/organize';
import { TaskProvider, Task, TaskOwner, TaskComment, TaskStatus } from '../../providers/task/task';
import { ProjectProvider, Project, ProjectOwner, ProjectStatus } from '../../providers/project/project';
import { Storage } from '@ionic/storage';
import { ProjectEditorComponent }from './projecteditor/projecteditor';
/**
 * Generated class for the TaskPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'project.html',
})
export class ProjectPage {
  private companyUserMap: Map<string, Employee> = MyApp.companyUsers;
  private plannerContent: string = "my-plans";

  private projects: Array<Project> = [];
  private loading: Loading;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private projectProvider: ProjectProvider,
    private taskProvider: TaskProvider,
    private storage: Storage,
    private events: Events,
    private loadingController: LoadingController) {

    //顯示載入中
    this.loading = this.loadingController.create({
      content: "Loading projects"
    });
    this.loading.present();
    //當Task detail pop回來時會觸發本事件後指定要哪一個Project需要進行內容更新
    this.events.subscribe("refresh:project", (event) => {
      let targetProjectNo = event.projectNo;
      for (let i = 0; i < this.projects.length; i++) {
        if (this.projects[i].projectNo == targetProjectNo) {
          this.projects[i].taskList.splice(0, this.projects[i].taskList.length);
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


  getProject(uid: string) {
    this.projectProvider.getProjectByUid(uid).subscribe(data => {
      if (data != null && data instanceof Array) {
        for (let index = 0; index < data.length; index++) {
          let project = Project.fromObject(data[index].project);
          for (let taskIndex = 0; taskIndex < data[index].task.length; taskIndex++) {
            let task = Task.fromObject(data[index].task[taskIndex]);
            project.taskList.push(task);
          }
          this.projects.push(project);
        }
        this.loading.dismiss();
      }
    });
  }

  createNewProject() {
    this.projectProvider.createProject(MyApp.targetUser).subscribe(data => {
      this.navCtrl.push(ProjectEditorComponent, { project: Project.fromObject(data) });
    });
  }
}


