import { Injectable } from '@angular/core';
import { MSloginProvider } from './login-mslogin';
import { Platform, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from '../../app/app.component';
import { Http ,RequestOptions, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';



/*
  Generated class for the LoginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginProvider {
  private server: string = "http://erp.raytrex.com:8080";

  constructor(private msSloginProvider: MSloginProvider
    , private platform: Platform
    , private storage: Storage
    , private events: Events
    , private http : Http) {
  }



  getUserMail() {

  }
  getCompanyUsers(access_token : string){
     let requestOptions = new RequestOptions();

    let myHeader = new Headers();
    requestOptions.headers = myHeader;
    myHeader.append('Content-Type', 'application/json');

    let parames: URLSearchParams = new URLSearchParams();
    parames.append("access_token", access_token);
    requestOptions.search = parames;
    return this.http.post(this.server+"/employee/getCompanyUsers",null, requestOptions)
      .map(res => res.json());
  }
  getUserProfilePhoto(access_token: string,uid : string,name:string) {
    return this.msSloginProvider.getUserProfilePhoto(access_token,uid,name);
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
