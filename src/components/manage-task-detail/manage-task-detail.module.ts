import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageTaskDetailComponent } from './manage-task-detail';

@NgModule({
  declarations: [
    ManageTaskDetailComponent,
  ],
  imports: [
    IonicPageModule.forChild(ManageTaskDetailComponent),
  ],
  exports: [
    ManageTaskDetailComponent
  ]
})
export class ManageTaskDetailComponentModule {}
