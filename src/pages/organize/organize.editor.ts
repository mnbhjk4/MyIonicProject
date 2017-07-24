import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, PopoverController, Events, LoadingController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { Employee, EmployeeInfo, Department, EmployeeRoles, Role } from '../../providers/organize/organize';
import { OrganizeProvider } from '../../providers/organize/organize';
import { LoginProvider } from '../../providers/login/login';
import { EmployeeAddComponent } from './employee.add';
import { EmployeeModifyComponent } from './employee.modify';
import { Storage } from '@ionic/storage';
import {DepartmentAddComponent} from './department.add';
import {RoleAddComponent } from './role.add'
import {DepartmentModifyComponent} from './department.modify';
import {RoleModifyComponent } from './role.modify'

/**
 * Generated class for the OrganizePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-organize-editor',
    templateUrl: 'organize.editor.html',
})
export class OrganizeEditorComponent {
    departmentList: Array<Department> = [];


    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private organizeProvider: OrganizeProvider,
        private popoverController: PopoverController,
        private storage: Storage,
        private loginProvider: LoginProvider,
        private loadingController: LoadingController,
        private events: Events
    ) {
    }
    ionViewDidEnter() {
        this.organizeProvider.getDepartmentList().subscribe((data) => {
            if (data instanceof Array) {
                for (let index = 0; index < data.length; index++) {
                    let department = Department.fromObject(data[index]);
                    if (data[index].roleList != null && data[index].roleList instanceof Array) {
                        department["roleList"] = [];
                        for (let roleIndex = 0; roleIndex < data[index].roleList.length; roleIndex++) {
                            department["roleList"].push(Role.fromObject(data[index].roleList[roleIndex]));
                        }
                    }

                    this.departmentList.push(department);
                }
                for (let i = 0; i < this.departmentList.length; i++) {
                    let d = this.departmentList[i];
                    if (d.parentDepId != null && d.parentDepId != '') {
                        for (let j = 0; j < this.departmentList.length; j++) {
                            let td = this.departmentList[j];
                            if (td.depId == d.parentDepId) {
                                d["pDep"] = td;
                                break;
                            }
                        }
                    }
                }
            }
        });
    }
    save(){

    }
    cancel() {
        this.navCtrl.pop();
    }

    addDepartment(){
        this.navCtrl.push(DepartmentAddComponent);
    }
    addRole(department : Department){
        this.navCtrl.push(RoleAddComponent,{department:department});
    }
    modifyDepartment(department : Department){
        this.navCtrl.push(DepartmentModifyComponent,{department:department})
    }
    modifyRole(role:Role ,department : Department){
        this.navCtrl.push(RoleModifyComponent,{role:role,department:department})
    }
}