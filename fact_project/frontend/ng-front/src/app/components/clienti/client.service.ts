import { Injectable } from '@angular/core';

import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Client } from './client';
import { contentHeaders } from '../../services/headers';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { tokenize } from 'ngx-bootstrap/typeahead/typeahead-utils';





@Injectable()
export class ClientService {
  currentUser: any;

  private baseUrl = 'http://127.0.0.1:8000/api/clienti/';  // web api URL
  private subject = new Subject<any>();
  public token: string;

  constructor(private http: Http) {
  }

  getCustomers() {
      return this.http.get(this.baseUrl)
          .map(res => <Client[]> res.json())
          .catch(error => {
              console.log(error);
              return Observable.throw(error);
          });
  }

  setCustomerActiveStatus(client: Client[], status: string){

        console.log(client['nume'] + ' new Active status will be: ' + status);
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = this.currentUser.token;
        // console.log(this.token);
        contentHeaders.delete('Authorization');
        contentHeaders.append('Authorization', 'JWT ' + this.token);

        client['activ'] = status;

        return this.http.put(this.baseUrl + client['id'] + '/', client , { headers: contentHeaders})
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
            .subscribe(result => {
                },
                err => {
                    // Log errors if any
                    console.log(err);
                });

  }

}
