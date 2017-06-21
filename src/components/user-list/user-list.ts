import { Component,Pipe, PipeTransform } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { MyApp,UserInfo } from '../../app/app.component';
/**
 * Generated class for the UserListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'user-list',
  templateUrl: 'user-list.html',
})
export class UserListComponent {
  private companyUser : Array<{id,name}> = [];

  constructor(public viewCtrl: ViewController) {
    MyApp.companyUsers.forEach((value : UserInfo,key:string)=>{
      this.companyUser.push({id:value.uid,name:value.name});
      console.log(value);
    });
  }

  close() {
    this.viewCtrl.dismiss();
  }

}

