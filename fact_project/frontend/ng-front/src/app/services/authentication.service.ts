import { Injectable } from '@angular/core';
// import { Http, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'
import { AuthHttp,tokenNotExpired } from 'angular2-jwt';


import { contentHeaders } from './headers';
import { error } from 'selenium-webdriver';

import { JwtHelper } from 'angular2-jwt';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

    public token: string;
    public username: string;
    private subject = new Subject<any>();
    refreshSubscription: any;
    jwtHelper: JwtHelper = new JwtHelper();

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(environment.apiUrl + '/api/users/login/', { username: username, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes

                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: user.token }));
                    this.refreshToken();
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }




  // get login status
  getLoginStatus(): Observable<any> {
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
          if (tokenNotExpired(undefined, currentUser['token'])) {
              this.subject.next({
                      username: currentUser['username'],
                      token: currentUser['token']
              });
          } else {
              this.subject.next();
          };
      } else {
          this.subject.next();
      };
      return this.subject.asObservable();
  }


  public authenticated() {
    // Check if there's an unexpired JWT
    return tokenNotExpired();
  }





  refreshToken = () => {

    // console.log('start token refresh');
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser['username'];
    this.token = currentUser['token'];
    // console.log("old token:" + this.token);
    let tokenExpDate = this.jwtHelper.getTokenExpirationDate(this.token);
    let jwtExp = this.jwtHelper.decodeToken(this.token).exp;
    let now: number = new Date().valueOf();
    let exp: Date = new Date(0);
    exp.setUTCSeconds(jwtExp);
    let delay: number = exp.valueOf() - now - 1000;

    return IntervalObservable.create(delay)
      .flatMap((i) => this.getNewJwt())
      .subscribe();
  }





  private getNewJwt() {
    // Get a new JWT from Auth0 using the refresh token saved
    // in local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser['username'];
    this.token = currentUser['token'];

    return this.http.post<any>(
      environment.apiUrl + '/api/users/api-token-refresh/',
      JSON.stringify({ token: this.token }),
      { headers: contentHeaders})
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    // console.log("new token:" + user.token);
                    localStorage.setItem('currentUser', JSON.stringify({ username:  this.username, token: user.token }));
                }
                return user;
            });
    }

    public getToken(): string {
        return localStorage.getItem('currentUser')['token'];
      }

}
