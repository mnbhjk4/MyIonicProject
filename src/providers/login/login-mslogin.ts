import { Injectable } from '@angular/core';
import { RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Http ,} from '@angular/http';
import {Observable } from 'rxjs/Observable';
import { MyApp } from '../../app/app.component';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginMsloginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
const client_id: string = '7c3abeb3-bb33-435a-9ad6-d63ff39e8179';
const tenantid: string = 'raytrex.onmicrosoft.com';

const client_secret: string = 'JmAXcEV54v1kbG2jTuA4JwW';
const scope: string = 'openid offline_access profile email User.Read Mail.Read Calendars.Read Contacts.Read People.Read Tasks.Read User.ReadBasic.All'
@Injectable()
export class MSloginProvider {
  public redirect_url: string = 'raytrexerp://MyERP';
  constructor(public http: Http, private storage: Storage) {

  }
  gotoAzureLogin() {
    if (MyApp.platformType == "web") {
      this.redirect_url = "http://localhost:8100";
    } else {
      this.redirect_url = "raytrexerp://MyERP";
    }
    let url = "https://login.microsoftonline.com/" + tenantid + "/oauth2/v2.0/authorize?" +
      "client_id=" + client_id + "&" +
      "response_type=code&" +
      "redirect_uri=" + this.redirect_url + "&" +
      "response_mode=fragment&" +
      "client_secret=" + client_secret + "&" +
      "scope=" + scope + "&" +
      "state=Microsoft&nonce=33543";
    window.location.href = url;
  }
  getToken(code: string) {
    //確認Platform為那一種(web 或 原生APP)
    if (MyApp.platformType == "web") {
      this.redirect_url = "http://localhost:8100";
    } else {
      this.redirect_url = "raytrexerp://MyERP";
    }
    let requestOptions = new RequestOptions();

    let myHeader = new Headers();
    requestOptions.headers = myHeader;
    let parames: URLSearchParams = new URLSearchParams();
    parames.append("scope", scope);
    parames.append("code", code);
    parames.append("redirectUri", this.redirect_url);
    requestOptions.search = parames;
    return this.http.get("/adal/getToken", requestOptions)
      .map(res => res.json());

  }
  getTokenByRefreshToken(refresh_token: string) {
    //確認Platform為那一種(web 或 原生APP)
    if (MyApp.platformType == "web") {
      this.redirect_url = "http://localhost:8100";
    } else {
      this.redirect_url = "raytrexerp://MyERP";
    }
    let requestOptions = new RequestOptions();

    let myHeader = new Headers();
    requestOptions.headers = myHeader;
    let parames: URLSearchParams = new URLSearchParams();
    parames.append("scope", scope);
    parames.append("refresh_token", refresh_token);
    parames.append("redirectUri", this.redirect_url);
    requestOptions.search = parames;
    return this.http.get("/adal/getTokenByRefreshToken", requestOptions)
      .map(res => res.json());
  }

  getUserProfilePhoto(access_token : string) : Observable<Response>{
    let requestOptions = new RequestOptions();

    let myHeader = new Headers();
    requestOptions.headers = myHeader;
    let parames: URLSearchParams = new URLSearchParams();
    parames.append("access_token", access_token);
    requestOptions.search = parames;
    return this.http.get("/adal/getUserProfilePhoto", requestOptions)
      .map(res => res.json());
  }

  logout() {
    if (MyApp.platformType == "web") {
      this.redirect_url = "http://localhost:8100";
    } else {
      this.redirect_url = "raytrexerp://MyERP";
    }
    window.location.href = "https://login.microsoftonline.com/" + tenantid + "/oauth2/logout?post_logout_redirect_uri=" + this.redirect_url;
  }
}
