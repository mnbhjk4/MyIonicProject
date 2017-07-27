import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Task } from '../task/task';
import { Permission, EmployeeInfo, Employee, EmployeeRoles } from '../organize/organize';
import 'rxjs/add/operator/map';
import * as myApp from '../../app/app.component';
/*
  Generated class for the ProjectProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CustomerProvider {
  private server: string = myApp.webservice_url;
  constructor(public http: Http) {
  }

  getAllCustomerCountry() {
    let urlSearchParams = new URLSearchParams();
    return this.http.post(this.server + "/customer/getAllCusomterCountry", urlSearchParams.toString()).map((res) => res.json());
  }

  getAllCusomterRegion(country: string) {
    let requestOptions = new RequestOptions();
    let headers = new Headers();
    //headers.append('Content-Type', 'multipart/form-data');
    requestOptions.headers = headers;
    let formData = new FormData();
    formData.append("country", country);
    return this.http.post(this.server + "/customer/getAllCusomterRegion", formData).map((res) => res.json());;
  }

  getAllCusomterCompany(country: string, region: string) {
    let requestOptions = new RequestOptions();
    let headers = new Headers();
    //headers.append('Content-Type', 'multipart/form-data');
    requestOptions.headers = headers;
    let formData = new FormData();
    formData.append("country", country);
    formData.append("region", region);
    return this.http.post(this.server + "/customer/getAllCusomterCompany", formData).map((res) => res.json());
  }

  getAllCusomterTarget(country: string, region: string, name:string) {
    let requestOptions = new RequestOptions();
    let headers = new Headers();
    //headers.append('Content-Type', 'multipart/form-data');
    requestOptions.headers = headers;
    let formData = new FormData();
    formData.append("country", country);
    formData.append("region", region);
    formData.append("name", name);
    return this.http.post(this.server + "/customer/getAllCusomterTarget", formData).map((res) => res.json());
  }
}




export class Customer {
  customerId: string;
  name: string;
  subname: string;
  country: string;
  region: string;
  shortName: string;
  cname: string;

  static fromObject(src: any) {
    let obj = new Customer();
    obj.customerId = src.customerId;
    obj.name = src.name;
    obj.subname = src.subname;
    obj.country = src.country;
    obj.region = src.region;
    obj.shortName = src.shortName;
    obj.cname = src.cname;
    return obj;
  }
}