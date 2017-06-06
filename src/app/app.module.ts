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
import { PlannerPage} from '../pages/planner/planner';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {Camera} from '@ionic-native/camera';

import { LoginProvider } from '../providers/login/login';
import { MSloginProvider } from '../providers/login/login-mslogin';
import { CalanderService } from '../pages/leave/calander.service';

import { OrganizePage } from '../pages/organize/organize';
import { ProjectPage} from '../pages/project/project';
import { IonicStorageModule } from '@ionic/storage';
import { TaskDetailComponent } from '../components/task-detail/task-detail';

@NgModule({
  declarations: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    IndexPage,
    LoginPage,
    LeavePage,
    OrganizePage,
    ProjectPage,
    PlannerPage,
    TaskDetailComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    FormsModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    LoginPage,
    IndexPage,
    LeavePage,
    OrganizePage,
    ProjectPage,
    PlannerPage,
    TaskDetailComponent
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
