import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrganizePage,UserInfoComponent } from './organize';
import { EmployeeAddComponent } from './employee.add';


@NgModule({
  declarations: [
    OrganizePage,
    EmployeeAddComponent,
    UserInfoComponent
  ],
  imports: [
    IonicPageModule.forChild(OrganizePage),
  ],
  entryComponents:[
    EmployeeAddComponent,
    UserInfoComponent
  ],
  exports: [
    OrganizePage
  ]
})
export class OrganizePageModule {}
