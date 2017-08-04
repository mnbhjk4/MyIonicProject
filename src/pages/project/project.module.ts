import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectPage } from './project';
import { ProjectBlockComponent } from './block/project-block';
import { ProjectTimelineComponent } from './timeline/project-timeline';
import { ProjectEditorComponent} from './projecteditor/projecteditor';
import { ProjectTitleEditorComponent } from './projecteditor/projecttitleeditor';
import { CustomerSelectorComponent } from './customerselector'
@NgModule({
  declarations: [
    ProjectPage,
    ProjectBlockComponent,
    ProjectTimelineComponent,
    ProjectEditorComponent,
    ProjectTitleEditorComponent,
    CustomerSelectorComponent
  ],
  entryComponents:[
    ProjectEditorComponent,
    ProjectTitleEditorComponent,
    CustomerSelectorComponent
  ],
  imports: [
    IonicPageModule.forChild(ProjectPage)
  ],
  exports: [
    ProjectPage,
  ]
})
export class ProjectPageModule {}
