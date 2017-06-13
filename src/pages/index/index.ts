import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http,RequestOptions,Headers} from '@angular/http';
import { MenuController, Nav } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ListPage } from '../list/list';
import { LeavePage } from '../leave/leave';
import { LoginPage } from '../login/login';
import { OrganizePage } from '../organize/organize';
import { LoginProvider } from '../../providers/login/login';
import { ProjectPage } from '../project/project';
import { PlannerPage } from '../planner/planner';
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
  pages: Array<{ title: string,icon:string ,component: any }>;
  rootPage : any = ListPage;
  private user_name : string = "";
  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  private http : Http, 
  public menu: MenuController,
  public loginProvider : LoginProvider,
  private storage : Storage) {
     // set our app's pages
    this.pages = [
      { title: 'Index', icon: 'ios-home-outline' ,component: ListPage },
      { title: 'Project', icon: 'ios-boat-outline' ,component: ProjectPage },
      { title:'Planner', icon: 'ios-link-outline' ,component:PlannerPage},
      { title: 'Leave system',icon: 'ios-bicycle-outline' ,component:LeavePage},
      { title: 'Organize' , icon: 'ios-people-outline' ,component: OrganizePage}
    ];
  }

  ionViewDidLoad() {
   this.storage.get("access_obj").then((access_obj)=>{
    let id_token_string = access_obj.decoded_access_token;
    if(id_token_string != null && id_token_string != ""){
      let id_token = JSON.parse(id_token_string);
      if(id_token.name != null && id_token.name != ""){
        this.user_name = id_token.name;
        this.loginProvider.getUserProfilePhoto(access_obj.access_token).subscribe(
          result=>{
            console.log(result["@odata.id"]);
          }
        );
      }
    }
   });
  
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  logout(){
    this.loginProvider.logout();
  }
}
