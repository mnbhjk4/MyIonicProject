import { Component, Input, ViewChildren, QueryList } from '@angular/core';
import { NavController, NavParams, Events, LoadingController, Loading, PopoverController, Select, ViewController,AlertController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { Employee } from '../../providers/organize/organize';
import { TaskProvider, Task, TaskOwner, TaskComment, TaskStatus } from '../../providers/task/task';
import { ProjectProvider, Project, ProjectOwner, ProjectStatus } from '../../providers/project/project';
import { Storage } from '@ionic/storage';
import { LoginProvider } from '../../providers/login/login';
import { UserListComponent } from '../../components/user-list/user-list';
import { CustomerProvider,Customer } from '../../providers/customer/customer';
import { PriorityComponent } from '../task/priority';

@Component({
  template: `
    <div class="customer-scroll">
        <table class="customer-table">
            <tr>
                <td style="max-width:20px"></td><td>ID</td><td>Name</td><td>BU</td><td>Country</td><td>Region</td>
            </tr>
            <tr *ngFor="let c of customerList" (click)="setCustomer($event,c)">
                <td style="max-width:20px"><ion-icon *ngIf="c.customerId == customer.customerId" name="md-checkmark"></ion-icon></td><td>{{c.customerId}}</td><td>{{c.name}}</td><td>{{c.name}}</td><td>{{c.country}}</td><td>{{c.region}}</td>
            </tr>
        </table>
    </div>
    <div class="customer-command-bt">
        <button ion-button (click)="ok()"><ion-icon name="md-checkmark"></ion-icon></button>
        <button ion-button (click)="cancel()"><ion-icon name="md-close"></ion-icon></button>
    </div>
    
    `,
})
export class CustomerSelectorComponent {
    customer : Customer;
    customerList :　Array<Customer> = [];
    constructor(public viewCtrl: ViewController,
        private customerProvider : CustomerProvider) {
        this.customer = this.viewCtrl.data["customer"];
        this.customerProvider.getAllCustomer().subscribe(data=>{
            if(data instanceof Array){
                for(let index=0;index < data.length;index++){
                    this.customerList.push(Customer.fromObject(data[index]));
                }
            }
        });
    }

    ok(){

        this.viewCtrl.dismiss({customer:this.customer});
    }

    cancel(){
        this.viewCtrl.dismiss();
    }

    setCustomer(event,customer){
        this.customer = customer;
    }
}