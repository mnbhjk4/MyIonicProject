import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MSloginProvider} from '../../providers/login/login-mslogin';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(public navController: NavController ,
  private msLoginProvider : MSloginProvider) {
  }

  ionViewDidLoad() {
    //MS測試帳號是否有進來

  }

  logout(){
  
  }

  loginMS(){
     this.msLoginProvider.gotoAzureLogin();
  }

  logoutMS(){
   
  }
}
