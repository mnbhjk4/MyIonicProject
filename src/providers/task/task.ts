import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { DatePipe } from '@angular/common';
import 'rxjs/add/operator/map';
import * as myApp from '../../app/app.component';
/*
  Generated class for the TaskProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TaskProvider {
  private server: string = myApp.webservice_url;
  constructor(public http: Http) {
  }

  getTaskByProjectNo(project_no: string) {
    let params = new Object();
    params["project_no"] = project_no;
    return this.http.post(this.server + "/task/getTaskByProjectNo", JSON.stringify(params)).map((res) => res.json());
  }

  saveTask(task: Task) {
    return this.http.post(this.server + "/task/saveTask", JSON.stringify(task)).map((res) => res.json());
  }
}


export class Task {
  taskNo: string = "";
  projectNumber: string = "";
  customerId: string = ""
  name: string = "";
  attachUuid: string = "";
  permissionId: string = "";
  parentTaskNo: string = "";
  taskStatusList: Array<TaskStatus> = [];
  taskOwnerList: Array<TaskOwner> = [];
  taskCommentList: Array<TaskComment> = [];
  tempComment: TaskComment = new TaskComment();
  subTaskList: Array<Task> = [];
  static fromObject(src: any) {
    let obj = new Task();
    obj.projectNumber = src.projectNumber;
    obj.taskNo = src.taskNo;
    obj.customerId = src.customerId;
    obj.name = src.name;
    obj.attachUuid = src.attachUuid;
    obj.permissionId = src.permissionId;
    obj.parentTaskNo = src.parentTaskNo;
    if (src.subTaskList instanceof Array) {
      for (let index = 0; index < src.subTaskList.length; index++) {
        let task = Task.fromObject(src.subTaskList[index]);
        obj.subTaskList.push(task);
      }
    }

    if (src.taskOwnerList instanceof Array) {
      for (let index = 0; index < src.taskOwnerList.length; index++) {
        let task_owner = TaskOwner.fromObject(src.taskOwnerList[index]);
        obj.taskOwnerList.push(task_owner);
      }
    }
    if (src.taskCommentList instanceof Array) {
      for (let index = 0; index < src.taskCommentList.length; index++) {
        let task_comment = TaskComment.fromObject(src.taskCommentList[index]);
        obj.taskCommentList.push(task_comment);
      }
    }
    if (src.taskStatusList instanceof Array) {
      for (let index = 0; index < src.taskStatusList.length; index++) {
        let task_status = TaskStatus.fromObject(src.taskStatusList[index]);
        obj.taskStatusList.push(task_status);
      }
    }
    return obj;

  }
}
export class TaskOwner {
  serialNo: number = -1;
  taskNo: string = "";
  uid: string = "";
  joinDate: Date;
  leaveDate: Date;
  static fromObject(src: any) {
    let obj = new TaskOwner();
    obj.serialNo = src.serialNo;
    obj.taskNo = src.taskNo;
    obj.uid = src.uid;
    if (src.joinDate != null) {
      obj.joinDate = new Date(src.joinDate);
    }
    if (src.leaveDate != null) {
      obj.leaveDate = new Date(src.leaveDate);
    }
    return obj;

  }
}
export class TaskStatus {
  taskStatusId: string = "";
  taskNo: string = "";
  updateTime: string;
  status: string = "";
  priority: string = "6";
  startDate: string;
  dueDate: string;
  alertDate: string;
  endDate: string;
  taskIndex: number;
  description: string = "";
  parentTaskNo: string = "";
  static fromObject(src: any) {
    let obj = new TaskStatus();
    obj.taskStatusId = src.taskStatusId;
    obj.status = src.status;
    obj.taskNo = src.taskNo;
    if (src.updateTime != null) {
      obj.updateTime =src.updateTime;
    }
    if (src.startDate != null) {
      obj.startDate = src.startDate;
     
    }
    if (src.dueDate != null) {
      obj.dueDate = src.dueDate;
     
    }
    if (src.alertDate != null) {
      obj.alertDate = src.alertDate;
      
    }
    if (src.endDate != null) {
      obj.endDate = src.endDate;
     
    }
    obj.priority = src.priority;
    obj.taskIndex = src.taskIndex;
    obj.parentTaskNo = src.parentTaskNo;
    obj.description = src.description;
    return obj;
  }

}

export class TaskComment {
  taskCommentUuid: string = "";
  taskNo: string = "";
  comment: string = "";
  commentDate: Date;
  uid: string = "";
  attachUid: string = "";

  static fromObject(src: any) {
    let obj = new TaskComment();
    obj.taskCommentUuid = src.taskCommentUuid;
    obj.taskNo = src.taskNo;
    obj.comment = src.comment;
    if (src.commentDate != null) {
      obj.commentDate = new Date(src.commentDate);
    }
    obj.uid = src.uid;
    obj.attachUid = src.attachUid;

    return obj;

  }
}
