import { Component, Input, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, Loading, PopoverController, Select } from 'ionic-angular';
import { MyApp } from '../../../app/app.component';
import { Employee } from '../../../providers/organize/organize';
import { TaskProvider, Task, TaskOwner, TaskComment, TaskStatus } from '../../../providers/task/task';
import { ProjectProvider, Project, ProjectOwner, ProjectStatus } from '../../../providers/project/project';
import { PriorityComponent } from '../priority';
import { UserListComponent } from '../../../components/user-list/user-list';
import { QuotationEditorComponent } from './quotationeditor';
import { Storage } from '@ionic/storage';
import { QuotationProvider, Quotation, QuotationItem, QuotationItemDetail } from '../../../providers/quotation/quotation';

@Component({
  selector: 'task-quotation',
  templateUrl: 'quotationtask.html',
})
export class QuotationTaskComponent implements AfterViewInit {
  @Input('parentTask') parentTask: Task = new Task();
  @Input('subTask') subtask: Task = new Task();

  @ViewChildren('subselect')
  subtaskBlock: QueryList<Select>;
  @ViewChildren('subselectPriority')
  subTaskPriority: QueryList<Select>;

  companyUsers: Map<string, Employee> = MyApp.companyUsers;
  quotationLineArray: Array<QuotationItem> = [];
  quotation: Quotation = new Quotation();
  totalPrice = 0;
  currency = "TWD";
  constructor(private popoverController: PopoverController,
    private navcontroller: NavController,
    private storage: Storage,
    private quotationProvider: QuotationProvider,
    private events: Events) {
  }

  ngAfterViewInit() {
    if (this.subtask != null) {

      if (this.subtask.taskOwnerList.length == 0) {
        let to = new TaskOwner();
        to.uid = MyApp.targetUser.uid;
        to.taskNo = this.subtask.taskNo;
        this.subtask.taskOwnerList.push(to);
      }
      this.quotationProvider.getQuotation(this.subtask.taskNo).subscribe(data => {
        if (data.quotation != null) {
          this.quotation = Quotation.fromObject(data.quotation);
          this.subtask["quotation"] = this.quotation;
        }
        if (data.quotationItemList != null && data.quotationItemList instanceof Array) {
          for (let index = 0; index < data.quotationItemList.length; index++) {
            this.quotationLineArray.push(QuotationItem.fromObject(data.quotationItemList[index]));
          }
          this.subtask["quotationItemList"] = this.quotationLineArray;
        }
      });

      this.subtask["quotation"] = this.quotation;
      this.subtask["quotationItemList"] = this.quotationLineArray;
      this.subtask.type = "QUOTATION_TASK";
      if (this.quotation.taskNo == null) {
        this.quotation.taskNo = this.subtask.taskNo;
      }
    }

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
  removeRow(task: Task) {
    task.taskStatusList[0].status = "DELETE";
  }

  selectUsers(task: Task) {
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

  getUser(uid: string) {
    let employee = this.companyUsers.get(uid);
    if (employee == null) {
      employee = new Employee();
    }
    return employee;
  }

  addQuotationRow(event) {
    let line = new QuotationItem();
    line.itemIndex = this.quotationLineArray.length - 1;
    this.quotationLineArray.push(line);
  }

  openQuotationEditor(line: QuotationItem) {
    this.navcontroller.push(QuotationEditorComponent, { line: line });
  }
  openPriceFile(priceFile) {
    priceFile.click();
  }
  uploadPriceFile(event) {
    let files: FileList = event.target.files;
    if (files.length > 0) {
      let file = files.item(0);
      this.storage.get("access_obj").then(value => {
        this.quotationProvider.uploadPriceFile(value.access_token, value.uid, file).subscribe((data) => {
          console.log(data);
        });
      });
    }
  }
  changeExtendPrice(line: QuotationItem) {
    let extenedPrice = Number(line.unitPrice) * Number(line.qtr);
    line.extenedPrice = extenedPrice;
    this.refreshTotalPrice();
  }
  refreshTotalPrice() {
    this.totalPrice = 0;
    if (this.quotationLineArray != null && this.quotationLineArray[0].currency != null) {
      this.currency = this.quotationLineArray[0].currency;
    }
    for (let index = 0; index < this.quotationLineArray.length; index++) {
      let quotationLine = this.quotationLineArray[index];
      this.totalPrice += Number(quotationLine.extenedPrice);
    }
  }
}
