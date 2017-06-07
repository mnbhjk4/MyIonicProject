import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { ItemDetailsPage } from '../item-details/item-details';
import {CalendarEvent} from 'angular2-calendar';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  view: string = "month";
  viewDate: Date = new Date();
  events = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
