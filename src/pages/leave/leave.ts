import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CalanderService,DayModel } from './calander.service';

/**
 * Generated class for the LeavePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-leave',
  templateUrl: 'leave.html',
})
export class LeavePage {
  target: ViewContainerRef;
  nowDate: Date = new Date();
  nowYear: string = "";
  nowMonth: string = "";
  calanderHtml: DayModel[][];
  constructor(public navCtrl: NavController, public navParams: NavParams, private calanderService: CalanderService) {
    this.calanderHtml = this.calanderService.genCalanderHtml(new Date(this.nowDate));
    this.nowYear = this.nowDate.getFullYear().toString();
    this.nowMonth = (this.nowDate.getMonth() + 1).toString();
  }

  ionViewDidLoad() {

  }

  perviousMonth() {
    this.nowDate = new Date(this.nowDate.setMonth(this.nowDate.getMonth() - 1));
    this.calanderHtml = this.calanderService.genCalanderHtml(new Date(this.nowDate));
    this.nowYear = this.nowDate.getFullYear().toString();
    this.nowMonth = (this.nowDate.getMonth() + 1).toString();
  }

  nextMonth() {
    this.nowDate = new Date(this.nowDate.setMonth(this.nowDate.getMonth() + 1));
    this.calanderHtml = this.calanderService.genCalanderHtml(new Date(this.nowDate));
    this.nowYear = this.nowDate.getFullYear().toString();
    this.nowMonth = (this.nowDate.getMonth() + 1).toString();
  }
}
