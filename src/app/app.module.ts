/**
 * Angular2 module import
 */
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * Ionic module import
 */
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { FileTransfer } from '@ionic-native/file-transfer';

/**
 * Cordova module import
 */
import { Camera } from '@ionic-native/camera';

/**
 * Frontier module import
 */
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { LeavePage } from '../pages/leave/leave';

import { UserListComponent } from '../components/user-list/user-list';
import { IndexPageModule } from '../pages/index/index.module';
import { OrganizePageModule } from '../pages/organize/organize.module';
import { ProjectPageModule } from '../pages/project/project.module';
import { TaskDetailComponentModule} from '../pages/task/task-detail.module';
/**
 * Forniter provider import
 */
import { LoginProvider } from '../providers/login/login';
import { MSloginProvider } from '../providers/login/login-mslogin';
import { CalanderService } from '../pages/leave/calander.service';
import { TaskProvider } from '../providers/task/task';
import { ProjectProvider } from '../providers/project/project';
import { OrganizeProvider } from '../providers/organize/organize';
import {CustomerProvider} from '../providers/customer/customer';
import { MouseWheelDirective } from '../directives/mouse-wheel/mouse-wheel';
import { QuotationProvider } from '../providers/quotation/quotation';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    LeavePage,
    UserListComponent,
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
    IndexPageModule,
    OrganizePageModule,
    ProjectPageModule,
    TaskDetailComponentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    LeavePage,
    UserListComponent
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
    OrganizeProvider,
    CustomerProvider,
    FileTransfer,
    QuotationProvider
  ],
  exports: [LeavePage]
})
export class AppModule { }
