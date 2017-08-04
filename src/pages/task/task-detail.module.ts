import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskDetailComponent } from './task-detail';
import { QuotationTaskComponent } from './quotationtask/quotationtask';
import { NormalTaskCopmonent } from './normaltask/normaltask';
import { PriorityComponent } from './priority';
import { QuotationEditorComponent　} from './quotationtask/quotationeditor';
import { TaskTitleEditorComponent } from './tasktitleeditor'

@NgModule({
  declarations: [
    TaskDetailComponent,
    QuotationTaskComponent,
    PriorityComponent,
    NormalTaskCopmonent,
    QuotationEditorComponent,
    TaskTitleEditorComponent　
  ],
  entryComponents:[
    NormalTaskCopmonent,
    PriorityComponent,
    QuotationEditorComponent,
    TaskTitleEditorComponent　
  ],
  imports: [
    IonicPageModule.forChild(TaskDetailComponent),
  ],
  exports: [
    TaskDetailComponent
  ]
})
export class TaskDetailComponentModule { }
