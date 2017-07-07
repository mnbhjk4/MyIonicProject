import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { IndexPage } from '../pages/index/index';
import { LoginPage } from '../pages/login/login';
import { LeavePage } from '../pages/leave/leave';
import { PlannerPage } from '../pages/planner/planner';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Camera } from '@ionic-native/camera';

import { LoginProvider } from '../providers/login/login';
import { MSloginProvider } from '../providers/login/login-mslogin';
import { CalanderService } from '../pages/leave/calander.service';

import { OrganizePage, UserInfoComponent } from '../pages/organize/organize';
import { ProjectPage } from '../pages/project/project';
import { IonicStorageModule } from '@ionic/storage';
import { TaskDetailComponent, PriorityComponent } from '../components/task-detail/task-detail';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular2-calendar';
import { ManageTaskDetailComponent } from '../components/manage-task-detail/manage-task-detail';
import { TaskProvider } from '../providers/task/task';
import { TaskPage } from '../pages/task/task';
import { TaskBlockComponent } from '../pages/task/task-block';
import { TaskTimelineComponent } from '../pages/task/task-timeline';
import { ProjectProvider } from '../providers/project/project';
import { UserListComponent } from '../components/user-list/user-list';
import { OrganizeProvider } from '../providers/organize/organize';
import { MouseWheelDirective } from '../directives/mouse-wheel/mouse-wheel';
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
    TaskDetailComponent,
    ManageTaskDetailComponent,
    TaskPage,
    UserListComponent,
    PriorityComponent,
    UserInfoComponent,
    TaskBlockComponent,
    TaskTimelineComponent,
    MouseWheelDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],
      monthShortNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    }),
    HttpModule,
    FormsModule,
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    CalendarModule.forRoot()
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
    TaskDetailComponent,
    ManageTaskDetailComponent,
    TaskPage,
    UserListComponent,
    PriorityComponent,
    UserInfoComponent,
    TaskBlockComponent,
    TaskTimelineComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Camera,
    LoginProvider,
    MSloginProvider,
    CalanderService,
    TaskProvider,
    ProjectProvider,
    OrganizeProvider
  ],
  exports: [LeavePage]
})
export class AppModule { }
