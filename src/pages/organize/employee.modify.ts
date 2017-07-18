import { Component, ViewChildren, QueryList } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Checkbox } from 'ionic-angular';
import { OrganizeProvider, Employee, EmployeeRoles, Role, Permission, FunctionMap } from '../../providers/organize/organize';
import { Storage } from '@ionic/storage';
import { MyApp } from '../../app/app.component';


@Component({
    selector: 'page-organize-employeeadd',
    templateUrl: 'employee.add.html',
})
export class EmployeeModifyComponent {
    @ViewChildren("box")
    box: QueryList<Checkbox>;
    employee: Employee = new Employee();
    roles: Array<Role> = [];
    functionMaps: Array<FunctionMap> = [];
    targetUid = "";
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public loadingController: LoadingController,
        private organizeProvider: OrganizeProvider,
        private storage: Storage,
        private alertController: AlertController
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
                    this.employee = Employee.fromObject(data);
                    this.employee.roleList.forEach((value, index, array) => {
                        for (let index = 0; index < this.roles.length; index++) {
                            if(value.role.roleId == this.roles[index].roleId){
                                this.roles[index]["selected"] = true;
                            }
                        }
                    });
                    
                });
            });
        });


    }
    save() {
        let saveing = this.loadingController.create({
            content: 'Save employee infomation...'
        });
        saveing.present();
        for (let index = 0; index < this.roles.length; index++) {
            let r = this.roles[index];
            if (r["selected"]) {
                let er = new EmployeeRoles();
                er.role = r;
                this.employee.roleList.push(er);
            }
        }
        console.log(this.employee);
        let permissionList: Array<Permission> = [];
        for (let index = 0; index < this.functionMaps.length; index++) {
            let f = this.functionMaps[index];
            if (f["create"] || f["update"] || f["read"] || f["delete"]) {
                let p = new Permission()
                p.functionName = f.functionName;
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
                permissionList.push(p);
            }
        }
        this.storage.get("access_obj").then(value => {
            this.organizeProvider.addEmployee(this.employee, permissionList, value.access_token).subscribe((data) => {
                if (data.length > 0) {
                    saveing.dismiss();
                    let alert = this.alertController.create({
                        title: 'Save successed',
                        buttons: [{
                            text: 'Back',
                            handler: () => {
                                MyApp.companyUsers = data;
                                this.navCtrl.pop();
                            }
                        }]
                    });
                    alert.present();
                }
            });
        });


    }
    cancel() {
        this.navCtrl.pop();
    }
    uploadFile(event) {
        let files: FileList = event.target.files;
        if (files.length > 0) {
            let file = files.item(0);
            this.storage.get("access_obj").then(value => {
                this.organizeProvider.uploadImage(value.access_token, value.uid, file).subscribe((data) => {
                    console.log(data);
                });
            });
        }
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