import { Component, Input, ViewChildren, QueryList } from '@angular/core';
import { NavController, NavParams, Events, LoadingController, Loading, PopoverController, Select, ViewController,AlertController } from 'ionic-angular';
import { MyApp } from '../../../app/app.component';
import { Employee } from '../../../providers/organize/organize';
import { TaskProvider, Task, TaskOwner, TaskComment, TaskStatus } from '../../../providers/task/task';
import { ProjectProvider, Project, ProjectOwner, ProjectStatus } from '../../../providers/project/project';
import { Storage } from '@ionic/storage';
import { LoginProvider } from '../../../providers/login/login';
import { UserListComponent } from '../../../components/user-list/user-list';
import { CustomerProvider,Customer } from '../../../providers/customer/customer';
import { PriorityComponent } from '../../task/priority';
import { ProjectTitleEditorComponent } from './projecttitleeditor'
import { TaskTitleEditorComponent } from '../../task/tasktitleeditor';
import { CustomerSelectorComponent } from '../customerselector';
/**
 * Generated class for the TaskPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'project-editor',
  templateUrl: 'projecteditor.html',
})
export class ProjectEditorComponent {
  @ViewChildren('subselect')
  subtaskBlock: QueryList<Select>;

  newIndex: number = 1;
  companyUsers: Map<string, Employee> = MyApp.companyUsers;
  project: Project;

  targetCustomer :Customer = new Customer();


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private projectProvider: ProjectProvider,
    private popoverController: PopoverController,
    private taskProvider: TaskProvider,
    private storage: Storage,
    private events: Events,
    private loadingController: LoadingController,
    private loginProvider: LoginProvider,
    private customerProvider: CustomerProvider,
    private alertController : AlertController) {
    this.project = this.navParams.get("project");
  }
  ionViewDidLoad() {
    // this.getAllCustomerCountry();
    if(this.project != null && this.project.customerId != null){
      this.getCustomer(this.project.customerId);
    }
  }

  getUser(uid: string) {
    let employee = this.companyUsers.get(uid);
    if (employee == null) {
      employee = new Employee();
    }
    return employee;
  }
  pop() {

    if(this.project.statusList[0].projectName == ''){
      let alert = this.alertController.create({
        title:'Error',
        subTitle:"Project name can't be empty."
      });
      alert.present();
      return;
    }
    if(this.project.customerId == ''){
      let alert = this.alertController.create({
        title:'Error',
        subTitle:"Customer can't be empty."
      });
      alert.present();
      return;
    }else{
      if(this.targetCustomer != null && this.project.customerId != null){
        if(this.project.customerId != this.targetCustomer.customerId){
          this.project.customerId = this.targetCustomer.customerId;
        }
      }
    }
    let loader = this.loadingController.create({
      content: "Saving data..."
    });
    loader.present();
    this.projectProvider.saveProject(this.project).subscribe((data) => {
      if (data != null && (data instanceof Object)) {
        let newTask = Project.fromObject(data);
        this.project = newTask;
        loader.dismiss();
        this.navCtrl.pop().then(a => {
          this.events.publish("refresh:project", { projectNo: this.project.projectNo });
        });
      }
    });
  }

  selectProjectUsers(project: Project) {
    let taskOwnerList = this.project.ownerList;
    let selectedOwner: Array<string> = [];
    for (let index = 0; index < taskOwnerList.length; index++) {
      selectedOwner.push(taskOwnerList[index].uid);
    }
    let popover = this.popoverController.create(UserListComponent, { selectedOwner: selectedOwner }, { enableBackdropDismiss: false, cssClass: 'contact-popover' });
    popover.present({

    });
    popover.onDidDismiss((data) => {
      if (data != null) {
        let newTaskOwnerList: Array<ProjectOwner> = new Array<ProjectOwner>();
        for (let dataIndex = 0; dataIndex < data.length; dataIndex++) {
          let item = data[dataIndex];
          let selectedOwner: ProjectOwner = null; //先前已經選取過了
          for (let index = 0; index < taskOwnerList.length; index++) {
            let hadSelected = (taskOwnerList[index].uid == item.id);
            if (hadSelected) {
              selectedOwner = taskOwnerList[index];
            }
          }
          if (selectedOwner != null) {
            newTaskOwnerList.push(selectedOwner)
          } else {
            let newTaskOwner: ProjectOwner = new ProjectOwner();
            newTaskOwner.joinDate = new Date().toISOString();
            newTaskOwner.uid = item.id;
            newTaskOwner.projectNo = this.project.projectNo;
            newTaskOwnerList.push(newTaskOwner);
          }
        }
        //更新Task Owner list
        this.project.ownerList = newTaskOwnerList;
      }
    });

  }
  selectTaskUsers(task: Task) {
    let taskOwnerList = task.taskOwnerList;
    let selectedOwner: Array<string> = [];
    for (let index = 0; index < taskOwnerList.length; index++) {
      selectedOwner.push(taskOwnerList[index].uid);
    }
    let popover = this.popoverController.create(UserListComponent, { selectedOwner: selectedOwner }, { enableBackdropDismiss: false, cssClass: 'contact-popover' });
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
  changePriority(priority: string) {
    this.project.statusList[0].priority = priority;
  }


  selectTaskStatus(id: any) {
    this.subtaskBlock.forEach(item => {
      if (item.getElementRef().nativeElement.id == id) {
        item.open();
      }
    });
  }

  commitComment(task: Task) {
    if (task.tempComment.comment == null || task.tempComment.comment.trim() == '') {
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

  upTaskIndex(goupChildrenTask: Task) {
    for (let index = 0; index < this.project.taskList.length; index++) {
      let cTask = this.project.taskList[index];
      if (cTask.taskNo == goupChildrenTask.taskNo) {
        if (index == 0) {//確認是否為第一個陣列(就不用往上提了吧)
          break;
        } else {//就把它往上提一個Index
          this.project.taskList.splice(index, 1);
          this.project.taskList.splice((index - 1), 0, goupChildrenTask);
          break;//找到了要Break調否則會一直往上跑
        }

      }
    }
  }
  downTaskIndex(goupChildrenTask: Task) {
    for (let index = 0; index < this.project.taskList.length; index++) {
      let cTask = this.project.taskList[index];
      if (cTask.taskNo == goupChildrenTask.taskNo) {
        if (index == this.project.taskList.length - 1) {//確認是否為第一個陣列(就不用往下提了吧)
          break;
        } else {//就把它往下提一個Index
          this.project.taskList.splice(index, 1);
          this.project.taskList.splice((index + 1), 0, goupChildrenTask);
          break;//找到了要Break調否則會一直往下掉
        }
      }
    }
  }
  removeRow(task: Task) {
    for (let i = 0; i < this.project.taskList.length; i++) {
      if (this.project.taskList[i].taskNo == task.taskNo) {
        this.project.taskList[i].taskStatusList[0].status = "DELETE";
      }
    }
  }
  addRow() {
    let newTask = new Task();
    newTask.taskNo = "NEW" + this.newIndex;
    newTask.customerId = this.project.customerId;
    newTask.projectNumber = this.project.projectNo;
    newTask.type = "NORMAL_TASK";
    let owner = new TaskOwner();
    owner.uid = MyApp.targetUser.uid;
    owner.taskNo = "NEW";
    newTask.taskOwnerList.push(owner);

    let initTaskStatus = new TaskStatus();
    initTaskStatus.status = "Not Action";
    initTaskStatus.priority = "6";
    initTaskStatus.taskNo = "NEW" + this.newIndex;
    newTask.taskStatusList.push(initTaskStatus);
    this.project.taskList.push(newTask);

    this.newIndex = this.newIndex + 1;
  }
  editProjectNameAndPriority(){
    let con = this.popoverController.create(ProjectTitleEditorComponent,{project:this.project},{ cssClass: 'projecttitle'});
    con.present();
  }
  editTaskNameAndPriority(task){
    let con = this.popoverController.create(TaskTitleEditorComponent,{task:task},{ cssClass: 'tasktitle'});
    con.present();
  }
  
  getCustomer(cutomerId : string){
    this.customerProvider.getCustomer(cutomerId).subscribe(data=>{
      this.targetCustomer = Customer.fromObject(data);
    });
  }
  findCustomer(customer : Customer){
   let con = this.popoverController.create(CustomerSelectorComponent,{customer:customer},{ cssClass: 'customerselector'});
    con.present();
    con.onDidDismiss(data=>{
      if(data.customer != null){
        this.targetCustomer = Customer.fromObject(data.customer);
      }
    });
  }
}


