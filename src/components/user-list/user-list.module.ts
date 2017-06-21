import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserListComponent } from './user-list';

@NgModule({
  declarations: [
    UserListComponent,
  ],
  imports: [
    IonicPageModule.forChild(UserListComponent),
  ],
  exports: [
    UserListComponent
  ]
})
export class UserListComponentModule {}
