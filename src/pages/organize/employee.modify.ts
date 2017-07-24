import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams, LoadingController, AlertController, Checkbox, Events } from 'ionic-angular';
import { OrganizeProvider, Employee, EmployeeRoles, Role, Permission, FunctionMap } from '../../providers/organize/organize';
import { Storage } from '@ionic/storage';
import { MyApp } from '../../app/app.component';

@Component({
    selector: 'page-organize-employeemodify',
    templateUrl: 'employee.modify.html',
})
export class EmployeeModifyComponent {
    @ViewChildren("box")
    box: QueryList<Checkbox>;
    employee: Employee = new Employee();
    roles: Array<Role> = [];
    functionMaps: Array<FunctionMap> = [];
    targetUid = "";
    loginForm;
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public loadingController: LoadingController,
        private organizeProvider: OrganizeProvider,
        private storage: Storage,
        private alertController: AlertController,
        private events: Events
    ) {
        this.targetUid = this.navParams.get("uid");
    }
    ionViewDidLoad() {
        this.organizeProvider.getAllRoles().subscribe((data) => {
            if (data instanceof Array) {
                for (let index = 0; index < data.length; index++) {
                    let d = data[index];
                    let role = Role.fromObject(d);
                    role["selected"] = false;
                    this.roles.push(role);
                }
            }
            this.organizeProvider.getAllFunctionMap().subscribe((data) => {
                if (data instanceof Array) {
                    for (let index = 0; index < data.length; index++) {
                        let d = data[index];
                        this.functionMaps.push(FunctionMap.fromObject(d));
                    }
                }
                this.organizeProvider.getEmployee(this.targetUid).subscribe(data => {
                    if (data.employee != null) {
                        this.employee = Employee.fromObject(data.employee);
                    }
                    if (data.permission != null) {
                        for (let index = 0; index < data.permission.length; index++) {
                            let permission = Permission.fromObject(data.permission[index]);
                            if (permission.create == 0) {
                                this.box.forEach((item, index, array) => {
                                    if (item.getNativeElement().attributes.func.value == permission.functionName
                                        && item.getElementRef().nativeElement.classList.contains('create-box')) {
                                        item.checked = true;
                                    }
                                });
                            }
                            if (permission.update == 0) {
                                this.box.forEach((item, index, array) => {
                                    if (item.getNativeElement().attributes.func.value == permission.functionName
                                        && item.getElementRef().nativeElement.classList.contains('update-box')) {
                                        item.checked = true;
                                    }
                                });
                            }
                            if (permission.read == 0) {
                                this.box.forEach((item, index, array) => {
                                    if (item.getNativeElement().attributes.func.value == permission.functionName
                                        && item.getElementRef().nativeElement.classList.contains('read-box')) {
                                        item.checked = true;
                                    }
                                });
                            }
                            if (permission.delete == 0) {
                                this.box.forEach((item, index, array) => {
                                    if (item.getNativeElement().attributes.func.value == permission.functionName
                                        && item.getElementRef().nativeElement.classList.contains('delete-box')) {
                                        item.checked = true;
                                    }
                                });
                            }
                        }
                    }
                    this.employee.roleList.forEach((value, index, array) => {
                        for (let index = 0; index < this.roles.length; index++) {
                            if (value.role.roleId == this.roles[index].roleId) {
                                this.roles[index]["selected"] = true;
                            }
                        }
                    });

                });
            });
        });


    }
    save(form: NgForm) {
        if (form.invalid) {

        }
        let saveing = this.loadingController.create({
            content: 'Save employee infomation...'
        });
        saveing.present();
        this.employee.roleList = [];//將之清除在後端進行Merge
        for (let index = 0; index < this.roles.length; index++) {
            let r = this.roles[index];
            if (r["selected"]) {
                let er = new EmployeeRoles();
                er.role = r;
                this.employee.roleList.push(er);
            }
        }
        let permissionList: Array<Permission> = [];
        for (let index = 0; index < this.functionMaps.length; index++) {
            let f = this.functionMaps[index];
            let p = new Permission()
            p.functionName = f.functionName;
            if (f["create"] || f["update"] || f["read"] || f["delete"]) {
                if (f["create"]) {
                    p.create = 0;
                }
                if (f["update"]) {
                    p.update = 0;
                }
                if (f["read"]) {
                    p.read = 0;
                }
                if (f["delete"]) {
                    p.delete = 0;
                }
            }
            permissionList.push(p);
        }
        this.storage.get("access_obj").then(value => {
            this.organizeProvider.saveEmployee(this.employee, permissionList, value.access_token).subscribe((data) => {
                if (data.length > 0) {
                    saveing.dismiss().then(v => {
                        MyApp.companyUsers = data;
                        this.events.publish("refresh:organize");
                        this.navCtrl.pop();
                    });
                }
            });
        });


    }
    cancel() {
        this.navCtrl.pop();
    }


    changePermission(role: Role, event) {
        if (event.checked) {
            if (role != null && role.permissionList.length > 0) {
                for (let index = 0; index < role.permissionList.length; index++) {
                    let permission = role.permissionList[index];
                    this.box.forEach((item, index, array) => {
                        if (item.getNativeElement().attributes.func.value == permission.functionName) {
                            if (item.getElementRef().nativeElement.classList.contains('create-box')) {
                                if (permission.create == 0) {
                                    if (!item.checked) {
                                        item.checked = true;
                                    }
                                }
                            } else if (item.getElementRef().nativeElement.classList.contains('update-box')) {
                                if (permission.update == 0) {
                                    if (!item.checked) {
                                        item.checked = true;
                                    }
                                }
                            } else if (item.getElementRef().nativeElement.classList.contains('read-box')) {
                                if (permission.read == 0) {
                                    if (!item.checked) {
                                        item.checked = true;
                                    }
                                }
                            } else if (item.getElementRef().nativeElement.classList.contains('delete-box')) {
                                if (permission.delete == 0) {
                                    if (!item.checked) {
                                        item.checked = true;
                                    }
                                }
                            }
                        }
                    });
                }
            }
        } else {
            if (role != null && role.permissionList.length > 0) {
                for (let index = 0; index < role.permissionList.length; index++) {
                    let permission = role.permissionList[index];
                    this.box.forEach((item, index, array) => {
                        if (item.getNativeElement().attributes.func.value == permission.functionName) {
                            if (item.getElementRef().nativeElement.classList.contains('create-box')) {
                                if (permission.create == 0) {
                                    if (item.checked) {
                                        item.checked = false;
                                    }
                                }
                            } else if (item.getElementRef().nativeElement.classList.contains('update-box')) {
                                if (permission.update == 0) {
                                    if (item.checked) {
                                        item.checked = false;
                                    }
                                }
                            } else if (item.getElementRef().nativeElement.classList.contains('read-box')) {
                                if (permission.read == 0) {
                                    if (item.checked) {
                                        item.checked = false;
                                    }
                                }
                            } else if (item.getElementRef().nativeElement.classList.contains('delete-box')) {
                                if (permission.delete == 0) {
                                    if (item.checked) {
                                        item.checked = false;
                                    }
                                }
                            }
                        }
                    });
                }
            }
        }
    }
}