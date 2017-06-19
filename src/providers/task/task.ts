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

  constructor(public http: Http) {
    console.log('Hello TaskProvider Provider');
  }

  getTask(uid: string) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append("uid", "test UID");
    this.http.post("/task/test", urlSearchParams.toString()).map((res) => res.json()).subscribe((value) => {
      console.log(Task.fromObject(value));
    });
  }

}


export class Task {
  taskNo: string = "";
  projectNumber: string = "";
  customerId: string = ""
  name: string = "";
  description: string = "";
  attachUuid: string = "";
  permissionId: string = "";
  parentId: string = "";
  taskStatusList: Array<TaskStatus> = [];
  taskOwnerList: Array<TaskOwner> = [];
  taskCommentList: Array<TaskComment> = [];
  subTaskList: Array<Task> = [];
  static fromObject(src: any) {
    let obj = new Task();
    obj.projectNumber = src.projectNumber;
    obj.taskNo = src.taskNo;
    obj.customerId = src.customerId;
    obj.name = src.name;
    obj.description = src.description;
    obj.attachUuid = src.attachUuid;
    obj.permissionId = src.permissionId;
    obj.parentId = src.parentId;

    if (src.onweList instanceof Array) {
      for (let index = 0; index < src.onweList.length; index++) {
        let task_owner = TaskOwner.fromObject(src.onweList[index]);
        obj.taskOwnerList.push(task_owner);
      }
    }
    if (src.commentList instanceof Array) {
      for (let index = 0; index < src.commentList.length; index++) {
        let task_comment = TaskComment.fromObject(src.commentList[index]);
        obj.taskCommentList.push(task_comment);
      }
    }
    if (src.taskStatus instanceof Array) {
      for (let index = 0; index < src.taskStatus.length; index++) {
        let task_status = TaskStatus.fromObject(src.taskStatus[index]);
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
  parentTaskId: string;
  static fromObject(src: any) {
    let obj = new TaskStatus();
    obj.taskStatusId = src.taskStatusId;
    obj.taskNo = src.taskNo;
    obj.updateTime = src.updateTime;
    obj.priority = src.priority;
    obj.startDate = src.startDate;
    obj.dueDate = src.dueDate;
    obj.alarmDate = src.alarmDate;
    obj.endDate = src.endDate;
    obj.taskIndex = src.taskIndex;
    obj.parentTaskId = src.parentTaskId;
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
