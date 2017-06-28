import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the TaskProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TaskProvider {
  private server: string = "http://erp.raytrex.com:8080";
  constructor(public http: Http) {
  }

  getTaskByProjectNo(project_no: string) {
    let params = new Object();
    params["project_no"] = project_no;
    return this.http.post(this.server + "/task/getTaskByProjectNo", JSON.stringify(params)).map((res) => res.json());
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
  tempComment : TaskComment = new TaskComment();
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
  serialNo: number;
  taskNo: string;
  uid: string;
  joinDate: Date;
  leaveDate: Date;
  static fromObject(src: any) {
    let obj = new TaskOwner();
    obj.serialNo = src.serialNo;
    obj.taskNo = src.taskNo;
    obj.uid = src.uid;
    obj.joinDate = src.joinDate;
    obj.leaveDate = src.leaveDate;

    return obj;

  }
}
export class TaskStatus {
  taskStatusId: string = "";
  taskNo: string = "";
  updateTime: Date;
  status: string = "";
  priority: string = "";
  startDate: Date;
  dueDate: Date;
  alarmDate: Date;
  endDate: Date;
  taskIndex: number;
  description: string = "";
  parentTaskNo: string;
  static fromObject(src: any) {
    let obj = new TaskStatus();
    obj.taskStatusId = src.taskStatusId;
    obj.status = src.status;
    obj.taskNo = src.taskNo;
    obj.updateTime = src.updateTime;
    obj.priority = src.priority;
    obj.startDate = src.startDate;
    obj.dueDate = src.dueDate;
    obj.alarmDate = src.alarmDate;
    obj.endDate = src.endDate;
    obj.taskIndex = src.taskIndex;
    obj.parentTaskNo = src.parentTaskNo;
    obj.description = src.description;
    return obj;
  }

}

export class TaskComment {
  taskCommentUuid: string;
  taskNo: string;
  comment: string;
  commentDate: Date;
  uid: string;
  attachUid: string;

  static fromObject(src: any) {
    let obj = new TaskComment();
    obj.taskCommentUuid = src.taskCommentUuid;
    obj.taskNo = src.taskNo;
    obj.comment = src.comment;
    obj.commentDate = src.commentDate;
    obj.uid = src.uid;
    obj.attachUid = src.attachUid;

    return obj;

  }
}
