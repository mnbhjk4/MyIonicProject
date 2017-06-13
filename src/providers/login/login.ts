import { Injectable } from '@angular/core';
import { MSloginProvider } from './login-mslogin';
import { Platform, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';



/*
  Generated class for the LoginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginProvider {

  constructor(private msSloginProvider: MSloginProvider
    , private platform: Platform
    , private storage: Storage
    , private events: Events) {
  }
  judgeLoginType(codeType: string, code: string) {
    if (codeType == "Microsoft") {
      this.msSloginProvider.getToken(code);
    }
  }

  loginByMS() {
    this.msSloginProvider.gotoAzureLogin();
  }
  authMSCode(code: string) {
    return this.msSloginProvider.getToken(code);
  }
  refreshAccessToeknFromMS(refresh_token: string) {
    return this.msSloginProvider.getTokenByRefreshToken(refresh_token);
  }

  getUserMail() {

  }

  getUserProfilePhoto(access_token: string) {
    return this.msSloginProvider.getUserProfilePhoto(access_token);
  }

  logout() {
    //Clear
    this.storage.ready().then(() => {
      this.storage.clear().then(() => {
        this.msSloginProvider.logout();
        this.platform.exitApp();
      });
    });

  }
}
