import { Injectable } from '@angular/core';
import { RequestOptions, Headers, RequestMethod } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { Http } from '@angular/http';
import { MyApp } from '../../app/app.component';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginMsloginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
const client_id: string = '7c3abeb3-bb33-435a-9ad6-d63ff39e8179';
const tenantid: string = 'raytrex.onmicrosoft.com';

// const redirect_url: string = 'http://localhost:8100';
const client_secret: string = 'dEczFYJg7E71q6Y2OrZRssu';
const scope: string = 'openid offline_access User.Read Mail.Read'
@Injectable()
export class MSloginProvider {
  public redirect_url: string = 'raytrexerp://MyERP';
  private jwtHelper: JwtHelper = new JwtHelper();
  constructor(public authHttp: Http) {

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
    // if (MyApp.platformType == "web") {
    //   this.redirect_url = "http://localhost:8100";
    // } else {
    //   this.redirect_url = "raytrexerp://MyERP";
    // }
    // let requestOptions = new RequestOptions();

    // let myHeader = new Headers();

    // myHeader.append('Content-Type', 'application/x-www-form-urlencoded')
    // myHeader.append("continuous","true");
    // requestOptions.headers = myHeader;
    // let parames = "client_id=" + client_id + "&" +
    //   "grant_type=authorization_code&" +
    //   "scope=" + scope + "&" +
    //   "code=" + code + "&" +
    //   "redirect_uri=" + this.redirect_url + "&" +
    //   "client_secret=" + client_secret;
    // requestOptions.body = encodeURI(parames);
    // requestOptions.method = RequestMethod.Post;

    // this.authHttp.request("/mstoken/" + tenantid + "/oauth2/v2.0/token", requestOptions)
    //   .map(res => res.json()).subscribe(data => {
    //     console.log(data);
    //     localStorage.setItem("token", JSON.stringify(data));
    //     localStorage.setItem("tokenType", "Microsoft");
    //     window.location.href = this.redirect_url;
    //   },
    //   error => {
    //     alert("Error =" + error);
    //   });

  }
  getUserInfo(token: string) {
    let data = this.jwtHelper.decodeToken(token);
    console.log(data);
  }

}
