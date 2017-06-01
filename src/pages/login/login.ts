import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginProvider} from '../../providers/login/login';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(public navController: NavController 
  ,private msLoginProvider : LoginProvider) {
  }

  ionViewDidLoad() {
    //MS測試帳號是否有進來

  }

  logout(){
  
  }

  loginMS(){
    this.msLoginProvider.loginByMS();
  }

  logoutMS(){
   
  }
}
