import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlannerPage } from './planner';
import { TaskDetailComponent } from '../../components/task-detail/task-detail';
@NgModule({
  declarations: [
    PlannerPage,
    TaskDetailComponent
  ],
  imports: [
    IonicPageModule.forChild(PlannerPage)
  ],
  exports: [
    PlannerPage
  ]
})
export class PlannerPageModule {}
