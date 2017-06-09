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
  start_date : string = new Date().toISOString();
  end_date : string =  new Date().toISOString();

  itemArray:Array<{id:string,checked:boolean,itemContent:string}> = [
    {id:"1",checked:true,itemContent:"Design Document"},
    {id:"2",checked:false,itemContent:"Coding"},
    {id:"3",checked:false,itemContent:"Debug"},
    {id:"4",checked:false,itemContent:"Release"}
  ];
  commentArray:Array<Comment>=
  [
    new Comment("E","Agi wu","eee",new Date(),[{title:"Yahoo",url:"http://tw.yahoo.com"},{title:"Raytrex",url:"http://www.raytrex.com"}]),
    new Comment("D","Agi wu","ccc",new Date(),[{title:"Yahoo",url:"http://tw.yahoo.com"},{title:"Raytrex",url:"http://www.raytrex.com"}]),
    new Comment("C","Agi wu","Test oajea",new Date(),[{title:"Yahoo",url:"http://tw.yahoo.com"},{title:"Raytrex",url:"http://www.raytrex.com"}]),
    new Comment("B","Agi wu","开始测试中文简体是否正常显示",new Date(),[{title:"Yahoo",url:"http://tw.yahoo.com"},{title:"Raytrex",url:"http://www.raytrex.com"}]),
    new Comment("A","Agi wu","開始測試中文是否正常顯示",new Date(),[{title:"Yahoo",url:"http://tw.yahoo.com"},{title:"Raytrex",url:"http://www.raytrex.com"}]),
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

export class Comment{
  comment_id:string;
  editor:string;
  comment:string;
  comment_date:Date;
  attachs:Array<{title:string,url:string}>;
  constructor(comment_id:string,editor:string,comment:string,comment_date:Date,attachs:Array<{title:string,url:string}>){
    this.comment_id = comment_id;
    this.comment = comment;
    this.comment_date = comment_date;
    this.attachs = attachs;
    this.editor = editor;
  }
}