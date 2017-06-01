import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import {IndexPage} from '../pages/index/index';
import {LoginPage} from '../pages/login/login';
import {LeavePage} from '../pages/leave/leave';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {Camera} from '@ionic-native/camera';

import { LoginProvider } from '../providers/login/login';
import { MSloginProvider } from '../providers/login/login-mslogin';
import { CalanderService } from '../pages/leave/calander.service';
import { CalanderComponent } from '../components/calander/calander';

@NgModule({
  declarations: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    IndexPage,
    LoginPage,
    LeavePage,
    CalanderComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    LoginPage,
    IndexPage,
    LeavePage,
    CalanderComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    LoginProvider,
    MSloginProvider,
    CalanderService
  ],
  exports:[LeavePage]
})
export class AppModule {}
