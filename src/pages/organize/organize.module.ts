import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrganizePage,UserInfoComponent } from './organize';
import { EmployeeAddComponent } from './employee.add';
import { EmployeeModifyComponent } from './employee.modify';


@NgModule({
  declarations: [
    OrganizePage,
    EmployeeAddComponent,
    UserInfoComponent,
    EmployeeModifyComponent
  ],
  imports: [
    IonicPageModule.forChild(OrganizePage),
  ],
  entryComponents:[
    EmployeeAddComponent,
    UserInfoComponent,
    EmployeeModifyComponent
  ],
  exports: [
    OrganizePage
  ]
})
export class OrganizePageModule {}
