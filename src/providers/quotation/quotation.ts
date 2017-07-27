import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers,RequestOptions } from '@angular/http';
import { DatePipe } from '@angular/common';
import 'rxjs/add/operator/map';
import * as myApp from '../../app/app.component';

@Injectable()
export class QuotationProvider {
  private server: string = myApp.webservice_url;
  constructor(public http: Http) {
  }

  uploadPriceFile(access_token,uid,file){
    let requestOptions = new RequestOptions();
    let headers = new Headers();
    //headers.append('Content-Type', 'multipart/form-data');
    requestOptions.headers = headers;
    let formData = new FormData();
    formData.append("file",file,file.name);
    formData.append("access_token",access_token);
    formData.append("uid",uid);
    return this.http.post(this.server+"/quotation/uploadPriceFile",formData).map(res => res.json());
  }

  findProductNo(key : string){
     let requestOptions = new RequestOptions();
    let myHeader = new Headers();
    requestOptions.headers = myHeader;
    myHeader.append('Content-Type', 'application/json');

    let parames: URLSearchParams = new URLSearchParams();
    parames.append("key",key);
 
    requestOptions.search = parames;
    return this.http.post(this.server + "/quotation/findProductNo", null, requestOptions)
      .map(res => res.json());
  }

  getExchangeRate(){
    let requestOptions = new RequestOptions();
    let myHeader = new Headers();
    requestOptions.headers = myHeader;
    myHeader.append('Content-Type', 'application/json');
    return this.http.post(this.server + "/quotation/getExchangeRate", null, requestOptions)
      .map(res => res.json());
  }
}

export class KeysightPrice{
  productNo : string;
  productOption : string;
  description : string;
  listPrice : string;
  listCurrency : string;
  discountQualifierGroup : string;
  discountPercentage : string;
  netPrice : string;
  netCurrency : string;
  productLine : string;
  rmuCode : string;
  lastOrderDate : string;
  updateTime : string;
  static fromObject(src):KeysightPrice{
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