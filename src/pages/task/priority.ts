import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
    selector: 'task-priority-detail',
    template: `
   <button ion-button icon-only class="priority-1" (click)="changePriority('1')">
        <div *ngIf="priority == '1';else else1">
          <ion-icon name="ios-checkmark" ></ion-icon>
        </div>
        <ng-template #else1>
          <ion-icon name="" ></ion-icon>
        </ng-template>
      </button>
      <button ion-button icon-only class="priority-2" (click)="changePriority('2')">
         <div *ngIf="priority  == '2';else else2">
          <ion-icon name="ios-checkmark" ></ion-icon>
        </div>
        <ng-template #else2>
         <ion-icon name="" ></ion-icon>
        </ng-template>
      </button>
      <button ion-button icon-only class="priority-3" (click)="changePriority('3')">
        <div *ngIf="priority  == '3';else else3">
          <ion-icon name="ios-checkmark" ></ion-icon>
        </div>
        <ng-template #else3>
          <ion-icon name="" ></ion-icon>
        </ng-template>
      </button>
      <button ion-button icon-only class="priority-4" (click)="changePriority('4')">
        <div *ngIf="priority  == '4';else else4">
          <ion-icon name="ios-checkmark" ></ion-icon>
        </div>
        <ng-template #else4>
          <ion-icon name="" ></ion-icon>
        </ng-template>
      </button>
      <button ion-button icon-only class="priority-5" (click)="changePriority('5')">
        <div *ngIf="priority  == '5';else else5">
          <ion-icon name="ios-checkmark" ></ion-icon>
        </div>
        <ng-template #else5>
          <ion-icon name="" ></ion-icon>
        </ng-template>
      </button>
      <button ion-button icon-only class="priority-6" (click)="changePriority('6')">
        <div *ngIf="priority  == '6';else else6">
          <ion-icon name="ios-checkmark" ></ion-icon>
        </div>
        <ng-template #else6>
          <ion-icon name="" ></ion-icon>
        </ng-template>
      </button>
      <button ion-button (click)="applyPriority()"><ion-icon name="md-checkmark">Apply</ion-icon></button>`
})
export class PriorityComponent {
    priority: string = "6";
    constructor(public viewCtrl: ViewController) {
        let nowPriority = this.viewCtrl.getNavParams().data["priority"];
        this.priority = nowPriority;
    }

    changePriority(priority: string) {
        this.priority = priority;
    }

    applyPriority() {
        this.viewCtrl.dismiss(this.priority);
    }
}