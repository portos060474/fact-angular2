import { Injectable } from '@angular/core';

import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx"

import { Client } from './client'


@Injectable()
export class ClientService {
  private baseUrl = "http://127.0.0.1:8000/api/clienti/";  // web api URL
  constructor(private http: Http) { }
  
  getCustomers() {
      return this.http.get(this.baseUrl)
          .map(res => <Client[]> res.json())
          .catch(error => {
              console.log(error);
              return Observable.throw(error);
          });
  }
}