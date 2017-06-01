import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http,RequestOptions,Headers, URLSearchParams} from '@angular/http';
import {MyApp} from '../../app/app.component';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,private http : Http) {
  }

  ionViewDidLoad() {
   
  }

  triggerAjax(){
    console.log(MyApp.token);
     let requestOptions = new RequestOptions();

    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
    myHeader.append("continuous","true");
    requestOptions.headers = myHeader;
    this.http.get("http://erp.raytrex.com:8080/accessToken?token="+encodeURI(MyApp.token.get("code"))+"&scope="+encodeURI("openid User.Read Mail.Read"),requestOptions).map(response => response.json).toPromise();
  }
}
