import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, PopoverController, Events, LoadingController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { Employee, EmployeeInfo, Department, EmployeeRoles, Role } from '../../providers/organize/organize';
import { OrganizeProvider } from '../../providers/organize/organize';
import { LoginProvider } from '../../providers/login/login';
import { EmployeeAddComponent } from './employee.add';
import { EmployeeModifyComponent } from './employee.modify';
import { Storage } from '@ionic/storage';
import { OrganizeEditorComponent } from './organize.editor';

@Component({
  selector: 'user-info',
  templateUrl: 'userinfo.html'
})
export class UserInfoComponent {
  employee: Employee;
  constructor(private viewController: ViewController,
    private loginProvider: LoginProvider,
    private navController: NavController,
    private storage: Storage,
    private organizeProvider: OrganizeProvider) {
    this.employee = this.viewController.getNavParams().data.employee;
  }

  private openModifyUser(uid: string) {
    this.viewController.dismiss().then(a => {
      this.navController.push(EmployeeModifyComponent, { uid: uid });
    });

  }
  private openDeleteUser(uid: string) {

  }
  uploadFile(event) {
    let files: FileList = event.target.files;
    if (files.length > 0) {
      let file = files.item(0);
      this.storage.get("access_obj").then(value => {
        this.organizeProvider.uploadImage(value.access_token, value.uid, file).subscribe((data) => {
          console.log(data);
        });
      });
    }
  }
}