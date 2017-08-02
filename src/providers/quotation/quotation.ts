import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { DatePipe } from '@angular/common';
import 'rxjs/add/operator/map';
import * as myApp from '../../app/app.component';

@Injectable()
export class QuotationProvider {
  private server: string = myApp.webservice_url;
  constructor(public http: Http) {
  }

  uploadPriceFile(access_token, uid, file) {
    let requestOptions = new RequestOptions();
    let headers = new Headers();
    //headers.append('Content-Type', 'multipart/form-data');
    requestOptions.headers = headers;
    let formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("access_token", access_token);
    formData.append("uid", uid);
    return this.http.post(this.server + "/quotation/uploadPriceFile", formData).map(res => res.json());
  }

  findProductNo(key: string) {
    let requestOptions = new RequestOptions();
    let myHeader = new Headers();
    requestOptions.headers = myHeader;
    myHeader.append('Content-Type', 'application/json');

    let parames: URLSearchParams = new URLSearchParams();
    parames.append("key", key);

    requestOptions.search = parames;
    return this.http.post(this.server + "/quotation/findProductNo", null, requestOptions)
      .map(res => res.json());
  }

  getExchangeRate() {
    let requestOptions = new RequestOptions();
    let myHeader = new Headers();
    requestOptions.headers = myHeader;
    myHeader.append('Content-Type', 'application/json');
    return this.http.post(this.server + "/quotation/getExchangeRate", null, requestOptions)
      .map(res => res.json());
  }
  getQuotation(taskNo : string){
    let requestOptions = new RequestOptions();
    let myHeader = new Headers();
    requestOptions.headers = myHeader;
    myHeader.append('Content-Type', 'application/json');
    let parames: URLSearchParams = new URLSearchParams();
    parames.append("taskNo", taskNo);
     requestOptions.search = parames;
    return this.http.post(this.server + "/quotation/getQuotation", null, requestOptions)
      .map(res => res.json());
  }
  saveQuotation(quotation: Quotation, quotationItemList: Array<QuotationItem>) {
    let requestOptions = new RequestOptions();
    let headers = new Headers();
    requestOptions.headers = headers;
    let formData = new FormData();
    formData.append("quotation", JSON.stringify(quotation));
    formData.append("quotationItemList", JSON.stringify(quotationItemList));
    return this.http.post(this.server + "/quotation/uploadPriceFile", formData).map(res => res.json());
  }
}

export class KeysightPrice {
  productNo: string;
  productOption: string;
  description: string;
  listPrice: string;
  listCurrency: string;
  discountQualifierGroup: string;
  discountPercentage: string;
  netPrice: string;
  netCurrency: string;
  productLine: string;
  rmuCode: string;
  lastOrderDate: string;
  updateTime: string;
  static fromObject(src): KeysightPrice {
    let obj = new KeysightPrice();
    obj.productNo = src.productNo;
    obj.productOption = src.productOption;
    obj.description = src.description;
    obj.listPrice = src.listPrice;
    obj.listCurrency = src.listCurrency;
    obj.discountQualifierGroup = src.discountQualifierGroup;
    obj.discountPercentage = src.discountPercentage;
    obj.netPrice = src.netPrice;
    obj.netCurrency = src.netCurrency;
    obj.productLine = src.productLine;
    obj.rmuCode = src.rmuCode;
    obj.lastOrderDate = src.lastOrderDate;
    obj.updateTime = src.update;
    return obj;
  }
}

export class Quotation {
  taskNo: string;
  quotationNo: string;
  quotationDate: Date;
  expirationDate: string;
  paymentTerms: string;
  incoTerms: string;
  leadTime: string;
  customerInfomation: string;
  quotationIssueBy: string;
  updateTime: string;
  static fromObject(src) {
    let obj = new Quotation();
    obj.taskNo = src.taskNo;
    obj.quotationNo = src.quotationNo;
    if(src.quotationDate == null){
      src.quotationDate = new Date();
    }
    obj.quotationDate = new Date(src.quotationDate);
    obj.expirationDate = src.expirationDate;
    obj.paymentTerms = src.paymentTerms;
    obj.incoTerms = src.incoTerms;
    obj.leadTime = src.leadTime;
    obj.customerInfomation = src.customerInfomation;
    obj.quotationIssueBy = src.quotationIssueBy;
    obj.updateTime = src.updateTime;
    return obj;
  }
}

export class QuotationItem {
  itemId: number;
  itemIndex: number;
  description: string = "";
  unitPrice: string;
  qtr: number;
  extenedPrice: number;
  currency: string;
  quotationItemDetailList: Array<QuotationItemDetail> = [];
  static fromObject(src) {
    let obj = new QuotationItem();
    obj.itemId = src.itemId;
    obj.itemIndex = src.itemIndex;
    obj.description = src.description;
    obj.unitPrice = src.unitPrice;
    obj.qtr = src.qtr;
    obj.extenedPrice = src.extenedPrice;
    obj.currency = src.currency;
    if (src.quotationItemDetailList instanceof Array) {
      for (let index = 0; index < src.quotationItemDetailList.length; index++) {
        obj.quotationItemDetailList.push(QuotationItemDetail.fromObject(src.quotationItemDetailList[index]));
      }
    }
    return obj;
  }
}

export class QuotationItemDetail {
  itemDetailId : string;
  productNo: string;
  productOption: string;
  description: string;
  qty: number;
  price: number;
  exchangeRate: number;
  markupRate: number;
  listPrice: number;
  note: string;
  static fromObject(src) {
    let obj = new QuotationItemDetail();
    obj.itemDetailId = src.itemDetailId;
    obj.productNo = src.productNo;
    obj.productOption = src.productOption;
    obj.description = src.description;
    obj.qty = src.qty;
    obj.price = src.price;
    obj.exchangeRate = src.exchangeRate;
    obj.markupRate = src.markupRate;
    obj.listPrice = src.listPrice;
    obj.note = src.note;
    return obj;
  }
}