import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, PopoverController, Events, LoadingController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { Employee, EmployeeInfo, Department, EmployeeRoles, Role } from '../../providers/organize/organize';
import { OrganizeProvider } from '../../providers/organize/organize';
import { LoginProvider } from '../../providers/login/login';
import { EmployeeAddComponent } from './employee.add';
import { EmployeeModifyComponent } from './employee.modify';
import { Storage } from '@ionic/storage';
import { OrganizeEditorComponent } from './organize.editor';
import {UserInfoComponent} from './userinfo';


/**
 * Generated class for the OrganizePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-organize',
  templateUrl: 'organize.html',
})
export class OrganizePage {
  companyUsers: Map<string, Employee> = new Map<string, Employee>();
  noRoleEmployeeList: Array<Employee> = [];
  deparmentTreeList: Array<Array<Department>> = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private organizeProvider: OrganizeProvider,
    private popoverController: PopoverController,
    private storage: Storage,
    private loginProvider: LoginProvider,
    public loadingController: LoadingController,
    private events: Events
  ) {
    this.events.subscribe("refresh:organize", (event) => {
      this.reloadAll();
    });
  }
  ionViewDidEnter() {
    this.reloadAll();
  }
  reloadAll() {
    let loading = this.loadingController.create({
      content: "Loading organize data..."
    });
    loading.present();
    this.companyUsers.clear();
    this.noRoleEmployeeList = [];
    this.deparmentTreeList = [];
    this.storage.get("access_obj").then(data => {
      this.loginProvider.getCompanyUsers(data.access_token).subscribe(result => {
        if (result instanceof Array) {
          for (let index = 0; index < result.length; index++) {
            let employee = Employee.fromObject(result[index]);
            this.companyUsers.set(employee.uid, employee);
          }
        }
        this.filterNoRoleEmployee();
        this.organizeProvider.getDepartmentsTree().subscribe((data) => {
          if (data instanceof Array) {
            for (let index = 0; index < data.length; index++) {
              if (data[index] instanceof Array) {
                let newArray = [];
                for (let cIndex = 0; cIndex < data[index].length; cIndex++) {
                  let departmentSrc = data[index][cIndex];
                  let department = Department.fromObject(departmentSrc);
                  if (index != 0) {
                    for (let pIndex = 0; pIndex < data[index - 1].length; pIndex++) {
                      let departmentSrc = data[index - 1][pIndex];
                      let pDepartment = Department.fromObject(departmentSrc);
                      if (pDepartment.depId != department.parentDepId) {
                        newArray.push(new Department());
                      }
                    }
                  }
                  let employeeArray: Array<Employee> = [];
                  this.companyUsers.forEach((value) => {
                    if (value.roleList.length > 0) {

                      for (let v = 0; v < value.roleList.length; v++) {
                        let role = value.roleList[v];
                        if (role.role.depId == department.depId) {
                          employeeArray.push(value);
                        }
                      }
                    }
                  });
                  employeeArray.sort((a: Employee, b: Employee) => {
                    if (a.roleList.length > 0 && b.roleList.length > 0) {
                      let aMinLv = 999;
                      for (let i = 0; i < a.roleList.length; i++) {
                        if (a.roleList[i].role != null && Number(a.roleList[i].role.roleLevel) < aMinLv) {
                          aMinLv = Number(a.roleList[i].role.roleLevel);
                        }
                      }
                      let bMinLv = 999;
                      for (let i = 0; i < b.roleList.length; i++) {
                        if (b.roleList[i].role != null && Number(b.roleList[i].role.roleLevel) < bMinLv) {
                          bMinLv = Number(b.roleList[i].role.roleLevel);
                        }
                      }
                      if (aMinLv > bMinLv) {
                        return 1;
                      } else {
                        return -1;
                      }

                    } else {
                      return 0;
                    }
                  });
                  department["employees"] = employeeArray;

                  newArray.push(department);
                }
                this.deparmentTreeList.push(newArray);
              }
            }
            loading.dismiss();
          }
        });
      });
    });


  }
  showEmployeeInfo(employee: Employee) {
    let pop = this.popoverController.create(UserInfoComponent, { employee: employee }, {});
    pop.present();
  }

  addEmployee() {
    this.navCtrl.push(EmployeeAddComponent);
  }
  editOrganize() {
    this.navCtrl.push(OrganizeEditorComponent);
  }

  filterNoRoleEmployee() {
    this.companyUsers.forEach((value, key, map) => {
      if (value.roleList.length == 0) {
        this.noRoleEmployeeList.push(value);
      }
    });
  }
}


