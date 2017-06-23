import { Component,Pipe, PipeTransform } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { MyApp,Employee,EmployeeInfo } from '../../app/app.component';
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
  private companyUser : Array<{id,name,img,selected}> = [];
  private filterCompanyUser : Array<{id,name,selected}> = [];

  constructor(public viewCtrl: ViewController) {
          console.log(this.viewCtrl.data["selectedOwner"]);
    let selectedOwner:Array<string> = this.viewCtrl.data["selectedOwner"];
    if( selectedOwner == null ||  !(selectedOwner instanceof Array)){
      selectedOwner = [];
    }
    MyApp.companyUsers.forEach((value : Employee,key:string)=>{
      if(selectedOwner.indexOf(value.uid) != -1){
        this.companyUser.push({id:value.uid,name:value.employeesInfo.lastName,img:value.employeesInfo.image,selected:true});
      }else{
        this.companyUser.push({id:value.uid,name:value.employeesInfo.lastName,img:value.employeesInfo.image,selected:false});
      }
    });
    this.filterCompanyUser = this.companyUser;
  }

  getCompanyUser(event : any){
    let val = event.target.value;
    this.filterCompanyUser = this.companyUser;
    if(val && val.trim() != ''){
      this.filterCompanyUser = this.companyUser.filter((user)=>{
        let add = (user.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        return add;
      });
    }
  }

  updateUser(id : string){
    //  for(let index = 0;index < this.companyUser.length;index++){
    //   if(this.companyUser[index].id == id){
    //    this.companyUser[index].selected = !(this.companyUser[index].selected);
    //    break;
    //   }
    // }
  }

  close(){
    let selectedCompanyUser : Array<{id,name,selected}> = [];
    for(let index = 0;index < this.companyUser.length;index++){
      if(this.companyUser[index].selected){
        selectedCompanyUser.push(this.companyUser[index]);
      }
    }
    this.viewCtrl.dismiss(selectedCompanyUser);
  }

  closeWithoutSave(){
    this.viewCtrl.dismiss();
  }

  getShortName(name : string){
    if(name.indexOf("_") != -1){
      let names = name.split("_");
      let nw =  names[0].charAt(0) +　names[1].charAt(0);
      return nw;
    }else{
      let nw =  name[0].charAt(0);
      return nw;
    }
  }
}

