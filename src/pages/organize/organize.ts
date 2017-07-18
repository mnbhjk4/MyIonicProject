import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, PopoverController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { Employee, EmployeeInfo, Department, EmployeeRoles, Role } from '../../providers/organize/organize';
import { OrganizeProvider } from '../../providers/organize/organize';
import { LoginProvider } from '../../providers/login/login';
import { EmployeeAddComponent } from './employee.add';
import { EmployeeModifyComponent } from './employee.modify';
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
  companyUsers: Map<string, Employee> = MyApp.companyUsers;
  deparmentTreeList: Array<Array<Department>> = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private organizeProvider: OrganizeProvider,
    private popoverController: PopoverController

  ) {
  }

  ionViewDidLoad() {
    this.organizeProvider.getDepartmentsTree().subscribe((data) => {
      if (data instanceof Array) {
        for (let index = 0; index < data.length; index++) {
          if (data[index] instanceof Array) {
            let newArray = [];
            for (let cIndex = 0; cIndex < data[index].length; cIndex++) {
              let departmentSrc = data[index][cIndex];
              let department = Department.fromObject(departmentSrc);
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
      }
    });
  }
  showEmployeeInfo(employee: Employee) {
    let pop = this.popoverController.create(UserInfoComponent, { employee: employee }, {});
    pop.present();
  }

  addEmployee() {
    this.navCtrl.push(EmployeeAddComponent);
  }
}

@Component({
  selector: 'user-info',
  template: `
  <ion-grid>
    <ion-row>
      <ion-col *ngIf="employee.employeesInfo.image != null && employee.employeesInfo.image.length > 0;else elseblock">
        <img [src]="'data:image/gif;base64,'+employee.employeesInfo.image" style="width: 200px; height: 200px;">
      </ion-col>
      <ng-template #elseblock>
        <ion-col>
          <div style="color:white;font-size:5em;text-align: center;text-shadow: 1px;background:#4789FC;width:200px;height:200px;">
            {{this.loginProvider.getShortName(employee.employeesInfo.lastName)}}
          </div>
        </ion-col>
      </ng-template>
    </ion-row>
    <ion-row><ion-col><ion-label>Name</ion-label></ion-col><ion-col><ion-label>{{employee.employeesInfo.lastName}}</ion-label></ion-col></ion-row>
    <ion-row><ion-col><ion-label>Contact Phone</ion-label></ion-col><ion-col><ion-label>{{employee.employeesInfo.contactPhone1}}</ion-label></ion-col></ion-row>
    <ion-row><ion-col><ion-label>Contact Phone</ion-label></ion-col><ion-col><ion-label>{{employee.employeesInfo.contactPhone2}}</ion-label></ion-col></ion-row>
    <ion-row><ion-col><ion-label>Gender</ion-label></ion-col><ion-col><ion-label>{{employee.employeesInfo.gender}}</ion-label></ion-col></ion-row>
    <ion-row><ion-col><ion-label>Role</ion-label></ion-col><ion-col><div *ngFor="let role of employee.roles">{{role.role.roleName}}</div></ion-col></ion-row>
    <ion-row><ion-col><button ion-button (click)="openModifyUser(employee.uid)">修改</button></ion-col><ion-col><button ion-button (click)="openDeleteUser(employee.uid)">刪除</button></ion-col></ion-row>
  </ion-grid>`
})
export class UserInfoComponent {
  employee: Employee;
  constructor(private viewController: ViewController,
    private loginProvider: LoginProvider,
    private navController: NavController) {
    this.employee = this.viewController.getNavParams().data.employee;
  }

  private openModifyUser(uid: string) {
    this.viewController.dismiss().then(a=>{
      this.navController.push(EmployeeModifyComponent,{uid:uid});
    });
    
  }
  private openDeleteUser(uid: string) {

  }
}
