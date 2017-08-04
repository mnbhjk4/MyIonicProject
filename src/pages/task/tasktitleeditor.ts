import { Component, Input, ViewChildren, QueryList } from '@angular/core';
import { NavController, NavParams, Events, LoadingController, Loading, PopoverController, Select, ViewController,AlertController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { Employee } from '../../providers/organize/organize';
import { TaskProvider, Task, TaskOwner, TaskComment, TaskStatus } from '../../providers/task/task';
import { ProjectProvider, Project, ProjectOwner, ProjectStatus } from '../../providers/project/project';
import { Storage } from '@ionic/storage';
import { LoginProvider } from '../../providers/login/login';
import { UserListComponent } from '../../../components/user-list/user-list';
import { CustomerProvider,Customer } from '../../providers/customer/customer';
import { PriorityComponent } from '../task/priority';

@Component({
  template: `
    <ion-grid>
        <ion-row>
            <ion-label>Task Name</ion-label>
        </ion-row>
        <ion-row>
            <ion-input type="text" [(ngModel)]="taskName"></ion-input>
        </ion-row>
        <ion-row>
            <ion-label>Priority</ion-label>
        </ion-row>
        <ion-row>
           <button ion-button icon-only class="priority-1 priority-bt" (click)="changePriority('1')">
                    <div *ngIf="priority == '1';else else1">
                        <ion-icon name="ios-checkmark" ></ion-icon>
                    </div>
                    <ng-template #else1>
                        <ion-icon name="" ></ion-icon>
                    </ng-template>
                </button>
                <button ion-button icon-only class="priority-2 priority-bt" (click)="changePriority('2')">
                    <div *ngIf="priority  == '2';else else2">
                        <ion-icon name="ios-checkmark" ></ion-icon>
                    </div>
                    <ng-template #else2>
                    <ion-icon name="" ></ion-icon>
                    </ng-template>
                </button>
                <button ion-button icon-only class="priority-3 priority-bt" (click)="changePriority('3')">
                    <div *ngIf="priority  == '3';else else3">
                        <ion-icon name="ios-checkmark" ></ion-icon>
                    </div>
                    <ng-template #else3>
                        <ion-icon name="" ></ion-icon>
                    </ng-template>
                </button>
                <button ion-button icon-only class="priority-4 priority-bt" (click)="changePriority('4')">
                    <div *ngIf="priority  == '4';else else4">
                        <ion-icon name="ios-checkmark" ></ion-icon>
                    </div>
                    <ng-template #else4>
                        <ion-icon name="" ></ion-icon>
                    </ng-template>
                </button>
                <button ion-button icon-only class="priority-5 priority-bt" (click)="changePriority('5')">
                    <div *ngIf="ppriority  == '5';else else5">
                        <ion-icon name="ios-checkmark" ></ion-icon>
                    </div>
                    <ng-template #else5>
                        <ion-icon name="" ></ion-icon>
                    </ng-template>
                </button>
                <button ion-button icon-only class="priority-6 priority-bt" (click)="changePriority('6')">
                    <div *ngIf="priority  == '6';else else6">
                        <ion-icon name="ios-checkmark" ></ion-icon>
                    </div>
                    <ng-template #else6>
                        <ion-icon name="" ></ion-icon>
                    </ng-template>
                </button>
        </ion-row>
        <ion-row>
            <div class="tasktitleditor-confirm">
                <button ion-button (click)="ok()">OK</button><button ion-button (click)="cancel()">Cancel</button>
            </div>
        </ion-row>
    </ion-grid>
    `,
})
export class TaskTitleEditorComponent {
    task : Task;
    taskName = "";
    priority : string = "6";
    constructor(public viewCtrl: ViewController) {
        this.task = this.viewCtrl.data["task"];
        this.taskName = this.task.name;
        this.priority = this.task.taskStatusList[0].priority;
    }

    ok(){
        this.task.name  = this.taskName;
        this.task.taskStatusList[0].priority = this.priority;
        this.viewCtrl.dismiss();
    }

    cancel(){
        this.viewCtrl.dismiss();
    }

    changePriority(priority){
        this.priority = priority;
    }
}