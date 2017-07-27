import { Component,ViewChild, Input, ViewChildren, QueryList,ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, Loading, PopoverController, Select,Button } from 'ionic-angular';
import { MyApp } from '../../../app/app.component';
import { QuotationProvider,KeysightPrice } from '../../../providers/quotation/quotation';
import { Line,QuotationLine } from './quotationtask';
@Component({
  selector: 'quotation-editor',
  templateUrl: 'quotationeditor.html',
})
export class QuotationEditorComponent{
    @ViewChild("customerCurrency")
    customerCurrency:Select;

    quotationList : Array<QuotationLine> = [];

    kpList : Array<KeysightPrice> = [];
    targetIndex = -1;
    totalPrice = 0;

    exchangeMap:any;

    line:Line;
    constructor(
        private quotationProvider : QuotationProvider,
        private navController: NavController,
        private events : Events,
        private params : NavParams){
        this.quotationProvider.getExchangeRate().subscribe(data=>{
            this.exchangeMap = data;
        });
        this.line = this.params.get("line");
        if(this.line != null){
            this.quotationList = this.line.quotationList;
            this.refreshTotalPrice();
            this.targetIndex = this.quotationList.length-1;
        }
    }
    pop(){
        this.line.unitPrice = this.totalPrice.toString();
        this.line.currency = this.customerCurrency.value;
        this.navController.pop();
    }


    addQuotationRow(){
        this.quotationList.push(new QuotationLine());
    }

    findProductNo(event,index){
        this.targetIndex = index;
        let key = event.target.value;
        this.quotationProvider.findProductNo(key).subscribe(data=>{
            if(data instanceof Array){
                for(let index=0;index < data.length;index++){
                   let kp = KeysightPrice.fromObject(data[index]);
                   this.kpList.push(kp);
                }
            }
        });
    }
    addToQuotationEditor(keysightPrice : KeysightPrice){
        if(this.targetIndex == -1){
            this.addQuotationRow();
            this.targetIndex = this.quotationList.length -1;
        }
        if(this.quotationList.length >= this.targetIndex){
            let q = this.quotationList[this.targetIndex];
            q.productNo = keysightPrice.productNo;
            q.productOption = keysightPrice.productOption;
            q.description = keysightPrice.description;
            q.price = Number(keysightPrice.listPrice);
            q.qty = 1;
            if(keysightPrice.listCurrency != null && this.customerCurrency.value != null){
                let sourceRate = this.exchangeMap[keysightPrice.listCurrency];
                let targetRate = this.exchangeMap[this.customerCurrency.value];
                if(this.customerCurrency.value == 'TWD'){
                    targetRate = 1;
                }
                if(sourceRate != null && targetRate != null){
                    q.exchangeRate = Number((sourceRate / targetRate).toFixed(3));
                }
            }else{
                q.exchangeRate = 1;
            }
            
            this.targetIndex = -1;
        }
    }

    caluateListPrice(quotation : QuotationLine){
        if(quotation.qty > 0 && quotation.price > 0 && quotation.exchangeRate > 0 && quotation.markuprate > 0){
            let listPrice = quotation.qty * ((quotation.price  * quotation.exchangeRate) * quotation.markuprate);
            quotation.listPrice = listPrice;
        }
        this.refreshTotalPrice();
    }
    refreshTotalPrice(){
        this.totalPrice = 0;
        for(let index = 0;index <　this.quotationList.length;index++){
            let q = this.quotationList[index];
            if(q.listPrice != null && q.listPrice > 0){
                this.totalPrice += Number(q.listPrice);
            }
        }
    }
}



