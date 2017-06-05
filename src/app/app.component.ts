import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { IndexPage } from '../pages/index/index';
import { LoginPage } from '../pages/login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginProvider } from '../providers/login/login';
import { JwtHelper } from 'angular2-jwt';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public static token: Map<string, string> = new Map<string, string>();
  public static tokenType = "";
  public static platformType = "web";
  jwtHelper: JwtHelper = new JwtHelper();
  rootPage: any = LoginPage;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private loginProvider: LoginProvider,
    private storage: Storage,
    public alertCtl: AlertController
  ) {
    if (this.platform.is("android")) {
      MyApp.platformType = "andorid";
    } else if (this.platform.is("ios")) {
      MyApp.platformType = "ios";
    } else if (this.platform.is('windows')) {
      MyApp.platformType = "windows";
    }
    this.initializeApp();
  }
  initLoginApp() {
    // 0.試著從URL解析Code
    let url = localStorage.getItem("url");
    if (url == null || url == "") {
      url = this.platform.url();
    }
    if (url != null && url != "") {
      let index = url.indexOf("?");
      if (index == -1) {
        index = url.indexOf("#");
      }
      if (index >= 0) {
        let parameters = url.substr(index + 1).split("&");
        for (let i = 0; i < parameters.length; i++) {
          let pairValue = parameters[i].split("=");
          if (pairValue[0] != null && pairValue[1] != null) {
            console.log(pairValue[0], pairValue[1]);
            this.storage.remove(pairValue[0]);
            this.storage.set(pairValue[0], pairValue[1]);
          }
        }
      }
    }
    // 1.接收來自MS,Google access ID (登入後的重新導向)
    let codeType = "";
    // Microsoft Azure的方法
    if (codeType == "") {
      this.storage.get("state").then((val) => {
        if (val == "Microsoft") {
          this.storage.get("code").then((code) => {
            let result = this.loginProvider.authMSCode(code);
            if (result != null) {
              result.subscribe((json) => {
                if (json.access_token != null) {
                  let access_obj = new Access_obj();
                  access_obj.access_token = json.access_token;
                  access_obj.id_token = json.id_token;
                  access_obj.refresh_token = json.refresh_token;
                  access_obj.state = "Microsoft";
                  this.storage.set("access_obj", access_obj);
                  this.storage.remove("state");
                  this.storage.remove("code");
                  this.rootPage = IndexPage;
                } else {
                  this.storage.remove("access_obj");
                }
              }, (error) => {
                let errorAlert = this.alertCtl.create({
                  title: 'Error',
                  subTitle: 'Error message : ' + error,
                  buttons: ['OK']
                });
                errorAlert.present();
              });
            }
          });
        }
      });
    }
    // Google API的方法
    if (codeType == "") {
      this.storage.get("state").then((val) => {
        codeType = val;
      });
    }



    //
    this.storage.get("access_obj").then((access_obj) => {
      if (access_obj != null) {
        let access_token = this.jwtHelper.decodeToken(access_obj.access_token);
        if (access_token.exp != null) {
          if (access_token.exp < Date.now() / 1000) {
            //Access token已過期
            //嘗試去讀取Refresh token
            let state = access_obj.state;
            if (state == "Microsoft") {
              let refresh_token = access_obj.refresh_token;
              this.loginProvider.refreshAccessToeknFromMS(refresh_token).subscribe((json) => {
                if (json != null) {
                  if (json.access_token != null) {
                    let access_obj = new Access_obj();
                    access_obj.access_token = json.access_token;
                    access_obj.id_token = json.id_token;
                    access_obj.refresh_token = json.refresh_token;
                    access_obj.state = "Microsoft";
                    this.storage.set("access_obj", access_obj);
                    this.rootPage = IndexPage;
                  } else {
                    this.storage.remove("access_obj");
                  }
                }
              }, (error) => {

              });
            }
          }else{
             this.rootPage = IndexPage;
          }
        }
      }
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.initLoginApp();
    });
    this.platform.resume.subscribe(() => {
      if (this.rootPage == LoginPage) {
        this.initLoginApp();
      }
    });
  }
}

export class Access_obj {
  public access_token: string;
  public id_token: string;
  public refresh_token: string;
  public state: string;
}
