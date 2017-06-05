import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http,RequestOptions,Headers, URLSearchParams} from '@angular/http';
import {MyApp} from '../../app/app.component';
import { Platform, MenuController, Nav } from 'ionic-angular';

import { ListPage } from '../list/list';
import { LeavePage } from '../leave/leave';
import { OrganizePage } from '../organize/organize';

/**
 * Generated class for the IndexPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
   @ViewChild(Nav) nav: Nav;
  pages: Array<{ title: string, component: any }>;
  rootPage : any = ListPage;
  constructor(public navCtrl: NavController, public navParams: NavParams,private http : Http, public menu: MenuController) {
     // set our app's pages
    this.pages = [
      { title: 'My First 1', component: ListPage },
      { title: 'Leave system',component:LeavePage},
      { title: 'Organize' , component: OrganizePage}
    ];
  }

  ionViewDidLoad() {
   
  }


  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
