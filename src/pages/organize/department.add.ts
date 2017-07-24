import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OrganizeProvider,Employee, EmployeeInfo, Department, EmployeeRoles, Role } from '../../providers/organize/organize';
import { Validators, FormBuilder } from '@angular/forms';
@Component({
    selector: "organize-department-add",
    templateUrl: "department.add.html"
})
export class DepartmentAddComponent {
    department : Department = new Department();
    private departmnetList : Array<Department> = [];
    constructor(private navcontroller: NavController,
        private navParams: NavParams,
        private formBuilder: FormBuilder,
        private organizeProvider: OrganizeProvider) {
    }
    ionViewDidEnter() {
        this.organizeProvider.getDepartmentList().subscribe(data =>{
            if(data instanceof Array){
                for(let index=0;index<data.length;index++){
                    let d = Department.fromObject(data[index]);
                    this.departmnetList.push(d);
                }
            }
        });
    }

    cancel() {
        this.navcontroller.pop();
    }

    addDepartment(){
        console.log(this.department);
        this.organizeProvider.saveDepartment(this.department).subscribe(data=>{
            this.navcontroller.pop();
        });
    }
}