import { Injectable } from '@angular/core';
import { MSloginProvider } from './login-mslogin';
import 'rxjs/add/operator/map';



/*
  Generated class for the LoginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginProvider {

  constructor(private msSloginProvider: MSloginProvider) {
    console.log('Hello LoginProvider Provider');
  }
  judgeLoginType(codeType : string , code:string){
    if(codeType == "Microsoft"){
      this.msSloginProvider.getToken(code);
    }
  }

  loginByMS(){
    this.msSloginProvider.gotoAzureLogin();
  }

  getUserMail(){
    
  }
}
