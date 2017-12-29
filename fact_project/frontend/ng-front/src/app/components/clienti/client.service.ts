import { Injectable } from '@angular/core';

// import { Http, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Client } from '../../models/client';
import { contentHeaders } from '../../services/headers';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { tokenize } from 'ngx-bootstrap/typeahead/typeahead-utils';

import {ToasterService} from 'angular2-toaster';
import { environment } from '../../../environments/environment';


@Injectable()
export class ClientService {
    public currentUser: any;
    private baseUrl = environment.apiUrl + '/api/clienti/';  // web api URL
    private subject = new Subject<any>();
    public token: string;
    private toasterService: ToasterService;

    constructor(
        private http: HttpClient,
        toasterService: ToasterService
        ) { this.toasterService = toasterService; }

    getCustomers() {
        return this.http.get(this.baseUrl)
            .map(res => <Client[]> res)
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }

    updateClient(client: Client[]) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = this.currentUser['token'];
        // console.log(this.token);
        contentHeaders.delete('Authorization');
        contentHeaders.append('Authorization', 'JWT ' + this.token);


        this.http.put(this.baseUrl + client['id'] + '/', client , { headers: contentHeaders})
            .map((response: Response) => response)
            .subscribe(
                result => {
                  this.toasterService.pop('info', 'updated succesfully');
                },
                error => {
                    this.toasterService.pop('error', 'can\'t send data');
                });
        return true;
    }


}
