import { Injectable } from '@angular/core';
import { Http ,RequestOptions, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the OrganizeProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class OrganizeProvider {
  private server: string = "http://erp.raytrex.com:8080";

  constructor(public http: Http) {
    console.log('Hello OrganizeProvider Provider');
  }

  getDepartmentsTree(){
     let requestOptions = new RequestOptions();

    let myHeader = new Headers();
    requestOptions.headers = myHeader;
    myHeader.append('Content-Type', 'application/json');

    let parames: URLSearchParams = new URLSearchParams();
    requestOptions.search = parames;
    return this.http.post(this.server+"/organize/getDepartmentsTree",null, requestOptions)
      .map(res => res.json());
  }

}
