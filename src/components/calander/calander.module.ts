import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalanderComponent } from './calander';

@NgModule({
  declarations: [
    CalanderComponent,
  ],
  imports: [
    IonicPageModule.forChild(CalanderComponent),
  ],
  exports: [
    CalanderComponent
  ]
})
export class CalanderComponentModule {}
