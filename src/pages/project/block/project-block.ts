import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, Loading } from 'ionic-angular';
import { TaskDetailComponent } from '../../task/task-detail';
import { MyApp } from '../../../app/app.component';
import { Employee} from '../../../providers/organize/organize';
import { TaskProvider, Task, TaskOwner, TaskComment, TaskStatus } from '../../../providers/task/task';
import { ProjectProvider, Project, ProjectOwner, ProjectStatus } from '../../../providers/project/project';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the TaskPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'project-block',
    templateUrl: 'project-block.html',
})
export class ProjectBlockComponent {
    companyUserMap: Map<string, Employee> = MyApp.companyUsers;
    
    @Input()
    projects: Array<Project> = [];
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private projectProvider: ProjectProvider,
        private taskProvider: TaskProvider,
        private storage: Storage,
        private events: Events,
        private loadingController: LoadingController) {
        
    }
    openDetail(task: Task) {
        this.navCtrl.push(TaskDetailComponent, { task: task });
    }
    openManageTaskDetail(task_id: string, title: string) {
        this.navCtrl.push(TaskDetailComponent, { task_id: task_id, title: title });
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