import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskDetailComponent } from './task-detail';

@NgModule({
  declarations: [
    TaskDetailComponent,
  ],
  imports: [
    IonicPageModule.forChild(TaskDetailComponent),
  ],
  exports: [
    TaskDetailComponent
  ]
})
export class TaskDetailComponentModule {}
