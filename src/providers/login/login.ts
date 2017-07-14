import { Injectable } from '@angular/core';
import { MSloginProvider } from './login-mslogin';
import { Platform, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Headers, URLSearchParams ,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import * as myApp from '../../app/app.component';


/*
  Generated class for the LoginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginProvider {
  private server: string = myApp.webservice_url;

  constructor(private msSloginProvider: MSloginProvider
    , private platform: Platform
    , private storage: Storage
    , private events: Events
    , private http: Http) {
  }

  getCompanyUsers(access_token: string) {
    
    let myHeader = new Headers();
    myHeader.append('Content-Type','text/plain');
    myHeader.append('Authorization', 'Bearer ' + access_token);
    let requestOptions = new RequestOptions({headers: myHeader});
    return this.http.post(this.server + "/employee/getCompanyUsers", null, requestOptions)
      .map(res => res.json());
  }


  getUserProfilePhoto(access_token: string, uid: string, name: string) {
    return this.msSloginProvider.getUserProfilePhoto(access_token, uid, name);
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

  getShortName(name: string) {
    if (name.indexOf("_") != -1) {
      let names = name.split("_");
      let nw = names[0].charAt(0) + 　names[1].charAt(0);
      return nw;
    } else {
      let nw = name[0].charAt(0);
      return nw;
    }
  }
}
