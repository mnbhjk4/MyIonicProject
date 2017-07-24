import { Component,ViewChildren,QueryList } from '@angular/core';
import { NavController, NavParams ,Checkbox} from 'ionic-angular';
import { OrganizeProvider, Employee, EmployeeInfo, Department, EmployeeRoles, Role, FunctionMap,Permission } from '../../providers/organize/organize';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
@Component({
    selector: "organize-role-add",
    templateUrl: "role.add.html"
})
export class RoleAddComponent {
    @ViewChildren("check")
    checkList: QueryList<Checkbox>;

    roleLevel = new Array(16);
    private roleAddForm: FormGroup;
    role:Role = new Role();
    department: Department;
    functionMapList: Array<FunctionMap> = [];
    constructor(private navcontroller: NavController,
        private navParams: NavParams,
        private organizeProvider: OrganizeProvider,
        private formBuilder: FormBuilder) {
        this.roleAddForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['']
        });
        this.department = this.navParams.get("department");
        this.role.depId = this.department.depId;
    }
    ionViewDidEnter() {
        this.organizeProvider.getAllFunctionMap().subscribe(data => {
            if (data instanceof Array) {
                for (let index = 0; index < data.length; index++) {
                    let functionMap = FunctionMap.fromObject(data[index]);
                    this.functionMapList.push(functionMap);
                }
            }
        });
    }
    cancel() {
        this.navcontroller.pop();
    }
    addRole(){
        let permissiopnList = new Array<Permission>();
        for(let index =0 ;index < this.functionMapList.length;index++){
            let functionMap = this.functionMapList[index];
            let permission = new Permission();
            permission.functionName = functionMap.functionName;
            permission.roleId = this.role.roleId;
            this.checkList.forEach((item,index,array)=>{
                 if (item.getNativeElement().attributes.func.value == functionMap.functionName) {
                            if (item.getElementRef().nativeElement.classList.contains('create-box')) {
                                if(item.checked){
                                     permission.create = 0
                                }
                            } else if (item.getElementRef().nativeElement.classList.contains('update-box')) {
                               if(item.checked){
                                     permission.update = 0
                                }
                            } else if (item.getElementRef().nativeElement.classList.contains('read-box')) {
                               if(item.checked){
                                     permission.read = 0
                                }
                            } else if (item.getElementRef().nativeElement.classList.contains('delete-box')) {
                               if(item.checked){
                                     permission.delete = 0
                                }
                            }
                        }
            });
            permissiopnList.push(permission);
        }
        this.organizeProvider.saveRole(this.role,permissiopnList).subscribe(data=>{
            this.navcontroller.pop();
        });
    }
}