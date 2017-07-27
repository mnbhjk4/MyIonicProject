import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams} from '@angular/http';
import { MyApp } from '../../app/app.component';
import 'rxjs/add/operator/map';
import * as myApp from '../../app/app.component';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
/*
  Generated class for the OrganizeProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class OrganizeProvider {
  private server: string = myApp.webservice_url;

  constructor(
    public http: Http,
    private fileTransfer :FileTransfer) {
  }
  
  getDepartmentsTree() {
    let requestOptions = new RequestOptions();

    let myHeader = new Headers();
    requestOptions.headers = myHeader;
    myHeader.append('Content-Type', 'application/json');

    let parames: URLSearchParams = new URLSearchParams();
    requestOptions.search = parames;
    return this.http.post(this.server + "/organize/getDepartmentsTree", null, requestOptions)
      .map(res => res.json());
  }
  getAllRoles() {
    let requestOptions = new RequestOptions();

    let myHeader = new Headers();
    requestOptions.headers = myHeader;
    myHeader.append('Content-Type', 'application/json');

    let parames: URLSearchParams = new URLSearchParams();
    requestOptions.search = parames;
    return this.http.post(this.server + "/organize/getAllRoles", null, requestOptions)
      .map(res => res.json());
  }
  getAllFunctionMap(){
    let requestOptions = new RequestOptions();

    let myHeader = new Headers();
    requestOptions.headers = myHeader;
    myHeader.append('Content-Type', 'application/json');

    let parames: URLSearchParams = new URLSearchParams();
    requestOptions.search = parames;
    return this.http.post(this.server + "/organize/getAllFunctionMap", null, requestOptions)
      .map(res => res.json());
  }
  addEmployee(employee:Employee,permissionList : Array<Permission>,access_token:string){
    let requestOptions = new RequestOptions();

    let myHeader = new Headers();
    requestOptions.headers = myHeader;
    myHeader.append('Content-Type', 'application/json');

    let parames: URLSearchParams = new URLSearchParams();
    parames.append("employee",JSON.stringify(employee));
    parames.append("permissionList",JSON.stringify(permissionList));
    parames.append("access_token",access_token);
    requestOptions.search = parames;
    return this.http.post(this.server + "/employee/addEmployee", null, requestOptions)
      .map(res => res.json());
  }
  saveEmployee(employee:Employee,permissionList : Array<Permission>,access_token:string){
    let requestOptions = new RequestOptions();

    let myHeader = new Headers();
    requestOptions.headers = myHeader;
    myHeader.append('Content-Type', 'application/json');

    let form = new FormData();
    form.append("employee",JSON.stringify(employee));
    form.append("permissionList",JSON.stringify(permissionList));
    form.append("access_token",access_token);

    return this.http.post(this.server + "/employee/saveEmployee", form)
      .map(res => res.json());
  }

  getEmployee(uid:string){
    let requestOptions = new RequestOptions();
    let myHeader = new Headers();
    requestOptions.headers = myHeader;
    myHeader.append('Content-Type', 'application/json');

    let parames: URLSearchParams = new URLSearchParams();
    parames.append("uid",uid);
 
    requestOptions.search = parames;
    return this.http.post(this.server + "/employee/getEmployee", null, requestOptions)
      .map(res => res.json());
  }

  uploadImage(access_token:string,uid:string ,file:File){
    let requestOptions = new RequestOptions();
    let headers = new Headers();
    //headers.append('Content-Type', 'multipart/form-data');
    requestOptions.headers = headers;
    let formData = new FormData();
    formData.append("file",file,file.name);
    formData.append("access_token",access_token);
    formData.append("uid",uid);
    return this.http.post(this.server+"/adal/uploadOwnPhoto",formData);
  }

  getRTXNo(){
    let requestOptions = new RequestOptions();
    let myHeader = new Headers();
    requestOptions.headers = myHeader;
    myHeader.append('Content-Type', 'application/json');
    let parames: URLSearchParams = new URLSearchParams();
    requestOptions.search = parames;
    return this.http.post(this.server + "/employee/getRTXNo", null, requestOptions)
      .map(res => res.json());
  }

  getDepartmentList(){
    let requestOptions = new RequestOptions();
    let myHeader = new Headers();
    requestOptions.headers = myHeader;
    myHeader.append('Content-Type', 'application/json');
    let parames: URLSearchParams = new URLSearchParams();
    requestOptions.search = parames;
    return this.http.post(this.server + "/organize/getDepartmentList", null, requestOptions)
      .map(res => res.json());
  }

  getPermissionByRole(roleId:string){
    let requestOptions = new RequestOptions();
    let myHeader = new Headers();
    requestOptions.headers = myHeader;
    myHeader.append('Content-Type', 'application/json');
    let parames: URLSearchParams = new URLSearchParams();
    parames.append("roleId",roleId);
    requestOptions.search = parames;
    
    return this.http.post(this.server + "/organize/getPermissionByRole", null, requestOptions)
      .map(res => res.json());
  }
  
  saveDepartment(department : Department){
    let requestOptions = new RequestOptions();
    let myHeader = new Headers();
    requestOptions.headers = myHeader;
    myHeader.append('Content-Type', 'application/json');
    let parames: URLSearchParams = new URLSearchParams();
    parames.append("department",JSON.stringify(department));
    requestOptions.search = parames;
    
    return this.http.post(this.server + "/organize/saveDepartment", null, requestOptions)
      .map(res => res.json());
  }
  saveRole(role : Role,permissionList:Array<Permission>){
    let requestOptions = new RequestOptions();
    let myHeader = new Headers();
    let form = new FormData();
    form.append("role",JSON.stringify(role));
    form.append("permissionList",JSON.stringify(permissionList));
    return this.http.post(this.server + "/organize/saveRole", form, requestOptions)
      .map(res => res.json());
  }
}

export class Employee {
  uid: string = "";
  empNo: string = "";
  mail : string = "";
  employeesInfo: EmployeeInfo = new EmployeeInfo();
  roleList: Array<EmployeeRoles> = [];
  permission : Array<Permission> = [];

  public static fromObject(src: any): Employee {
    let e = new Employee();
    e.uid = src.uid;
    e.empNo = src.empNo;
    e.mail = src.mail;
    e.employeesInfo = EmployeeInfo.fromObject(src.employeesInfo);
    if (src.roleList instanceof Array) {
      for (let i = 0; i < src.roleList.length; i++) {
        e.roleList.push(EmployeeRoles.fromObject(src.roleList[i]));
      }
    }
    return e;
  }
}

export class EmployeeInfo {
  uid: string = "";
  firstName: string = "";
  midName: string = "";
  lastName: string = "";
  birthDate: string;
  preferredLanguage: string = "";
  gender: string = "";
  contactAddr1: string = "";
  contactAddr2: string = "";
  contactPhone1: string = "";
  contactPhone2: string = "";
  hireDate: string;
  leaveDate: string;
  image: string = "";

  public static fromObject(src: any): EmployeeInfo {
    let e = new EmployeeInfo();
    e.uid = src.uid;
    e.firstName = src.firstName;
    e.midName = src.midName;
    e.lastName = src.lastName;
    e.birthDate = src.birthDate;
    e.preferredLanguage = src.preferredLanguage;
    e.gender = src.gender;
    e.contactAddr1 = src.contactAddr1;
    e.contactAddr2 = src.contactAddr2;
    e.contactPhone1 = src.contactPhone1;
    e.contactPhone2 = src.contactPhone2;
    e.hireDate = src.hireDate;
    e.leaveDate = src.leaveDate;
    e.image = src.image;
    return e;
  }
}

export class EmployeeRoles {
  uid: string;
  roleId: string;
  fromDate: string;
  toDate: string;
  role: Role;
  public static fromObject(src: any): EmployeeRoles {
    let e = new EmployeeRoles();
    e.uid = src.uid;
    e.roleId = src.roleId;
    e.fromDate = src.midName;
    e.toDate = src.toDate;
    e.role = Role.fromObject(src.role);

    return e;
  }
}

export class Role {
  depId: string;
  roleId: string;
  roleName: string;
  roleLevel: string;
  department: Department;
  permissionList : Array<Permission> = [];
  public static fromObject(src: any): Role {
    let e = new Role();
    e.depId = src.depId;
    e.roleId = src.roleId;
    e.roleName = src.roleName;
    e.roleLevel = src.roleLevel;
    e.department = Department.fromObject(src.department);
    if(src.permissionList instanceof Array){
      for(let index=0;index <　src.permissionList.length;index++){
        e.permissionList.push(Permission.fromObject(src.permissionList[index]));
      }
    }
    
    return e;
  }
}

export class Department {
  depId: string;
  depNo: string;
  name: string;
  region: string;
  parentDepId: string;
  public static fromObject(src: any): Department {
    let e = new Department();
    e.depId = src.depId;
    e.depNo = src.depNo;
    e.name = src.name;
    e.region = src.region;
    e.parentDepId = src.parentDepId;

    return e;
  }
}

export class Permission {
  permissionSerial: string;
  permissionId: string;
  roleId: string;
  uid: string;
  functionName: string;
  create: number;
  update: number;
  read: number;
  delete: number;
  public static fromObject(src: any): Permission {
    let e = new Permission();
    e.permissionSerial = src.permissionSerial;
    e.permissionId = src.permissionId;
    e.roleId = src.roleId;
    e.uid = src.uid;
    e.functionName = src.functionName;
    e.create = src.create;
    e.update = src.update;
    e.read = src.read;
    e.delete = src.delete;
    return e;
  }
  static hasPermission(pemissionKey: string) {
    let p = pemissionKey.split("_");
    let hasCreate = false;
    let hasUpdate = false;
    let hasRead = false;
    let hasDelete = false;
    if (p.length > 1) {
      for (let index = 0; index < MyApp.permissionList.length; index++) {
        let ownP = MyApp.permissionList[index];
        if (ownP.functionName == p[1]) {
          hasCreate = p[0] == '-' || (ownP.create >= Number(p[0]));
          hasUpdate = p[0] == '-' || (ownP.update >= Number(p[0]));
          hasRead = p[0] == '-' || (ownP.read >= Number(p[0]));
          hasDelete = p[0] == '-' || (ownP.delete >= Number(p[0]));
        }
      }
    }
    return hasCreate && hasUpdate && hasRead && hasDelete;
  }
}

export class FunctionMap{
  functionName : string;
  parentFunctionName : string;
  map_url : string;
  public static fromObject(src: any): FunctionMap {
    let e = new FunctionMap();
    e.functionName = src.functionName;
    e.parentFunctionName = src.parentFunctionName;
    e.map_url = src.map_url;
    return e;
  }
}