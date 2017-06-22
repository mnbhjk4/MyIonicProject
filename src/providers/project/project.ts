import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Task } from '../task/task';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProjectProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProjectProvider {
  private server: string = "http://erp.raytrex.com:8080";
  constructor(public http: Http) {
  }

  getProjectByUid(uid : string){
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append("uid", uid);
    return this.http.post(this.server+"/project/geProjectByUid", urlSearchParams.toString()).map((res) =>res.json());
  }

}

export class Project {
  projectNo: string;
  customerId: string;
  attachUuid: string;
  permissionId: string;
  taskList:Array<Task> = [];
  ownerList: Array<ProjectOwner> = [];
  statusList: Array<ProjectStatus> = [];
  static fromObject(src: any) {
    let obj = new Project();
    obj.projectNo = src.projectNo;
    obj.customerId = src.customerId;
    obj.attachUuid = src.attachUuid;
    obj.permissionId = src.permissionId;
   if (src.ownerList != null && src.ownerList instanceof Array) {
      for (let index = 0; index < src.ownerList.length; index++) {
        let owner = ProjectOwner.fromObject(src.ownerList[index]);
        obj.ownerList.push(owner);
      }
    }
    if (src.statusList != null && src.statusList instanceof Array) {
      for (let index = 0; index < src.statusList.length; index++) {
        let status = ProjectStatus.fromObject(src.statusList[index]);
        obj.statusList.push(status);
      }
    }
    return obj;
  }
}

export class ProjectOwner {
  ownerSerial: number;
  projectNo: string;
  uid: string;
  joinDate: Date;
  leaveDate: Date;
  static fromObject(src: any) {
    let obj = new ProjectOwner();
    obj.ownerSerial = src.ownerSerial;
    obj.projectNo = src.projectNo;
    obj.uid = src.uid;
    obj.joinDate = src.joinDate;
    obj.leaveDate = src.leaveDate;
    return obj;
  }
}

export class ProjectStatus {
  statusUuid: string;
  projectNo: string;
  projectName: string;
  startDate: Date;
  endDate: Date;
  updateDate: Date;
  alarmDate: Date;
  description: string;
  priority:number;
  static fromObject(src: any) {
    let obj = new ProjectStatus();
    obj.statusUuid = src.statusUuid;
    obj.projectNo = src.projectNo;
    obj.projectName = src.projectName;
    obj.startDate = src.startDate;
    obj.endDate = src.endDate;
    obj.updateDate = src.updateDate;
    obj.alarmDate = src.alarmDate;
    obj.description = src.description;
    obj.priority = src.priority;
    return obj;
  }
}