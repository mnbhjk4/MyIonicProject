import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectPage } from './project';
import { ProjectBlockComponent } from './block/project-block';
import { ProjectTimelineComponent } from './timeline/project-timeline';
import { ProjectEditorComponent,ProjectPriorityComponent} from './projecteditor/projecteditor';

@NgModule({
  declarations: [
    ProjectPage,
    ProjectBlockComponent,
    ProjectTimelineComponent,
    ProjectEditorComponent,
    ProjectPriorityComponent
  ],
  entryComponents:[
    ProjectEditorComponent,
    ProjectPriorityComponent
  ],
  imports: [
    IonicPageModule.forChild(ProjectPage),
  ],
  exports: [
    ProjectPage,
  ]
})
export class ProjectPageModule {}
