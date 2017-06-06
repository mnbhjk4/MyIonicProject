import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskDetailComponent } from '../../components/task-detail/task-detail'

/**
 * Generated class for the PlannerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-planner',
  templateUrl: 'planner.html',
})
export class PlannerPage {
  private plannerContent : string = "my-plans";
  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  openDetail(task_id : string){
   this.navCtrl.push(TaskDetailComponent,{task_id : task_id});
  }
}
