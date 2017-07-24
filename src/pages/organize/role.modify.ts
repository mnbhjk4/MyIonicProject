import { Component, ViewChildren, QueryList } from '@angular/core';
import { NavController, NavParams, Checkbox } from 'ionic-angular';
import { OrganizeProvider, Employee, EmployeeInfo, Department, EmployeeRoles, Role, FunctionMap, Permission } from '../../providers/organize/organize';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
@Component({
    selector: "organize-role-modify",
    templateUrl: "role.modify.html"
})
export class RoleModifyComponent {
    @ViewChildren("check")
    checkList: QueryList<Checkbox>;
    private roleAddForm: FormGroup;
    private role: Role;
    department: Department;
    functionMapList: Array<FunctionMap> = [];

    permissionList : Array<Permission> = [];
    constructor(private navcontroller: NavController,
        private navParams: NavParams,
        private organizeProvider: OrganizeProvider,
        private formBuilder: FormBuilder) {
        this.roleAddForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['']
        });
        this.department = this.navParams.get("department");
        this.role = this.navParams.get("role");
    }
    ionViewDidEnter() {
        this.organizeProvider.getAllFunctionMap().subscribe(data => {
            if (data instanceof Array) {
                for (let index = 0; index < data.length; index++) {
                    let functionMap = FunctionMap.fromObject(data[index]);
                    this.functionMapList.push(functionMap);
                }
            }
            this.organizeProvider.getPermissionByRole(this.role.roleId).subscribe(data => {
                if (data instanceof Array) {
                    for (let index = 0; index < data.length; index++) {
                        let permission = Permission.fromObject(data[index]);
                        this.permissionList.push(permission);
                        this.checkList.forEach((item, index, array) => {
                            if (item.getNativeElement().attributes.func.value == permission.functionName) {
                                if (item.getElementRef().nativeElement.classList.contains('create')) {
                                    if (permission.create == 0) {
                                        if (!item.checked) {
                                            item.checked = true;
                                        }
                                    }
                                } else if (item.getElementRef().nativeElement.classList.contains('update')) {
                                    if (permission.update == 0) {
                                        if (!item.checked) {
                                            item.checked = true;
                                        }
                                    }
                                } else if (item.getElementRef().nativeElement.classList.contains('read')) {
                                    if (permission.read == 0) {
                                        if (!item.checked) {
                                            item.checked = true;
                                        }
                                    }
                                } else if (item.getElementRef().nativeElement.classList.contains('delete')) {
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
            });
        });

    }
    cancel() {
        this.navcontroller.pop();
    }

    addRole() {
        let permissiopnList = new Array<Permission>();
        for (let index = 0; index < this.functionMapList.length; index++) {
            let functionMap = this.functionMapList[index];
            let permission = null;
            for(let i=0;i<this.permissionList.length;i++){
                if(this.permissionList[i].functionName == functionMap.functionName){
                    permission = this.permissionList[index];
                    break;
                }
            }
            if(permission == null){
                permission = new Permission();
                permission.functionName = functionMap.functionName;
                permission.roleId = this.role.roleId;
            }
         
            this.checkList.forEach((item, index, array) => {
                if (item.getNativeElement().attributes.func.value == functionMap.functionName) {
                    if (item.getElementRef().nativeElement.classList.contains('create')) {
                        if (item.checked) {
                            permission.create = 0
                        }else{
                            permission.create = 9;
                        }
                    } else if (item.getElementRef().nativeElement.classList.contains('update')) {
                        if (item.checked) {
                            permission.update = 0
                        }else{
                            permission.update = 9;
                        }
                    } else if (item.getElementRef().nativeElement.classList.contains('read')) {
                        if (item.checked) {
                            permission.read = 0
                        }else{
                            permission.read = 9;
                        }
                    } else if (item.getElementRef().nativeElement.classList.contains('delete')) {
                        if (item.checked) {
                            permission.delete = 0
                        }else{
                            permission.delete = 9;
                        }
                    }
                }
            });
            permissiopnList.push(permission);
        }
        this.organizeProvider.saveRole(this.role, permissiopnList).subscribe(data => {
            this.navcontroller.pop();
        });
    }
}