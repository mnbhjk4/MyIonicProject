import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectPage } from './project';
import { ProjectBlockComponent } from './block/project-block';
import { ProjectTimelineComponent } from './timeline/project-timeline';
import { ProjectEditorComponent} from './projecteditor/projecteditor';

@NgModule({
  declarations: [
    ProjectPage,
    ProjectBlockComponent,
    ProjectTimelineComponent,
    ProjectEditorComponent
  ],
  entryComponents:[
    ProjectEditorComponent
  ],
  imports: [
    IonicPageModule.forChild(ProjectPage)
  ],
  exports: [
    ProjectPage,
  ]
})
export class ProjectPageModule {}
