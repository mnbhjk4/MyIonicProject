import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IndexPage } from './index';
import { ListPage } from './list';
import { CalendarModule } from 'angular2-calendar';
@NgModule({
  declarations: [
    IndexPage,
    ListPage
  ],
  imports: [
    IonicPageModule.forChild(IndexPage),
    CalendarModule.forRoot()
  ],
  entryComponents: [
    ListPage
  ],
  exports: [
    IndexPage
  ]
})
export class IndexPageModule {}
