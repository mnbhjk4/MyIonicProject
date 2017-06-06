import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

/**
 * Generated class for the TaskDetailComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'task-detail',
  templateUrl: 'task-detail.html'
})
export class TaskDetailComponent {

  task_id : string;

  constructor(private navParams: NavParams) {
    this.task_id = this.navParams.get("task_id");
  }

}
