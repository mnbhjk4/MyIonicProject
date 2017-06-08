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
  start_date : string = "04/04/2017";
  end_date : string = "04/04/2017";

  itemArray:Array<{id:string,checked:boolean,itemContent:string}> = [
    {id:"1",checked:true,itemContent:"Design Document"},
    {id:"2",checked:false,itemContent:"Coding"},
    {id:"3",checked:false,itemContent:"Debug"},
    {id:"4",checked:false,itemContent:"Release"}
  ];

  description : string = "description testing";
  constructor(private navParams: NavParams) {
    this.task_id = this.navParams.get("task_id");
  }

  addRow(){
    this.itemArray.push({id:"asd",checked:false,itemContent:""})
  }
  removeRow(id:string){
    for(let i = 0;i < this.itemArray.length;i++){
      if(this.itemArray[i].id == id){
        this.itemArray.splice(i,1);
      }
    }
  }
}
