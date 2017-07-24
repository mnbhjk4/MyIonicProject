import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrganizePage  } from './organize';
import { UserInfoComponent } from './userinfo';
import { EmployeeAddComponent } from './employee.add';
import { EmployeeModifyComponent } from './employee.modify';
import { OrganizeEditorComponent } from './organize.editor';
import { DepartmentAddComponent } from './department.add';
import { RoleAddComponent } from './role.add'
import { DepartmentModifyComponent } from './department.modify';
import { RoleModifyComponent } from './role.modify'

@NgModule({
  declarations: [
    OrganizePage,
    EmployeeAddComponent,
    UserInfoComponent,
    EmployeeModifyComponent,
    OrganizeEditorComponent,
    DepartmentAddComponent,
    RoleAddComponent,
    DepartmentModifyComponent,
    RoleModifyComponent
  ],
  imports: [
    IonicPageModule.forChild(OrganizePage),
  ],
  entryComponents: [
    EmployeeAddComponent,
    UserInfoComponent,
    EmployeeModifyComponent,
    OrganizeEditorComponent,
    DepartmentAddComponent,
    RoleAddComponent,
    DepartmentModifyComponent,
    RoleModifyComponent
  ],
  exports: [
    OrganizePage
  ]
})
export class OrganizePageModule { }
