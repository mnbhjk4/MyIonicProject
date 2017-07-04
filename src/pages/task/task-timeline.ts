import { Component, Input, ViewChild, ElementRef, Renderer, ViewChildren } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, Loading } from 'ionic-angular';
import { TaskDetailComponent } from '../../components/task-detail/task-detail'
import { ManageTaskDetailComponent } from '../../components/manage-task-detail/manage-task-detail';
import { MyApp, Employee } from '../../app/app.component';
import { TaskProvider, Task, TaskOwner, TaskComment, TaskStatus } from '../../providers/task/task';
import { ProjectProvider, Project, ProjectOwner, ProjectStatus } from '../../providers/project/project';
import { Storage } from '@ionic/storage';
import { CalanderService } from "..//leave/calander.service";


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
    ganttgrid: ElementRef;
    @ViewChild("ganttheadergrid")
    ganttheadergrid: ElementRef;
    @ViewChild("ganttdategrid")
    ganttdategrid: ElementRef;
    @ViewChild("ganttDateCol")
    ganttDateCol : ElementRef;

    @ViewChildren("project")
    projectElements: ElementRef;
    @ViewChildren("task")
    taskElements: ElementRef;
    @ViewChildren("subtask")
    subtaskElements: ElementRef;

    @ViewChild("verticalScroll")
    verticalScroll: ElementRef;
    @ViewChild("horizontalScroll")
    horizontalScroll: ElementRef;

    companyUserMap: Map<string, Employee> = MyApp.companyUsers;
    displayMethod = "day";
    rowDetailList: Array<RowDetail> = [];
    totalWidthArray = new Array(0);
    rowHeight = 0;
    rowHeigtBase = 30; 
    rowWidth = 24;
    rowWidthBase = 140;

    minDate = new Date();
    //顯示時間
    dateList:Array<{year:number,month:Array<any>,week:Array<any>,day:Array<any>}>= [];

    @Input()
    projects: Array<Project> = [];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private projectProvider: ProjectProvider,
        private taskProvider: TaskProvider,
        private storage: Storage,
        private events: Events,
        private loadingController: LoadingController,
        private renderer: Renderer,
        private calanderService : CalanderService) {
    }
    ngOnChanges(arg: any) {
        let minDate = new Date(2199,1,1);
        let maxDate = new Date(2000,1,1);
        if (arg.projects.currentValue instanceof Array) {
            let projects = arg.projects.currentValue;

            for (let i = 0; i < projects.length; i++) {
                let project = projects[i];
                let row = new RowDetail();
                row.name = project.statusList[0].projectName;
                row.projectNo = project.projectNo;
                row.project = project;
                row.type = "project";
                this.rowDetailList.push(row);
                //確認時間
                let startDate = project.statusList[0].startDate;
                let dueDate = project.statusList[0].dueDate;
                if(startDate!= null && startDate.getTime() < minDate.getTime()){
                    minDate = startDate;
                }
                 if(dueDate!= null &&  dueDate.getTime() > maxDate.getTime()){
                    maxDate = dueDate;
                }
                for (let j = 0; j < project.taskList.length; j++) {
                    let task = project.taskList[j];
                    let row = new RowDetail();
                    row.parentNo = project.projectNo;
                    row.name = task.name;
                    row.projectNo = project.projectNo;
                    row.taskNo = task.taskNo;
                    row.project = project;
                    row.task = task;
                    row.type = "task";
                    this.rowDetailList.push(row);
                    for (let k = 0; k < task.subTaskList.length; k++) {
                        let subtask = task.subTaskList[k];
                        let row = new RowDetail();
                        row.name = task.name;
                        row.parentNo = task.taskNo;
                        row.projectNo = project.projectNo;
                        row.subTaskNo = subtask.taskNo;
                        row.taskNo = task.taskNo;
                        row.project = project;
                        row.task = task;
                        row.subtask = subtask;
                        row.type = "subtask";
                        this.rowDetailList.push(row);
                    }
                }
            }
            this.refreshRowHeight();
            this.minDate = new Date(minDate);
            this.dataRange(minDate,maxDate);
           
        let totalLength = 0;
           for(let index = 0 ;index < this.dateList.length;index++){
               let date = this.dateList[index];
               totalLength+= date.week.length;
           }
           this.rowWidth = totalLength;
           this.totalWidthArray = new Array(totalLength);
        }
    }
    openDetail(task: Task) {
        this.navCtrl.push(TaskDetailComponent, { task: task });
    }
    openManageTaskDetail(task_id: string, title: string) {
        this.navCtrl.push(ManageTaskDetailComponent, { task_id: task_id, title: title });
    }

    dataRange(minDate : Date,maxDate : Date){
        let dateList = {year:minDate.getFullYear(),month:[],week:[],day:[]};
        this.dateList.push(dateList);
        let year = minDate.getFullYear();
        let month = minDate.getMonth()+1;
        let week = this.calanderService.getWeekNumber(minDate);
        //年
        dateList.month.push((minDate.getMonth() + 1));
        dateList.week.push(week);
        while(minDate.getTime() < maxDate.getTime()){
            //年
            if(year != minDate.getFullYear()){
                year = minDate.getFullYear();
                dateList = {year:minDate.getFullYear(),month:[],week:[],day:[]};
                this.dateList.push(dateList);
            }
             //月
            if(month != minDate.getMonth() + 1){
                 dateList.month.push((minDate.getMonth() + 1));
                 month = minDate.getMonth() + 1;
            }
            //周
            let newweek = this.calanderService.getWeekNumber(minDate);
            if(week != newweek){
                 dateList.week.push(newweek);
                 week = newweek;
            }   
            //日
            while(minDate.getDay() != 1){
                dateList.day.push(minDate.getDate());
                let newDate = minDate.getDate()+1;
                minDate.setDate(newDate);
            }
             if(minDate.getDay() == 1){//周一要近一天
                dateList.day.push(minDate.getDate());
                let newDate = minDate.getDate()+1;
                minDate.setDate(newDate);
            }
        }
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

    //處理垂直移動
    onScrollVertical(events) {
        let scrollTop = events.target.scrollTop;
        this.ganttheadergrid.nativeElement.scrollTop = scrollTop;
        this.ganttdategrid.nativeElement.scrollTop = scrollTop;
    }
    //處理水平移動(不用移動Gantt Header Grid)
    onScrollHorizontal(events) {
        let scrollLeft = events.target.scrollLeft;
        this.ganttdategrid.nativeElement.scrollLeft = scrollLeft;
        this.ganttDateCol.nativeElement.scrollLeft = scrollLeft;

    }
    //當滑鼠直接SCROLL將垂直的部分進行可以同步動作
    mouseWheelOnGanttdategrid(events) {
        if (events.deltaY < 0) {//向上
            if (this.verticalScroll.nativeElement.scrollTop - 90 > 0) {
                this.verticalScroll.nativeElement.scrollTop = this.verticalScroll.nativeElement.scrollTop - 90;
            } else {
                this.verticalScroll.nativeElement.scrollTop = 0;
            }
        } else {//向下
            if (this.verticalScroll.nativeElement.scrollTop + 90 < this.verticalScroll.nativeElement.scrollHeight) {
                this.verticalScroll.nativeElement.scrollTop = this.verticalScroll.nativeElement.scrollTop + 90;
            } else {
                this.verticalScroll.nativeElement.scrollTop = this.verticalScroll.nativeElement.scrollHeight;
            }
        }
    }

    toggleRow(events, row) {
        if (row.type == "project") {
            let child = this.ganttheadergrid.nativeElement.querySelectorAll("." + row.projectNo);
            for (let index = 0; index < child.length; index++) {
                if (child[index].classList.contains("hide")) {
                    this.renderer.setElementClass(child[index], "show", true);
                    this.renderer.setElementClass(child[index], "hide", false);
                } else {
                    this.renderer.setElementClass(child[index], "show", false);
                    this.renderer.setElementClass(child[index], "hide", true);
                }
            }
            child = this.ganttdategrid.nativeElement.querySelectorAll("." + row.projectNo);
            for (let index = 0; index < child.length; index++) {
                if (child[index].classList.contains("hide")) {
                    this.renderer.setElementClass(child[index], "show", true);
                    this.renderer.setElementClass(child[index], "hide", false);
                } else {
                    this.renderer.setElementClass(child[index], "show", false);
                    this.renderer.setElementClass(child[index], "hide", true);
                }
            }
            this.refreshRowHeight();
        } else if (row.type == "task") {
            let child = this.ganttheadergrid.nativeElement.querySelectorAll("." + row.taskNo);
            for (let index = 0; index < child.length; index++) {
                if (child[index].classList.contains("hide")) {
                    this.renderer.setElementClass(child[index], "show", true);
                    this.renderer.setElementClass(child[index], "hide", false);
                } else {
                    this.renderer.setElementClass(child[index], "show", false);
                    this.renderer.setElementClass(child[index], "hide", true);
                }
            }
            child = this.ganttdategrid.nativeElement.querySelectorAll("." + row.taskNo);
            for (let index = 0; index < child.length; index++) {
                if (child[index].classList.contains("hide")) {
                    this.renderer.setElementClass(child[index], "show", true);
                    this.renderer.setElementClass(child[index], "hide", false);
                } else {
                    this.renderer.setElementClass(child[index], "show", false);
                    this.renderer.setElementClass(child[index], "hide", true);
                }
            }
            this.refreshRowHeight();
        }
    }
    refreshRowHeight() {
        let child = this.ganttheadergrid.nativeElement.querySelectorAll(".header-row");
        let showCnt = 0;
        for (let index = 0; index < child.length; index++) {
            if (child[index].classList.contains("show")) {
                showCnt++;
            }
        }
        this.rowHeight = showCnt;
    }
    hideShowRow(row) {
        if (row.parentNo == null) {
            return 'show';
        } else {
            return 'hide';
        }
    }

    listOfListRow(date,type){
        let array = [];
        if(type == "month"){
            for(let i=0;i<date.length;i++){
                for(let j=0 ; j<date[i].month.length;j++){
                    array.push({d:date[i].month[j],length:date[i].week.length});
                }
            }
        }else if(type == "week"){
            for(let i=0;i<date.length;i++){
                for(let j=0 ; j<date[i].week.length;j++){
                      array.push(date[i].week[j]);
                }
              
            }
        }else if(type == "day"){
            for(let i=0;i<date.length;i++){
                for(let j=0 ; j<date[i].day.length;j++){
                      array.push(date[i].day[j]);
                }
            }
        }
        return array;
    }
    dateColorArrayMarker(row){
        if(row.type == 'project'){
            let startDate = row.project.statusList[0].startDate;
            let dueDate = row.project.statusList[0].dueDate;
            let priority = row.project.statusList[0].priority;
            if(startDate == null || dueDate == null || priority == null) return {};
           

            let startDay = Math.abs(((startDate.getTime() - this.minDate.getTime())/86400000));
            let dueDay = Math.abs(((dueDate.getTime() - this.minDate.getTime())/86400000)) ;
            let css = {position:'absolute',
                left:(Math.ceil(startDay * (this.rowWidthBase / 7)))+'px',
                width:(Math.ceil(dueDay - startDay) * (this.rowWidthBase / 7))+'px',
                background:this.getPriorityColor(priority)};
            return css;
        }else if(row.type == 'task'){
            let startDate = row.task.taskStatusList[0].startDate;
            let dueDate = row.task.taskStatusList[0].dueDate;
            let priority = row.task.taskStatusList[0].priority;
            if(startDate == null || dueDate == null || priority == null) return {};
            let startDay = Math.abs(((startDate.getTime() - this.minDate.getTime())/86400000));
            let dueDay = Math.abs(((dueDate.getTime() - this.minDate.getTime())/86400000)) ;
            let css = {position:'absolute',
                left:(Math.ceil(startDay * (this.rowWidthBase/7)))+'px',
                width:(Math.ceil(dueDay - startDay) * (this.rowWidthBase/7))+'px',
                background:this.getPriorityColor(priority)};
            return css;
        }else if(row.type == 'subtask'){
            let startDate = row.subtask.taskStatusList[0].startDate;
            let dueDate = row.subtask.taskStatusList[0].dueDate;
            let priority = row.subtask.taskStatusList[0].priority;
            if(startDate == null || dueDate == null || priority == null) return {};
            let startDay = Math.abs(((startDate.getTime() - this.minDate.getTime())/86400000));
            let dueDay = Math.abs(((dueDate.getTime() - this.minDate.getTime())/86400000)) ;
            let css = {position:'absolute',
                left:(Math.ceil(startDay * (this.rowWidthBase/7)))+'px',
                width:(Math.ceil(dueDay - startDay) * (this.rowWidthBase/7))+'px',
                background:this.getPriorityColor(priority)};
            return css;
        }

        return "";
    }

    getPriorityColor(priority){
        let newPriority = "#FFFFFF";
        if(priority == 1) newPriority = "#F000FF";
        if(priority == 2) newPriority = "#FF4800";
        if(priority == 3) newPriority = "#FFA200";
        if(priority == 4) newPriority = "#B6E903";
        if(priority == 5) newPriority = "#01AB99";
        if(priority == 6) newPriority = "#00DEFF";
        return newPriority;
    }
}

export class RowDetail {
    parentNo: string;
    projectNo: string;
    taskNo: string;
    subTaskNo: string;
    name: string;
    startDate: number;
    endDate: number;

    type: string;
    project: Project;
    task: Task;
    subtask: Task;
}