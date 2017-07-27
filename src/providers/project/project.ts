import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Task } from '../task/task';
import { Permission, EmployeeInfo, Employee, EmployeeRoles } from '../organize/organize';
import 'rxjs/add/operator/map';
import * as myApp from '../../app/app.component';
/*
  Generated class for the ProjectProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProjectProvider {
  private server: string = myApp.webservice_url;
  constructor(public http: Http) {
  }

  getProjectByUid(uid: string) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append("uid", uid);
    return this.http.post(this.server + "/project/geProjectByUid", urlSearchParams.toString()).map((res) => res.json());
  }

  saveProject(project: Project) {
    let requestOptions = new RequestOptions();
    let headers = new Headers();
    //headers.append('Content-Type', 'multipart/form-data');
    requestOptions.headers = headers;
    let formData = new FormData();
    formData.append("project", JSON.stringify(project));
    formData.append("taskList", JSON.stringify(project.taskList));
    return this.http.post(this.server + "/project/saveProject", formData).map((res) => res.json());;
  }

  createProject(employee: Employee) {
    let requestOptions = new RequestOptions();
    let headers = new Headers();
    //headers.append('Content-Type', 'multipart/form-data');
    requestOptions.headers = headers;
    let formData = new FormData();
    formData.append("employee", JSON.stringify(employee));
    return this.http.post(this.server + "/project/createNewProject", formData).map((res) => res.json());
  }
}

export class Project {
  projectNo: string;
  customerId: string;
  attachUuid: string;
  permissionId: string;
  taskList: Array<Task> = [];
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
  joinDate: string;
  leaveDate: string;
  static fromObject(src: any) {
    let obj = new ProjectOwner();
    obj.ownerSerial = src.ownerSerial;
    obj.projectNo = src.projectNo;
    obj.uid = src.uid;
    if (src.joinDate != null) {
      obj.joinDate = src.joinDate;
    }
    if (src.leaveDate != null) {
      obj.leaveDate = src.leaveDate;
    }


    return obj;
  }
}

export class ProjectStatus {
  statusUuid: string;
  projectNo: string;
  projectName: string;
  startDate: string;
  dueDate: string;
  endDate: string;
  updateDate: string;
  alarmDate: string;
  status: string;
  description: string;
  priority: string;
  static fromObject(src: any) {
    let obj = new ProjectStatus();
    obj.statusUuid = src.statusUuid;
    obj.projectNo = src.projectNo;
    obj.projectName = src.projectName;
    if (src.startDate != null) {
      obj.startDate = src.startDate;
    }
    if (src.endDate != null) {
      obj.endDate = src.endDate;
    }
    if (src.updateDate != null) {
      obj.updateDate = src.updateDate;
    }
    if (src.alarmDate != null) {
      obj.alarmDate = src.alarmDate;
    }
    if (src.dueDate != null) {
      obj.dueDate = src.dueDate;
    }

    obj.status = src.status;
    obj.description = src.description;

    obj.priority = src.priority;
    return obj;
  }
}