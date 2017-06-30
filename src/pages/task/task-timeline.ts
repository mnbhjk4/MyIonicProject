import { Component, Input,ViewChild,ElementRef,Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, Loading } from 'ionic-angular';
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
@Component({
    selector: 'task-timeline',
    templateUrl: 'task-timeline.html',
})
export class TaskTimelineComponent {
    @ViewChild("ganttgrid")
    ganttgrid : ElementRef;
    @ViewChild("ganttheadergrid")
    ganttheadergrid : ElementRef;

    companyUserMap: Map<string, Employee> = MyApp.companyUsers;

    dataTime = []
    rowDetailList: Array<RowDetail> = [];
    @Input()
    projects: Array<Project> = [];
    
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private projectProvider: ProjectProvider,
        private taskProvider: TaskProvider,
        private storage: Storage,
        private events: Events,
        private loadingController: LoadingController,
        private renderer : Renderer) {
        this.dataTime = Array(50);

    }
    ngOnChanges(arg: any) {
        if (arg.projects.currentValue instanceof Array) {
            let projects = arg.projects.currentValue;
            for (let i = 0; i < projects.length; i++) {
                let project = projects[i];
                let row = new RowDetail();
                row.name = project.statusList[0].projectName;
                row.projectNo = project.projectNo;
                this.rowDetailList.push(row);
                for (let j = 0; j < project.taskList.length; j++) {
                    let task = project.taskList[j];
                    let row = new RowDetail();
                    row.name = task.name;
                    row.projectNo = project.projectNo;
                    row.taskNo = task.taskNo;
                    this.rowDetailList.push(row);
                    for (let k = 0; k < task.subTaskList.length; k++) {
                        let subtask = task.subTaskList[k];
                        let row = new RowDetail();
                        row.name = task.name;
                        row.projectNo = project.projectNo;
                        row.taskNo = subtask.taskNo;
                        row.parentTaskNo = task.taskNo;
                        this.rowDetailList.push(row);
                    }
                }
            }
        }
    }
    openDetail(task: Task) {
        this.navCtrl.push(TaskDetailComponent, { task: task });
    }
    openManageTaskDetail(task_id: string, title: string) {
        this.navCtrl.push(ManageTaskDetailComponent, { task_id: task_id, title: title });
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

    onScroll(events){
        if(this.ganttgrid.nativeElement.scrollLeft == 0){
            this.renderer.setElementClass(this.ganttheadergrid.nativeElement,"scroll",false);
        }else{
            this.renderer.setElementClass(this.ganttheadergrid.nativeElement,"scroll",true);
            this.ganttheadergrid.nativeElement.top = this.ganttgrid.nativeElement.scrollTop;
        }
        
    }
}

export class RowDetail {
    projectNo: string;
    taskNo: string;
    parentTaskNo: string;
    name: string;
    startDate: number;
    endDate: number;
}