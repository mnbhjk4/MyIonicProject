import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskDetailComponent } from './task-detail';
import { QuotationTaskComponent } from './quotationtask/quotationtask';
import { NormalTaskCopmonent } from './normaltask/normaltask';
import { PriorityComponent } from './priority';
import {QuotationEditorComponent　} from './quotationtask/quotationeditor';

@NgModule({
  declarations: [
    TaskDetailComponent,
    QuotationTaskComponent,
    PriorityComponent,
    NormalTaskCopmonent,
    QuotationEditorComponent　
  ],
  entryComponents:[
    NormalTaskCopmonent,
    PriorityComponent,
    QuotationEditorComponent　
  ],
  imports: [
    IonicPageModule.forChild(TaskDetailComponent),
  ],
  exports: [
    TaskDetailComponent
  ]
})
export class TaskDetailComponentModule { }
