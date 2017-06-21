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
  private companyUser : Array<{id,name,selected}> = [];
  private filterCompanyUser : Array<{id,name,selected}> = [];

  constructor(public viewCtrl: ViewController) {
    MyApp.companyUsers.forEach((value : UserInfo,key:string)=>{
      this.companyUser.push({id:value.uid,name:value.name,selected:false});
      this.filterCompanyUser.push({id:value.uid,name:value.name,selected:false});
    });
  }

  getCompanyUser(event : any){
    let val = event.target.value;
    this.filterCompanyUser = this.companyUser.copyWithin(0,this.companyUser.length);
    if(val && val.trim() != ''){
      this.filterCompanyUser = this.companyUser.filter((user)=>{
        let add = (user.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        return add;
      });
    }
    
  }

  close() {
    this.viewCtrl.dismiss("TESTLA","TEASEDASDA");
  }

}

