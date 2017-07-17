import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { IndexPage } from '../pages/index/index';
import { LoginPage } from '../pages/login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginProvider } from '../providers/login/login';
import { MSloginProvider } from '../providers/login/login-mslogin';
import { JwtHelper } from 'angular2-jwt';
import { Storage } from '@ionic/storage';
import { Permission,EmployeeInfo,Employee,EmployeeRoles } from '../providers/organize/organize';

export const webservice_url = "http://192.168.11.55:8080";
// export const webservice_url = "https://192.168.11.55/erp.service";
export const reply_url = "https://192.168.11.55:8100";
// export const reply_url = "https://192.168.11.55/frontier";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public static tokenType = "";
  public static platformType = "web";
  public static targetUser: Employee = null;
  public static companyUsers: Map<string, Employee> = new Map<string, Employee>();
  public static permissionList: Array<Permission> = [];
  jwtHelper: JwtHelper = new JwtHelper();
  rootPage: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private loginProvider: LoginProvider,
    private storage: Storage,
    public alertCtl: AlertController,
    private msLoginProvider: MSloginProvider
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
    let url = window.localStorage.getItem("url");
    let parameterMap = new Map();
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
            parameterMap.set(pairValue[0], pairValue[1]);
          }
        }
        //清除暫存在WEB storage中的URL
        window.localStorage.removeItem("url");
      }
    }
    // 1.接收來自MS,Google access ID (登入後的重新導向)
    // Microsoft Azure的方法
    if (parameterMap.size > 0) {
      let val = parameterMap.get("state");
      if (val == "Microsoft") {
        let code = parameterMap.get("code");
        let result = this.msLoginProvider.getToken(code);
        if (result != null) {
          result.subscribe((json) => {
            if (json.access_token != null) {
              let access_obj = new Access_obj();
              let decodeToken = this.jwtHelper.decodeToken(json.access_token);
              access_obj.access_token = json.access_token;
              access_obj.decoded_access_token = JSON.stringify(decodeToken);
              access_obj.uid = this.jwtHelper.decodeToken(json.access_token).uid;
              access_obj.uid = decodeToken.oid;
              access_obj.refresh_token = json.refresh_token;
              access_obj.state = "Microsoft";

              this.storage.remove("state");
              this.storage.remove("code");
              MyApp.tokenType = "Microsoft";
              this.storage.set("access_obj", access_obj).then(() => {
                this.redirectToIndex(access_obj.access_token, decodeToken.oid);
              });

            } else {
              this.storage.remove("access_obj");
            }
          }, (error) => {
            let errorAlert = this.alertCtl.create({
              title: 'Error',
              subTitle: 'Error message : ' + error,
              buttons: ['OK']
            });
            errorAlert.present().then(() => {
              this.rootPage = LoginPage;
            });
          });
        }
      }
      return;
    }
    // Google API的方法
    if (parameterMap.size > 0) {
      let val = parameterMap.get("state");
      if (val == "Google") {
      }
    }



    //利用Ionic Storage來讀取持久層中的access_obj來讀取上次User登入後的資料
    this.storage.ready().then(() => {
      this.storage.get("access_obj").then((access_obj) => {
        if (access_obj != null) {
          let access_token = this.jwtHelper.decodeToken(access_obj.access_token);
          console.log(access_token);
          if (access_token.exp != null) {
            let state = access_obj.state;
            if (access_token.exp < Date.now() / 1000) {
              //Access token已過期
              //嘗試去讀取Refresh token
              if (state == "Microsoft") {
                let refresh_token = access_obj.refresh_token;
                this.msLoginProvider.getTokenByRefreshToken(refresh_token).subscribe((json) => {
                  if (json != null) {
                    if (json.access_token != null) {
                      let access_obj = new Access_obj();
                      let decodeToken = this.jwtHelper.decodeToken(json.access_token);
                      console.log(decodeToken);
                      access_obj.access_token = json.access_token;
                      access_obj.decoded_access_token = JSON.stringify(decodeToken);
                      access_obj.id_token = json.id_token;
                      access_obj.uid = decodeToken.oid;
                      access_obj.refresh_token = json.refresh_token;
                      access_obj.state = "Microsoft";
                      this.storage.set("access_obj", access_obj).then(() => {
                        MyApp.tokenType = "Microsoft";
                        this.redirectToIndex(access_obj.access_token, decodeToken.oid);
                      });

                    }
                  }
                }, (error) => {
                  this.rootPage = LoginPage;
                });
              }
            } else {
              MyApp.tokenType = state;
              this.redirectToIndex(access_obj.access_token, access_token.oid);
            }
          }
        } else {
          this.rootPage = LoginPage;
        }
      });
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

  redirectToIndex(access_token: string, oid: string) {
    this.loginProvider.getCompanyUsers(access_token).subscribe(
      result => {
        if (result instanceof Array) {
          for (let index = 0; index < result.length; index++) {
            let employee = Employee.fromObject(result[index]);
            if (employee.uid == oid) {
              MyApp.targetUser = employee;
            }
            MyApp.companyUsers.set(employee.uid, employee);
          }
        }
        this.rootPage = IndexPage;
      }
    );
  }
}

export class Access_obj {
  public uid: string;
  public access_token: string;
  public id_token: string;
  public refresh_token: string;
  public decoded_access_token: string;
  public state: string;
}

