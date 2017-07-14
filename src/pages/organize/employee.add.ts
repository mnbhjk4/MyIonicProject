import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { OrganizeProvider, Employee, EmployeeRoles, Role,Permission, FunctionMap } from '../../providers/organize/organize';


@Component({
    selector: 'page-organize-employeeadd',
    templateUrl: 'employee.add.html',
})
export class EmployeeAddComponent {
    employee: Employee = new Employee();
    roles: Array<Role> = [];
    functionMaps: Array<FunctionMap> = [];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public loadingController: LoadingController,
        private organizeProvider: OrganizeProvider) {
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
        });
        this.organizeProvider.getAllFunctionMap().subscribe((data) => {
            if (data instanceof Array) {
                for (let index = 0; index < data.length; index++) {
                    let d = data[index];
                    this.functionMaps.push(FunctionMap.fromObject(d));
                }
            }
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
                er.roleId = r.roleId;
                this.employee.roles.push(er);
            }
        }
        console.log(this.employee);
        let permissionList :Array<Permission> = [];
        for (let index = 0; index < this.functionMaps.length; index++) {
            let f = this.functionMaps[index];
            if(f["create"] || f["update"] || f["read"] || f["delete"]){
                let p  = new Permission()
                p.functionName = f.functionName;
                if(f["create"]){
                    p.create = 0;
                }
                if(f["update"]){
                    p.update = 0;
                }
                if(f["read"]){
                    p.read = 0;
                }
                if(f["delete"]){
                    p.delete = 0;
                }
                permissionList.push(p);
            }
        }
        this.organizeProvider.addEmployee(this.employee,permissionList).subscribe((data)=>{

        });
        saveing.dismiss();
        this.navCtrl.pop();
    }
    cancel() {
        this.navCtrl.pop();
    }
}