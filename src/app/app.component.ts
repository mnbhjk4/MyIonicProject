import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IndexPage } from '../pages/index/index';
import { LoginPage } from '../pages/login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginProvider } from '../providers/login/login';
import { JwtHelper } from 'angular2-jwt';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public static token : Map<string,string> = new Map<string,string>();
  public static tokenType = "";
  public static platformType = "web";
  jwtHelper: JwtHelper = new JwtHelper();
  rootPage: any = LoginPage;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private loginProvider: LoginProvider
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
    if(url == null || url == ""){
      url = this.platform.url();
    }
    if (url != null && url != "") {
      let index = url.indexOf("?");
      if(index == -1){
        index = url.indexOf("#");
      }
      if (index >= 0) {
        let parameters = url.substr(index+1).split("&");
        for (let i = 0; i < parameters.length; i++) {
          let pairValue = parameters[i].split("=");
          if(pairValue[0] != null && pairValue[1] != null){
            MyApp.token.set(pairValue[0],pairValue[1]);
          }
        }
      }
    }
    // 1.接收來自MS,Google access ID (登入後的重新導向)
    let codeType = "";
    // Microsoft Azure的方法
    if (codeType == "") {
      codeType =  MyApp.token.get("state");
    }
    // Google API的方法
    if (codeType == "") {
      codeType =  MyApp.token.get("state");
    }
    // 開始利用Code來取得Token資訊與許可
    //由LoginProvider來確認是那一種登入方式,當有確認到Token時會主動導回原始畫面,
    //並把URL中的code去除掉,避免不必要的資訊被帶入
    if (codeType != null && codeType != "" &&  MyApp.token.size > 0) {
        this.rootPage = IndexPage;
    }else{//嘗試去取得Token
      let token = localStorage.getItem("code");
      
      if(token != null && token != "" &&  MyApp.token.size > 0){
        this.rootPage = IndexPage;
      }
      
    }
    this.statusBar.styleDefault();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.initLoginApp();
    });
    this.platform.resume.subscribe(() => {
      if (this.rootPage == LoginPage) {
        this.initLoginApp();
      }
    });
  }
}
