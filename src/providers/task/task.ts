import { Injectable } from '@angular/core';
import { Http,URLSearchParams,Headers } from '@angular/http';
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

  getTask(uid:string){
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append("uid","test UID");
    this.http.post("/task/test",urlSearchParams.toString()).map((res)=> res.json()).subscribe((value)=>{
      console.log(Task.fromObject(value));
    });
  }

}


export class Task {
  project_number: string;
  task_no: string;
  customer_id: string;
  name: string;
  description: string;
  attach_uuid: string;
  permission_id: string;
  parent_task_no: string;
  taskOwnerList: Array<Task_Owner> = [];
  taskCommentList: Array<Task_Comment> = [];
  taskStatusList: Array<Task_Status> = [];

  static fromObject(src: any) {
    let obj = new Task();
    obj.project_number = src.project_number;
    obj.task_no = src.task_no;
    obj.customer_id = src.customer_id;
    obj.name = src.name;
    obj.description = src.description;
    obj.attach_uuid = src.attach_uuid;
    obj.permission_id = src.permission_id;
    obj.parent_task_no = src.parent_task_no;
    if(src.taskOwnerList instanceof  Array){
      for(let index = 0 ; index < src.taskOwnerList.length; index++){
        let task_owner = Task_Owner.fromObject(src.taskOwnerList[index]);
        obj.taskOwnerList.push(task_owner);
      }
    }
    if(src.taskCommentList instanceof  Array){
       for(let index = 0 ; index < src.taskCommentList.length; index++){
         let task_comment = Task_Comment.fromObject(src.taskCommentList[index]);
        obj.taskCommentList.push(task_comment);
      }
    }
    if(src.taskStatusList instanceof  Array){
      for(let index = 0 ; index < src.taskStatusList.length; index++){
        let task_status = Task_Status.fromObject(src.taskStatusList[index]);
        obj.taskStatusList.push(task_status);
      }
    }
    return obj;

  }
}

export class Task_Owner {
  task_owner_serial_no: number;
  task_no: string;
  uid: string;
  join_date: Date;
  leave_date: Date;
  static fromObject(src: any) {
    let obj = new Task_Owner();
    obj.task_owner_serial_no = src.task_owner_serial_no;
    obj.task_no = src.task_no;
    obj.uid = src.uid;
    obj.join_date = src.join_date;
    obj.leave_date = src.leave_date;

    return obj;

  }
}

export class Task_Comment {
  task_comment_uuid: string;
  task_no: string;
  comment: string;
  comment_date: Date;
  uid: string;
  attach_uuid: string;
  static fromObject(src: any) {
    let obj = new Task_Comment();
    obj.task_comment_uuid = src.task_comment_uuid;
    obj.task_no = src.task_no;
    obj.comment = src.comment;
    obj.comment_date = src.comment_date;
    obj.uid = src.uid;
    obj.attach_uuid = src.attach_uuid;

    return obj;

  }
}

export class Task_Status {
  task_status_id: number;
  task_no: string;
  update_date: Date;
  status: string;
  priority: number;
  start_date: Date;
  due_date: Date;
  alert_date: Date;
  end_date: Date;
  task_index: number;
  parent_task_no: string;
  static fromObject(src: any) {
    let obj = new Task_Status();
    obj.task_status_id = src.task_status_id;
    obj.update_date = src.update_date;
    obj.status = src.status;
    obj.priority = src.priority;
    obj.start_date = src.start_date;
    obj.due_date = src.due_date;
    obj.alert_date = src.alert_date;
    obj.end_date = src.end_date;
    obj.task_index = src.task_index;
    obj.parent_task_no = src.parent_task_no;

    return obj;

  }
}