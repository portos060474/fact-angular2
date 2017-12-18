import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'
import { AuthHttp,tokenNotExpired } from 'angular2-jwt';

 
import { contentHeaders } from './headers';
import { error } from 'selenium-webdriver';

import { JwtHelper } from 'angular2-jwt';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';

@Injectable()
export class AuthenticationService {
    
    public token: string;
    private subject = new Subject<any>();
    refreshSubscription: any;
    jwtHelper: JwtHelper = new JwtHelper();
 
    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        
    }
 
    login(username: string, password: string): Observable<boolean> {
        
        return this.http.post('http://127.0.0.1:8000/api/users/login/', JSON.stringify({ username: username, password: password }),{ headers: contentHeaders})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
 
                    // updates observable (changes received by all subscribers to this observable)
                    this.subject.next({
                      username: username,
                      token: token
                      });
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    this.refreshToken();
 
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
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











  public getNewJwt() {
    // Get a new JWT from Auth0 using the refresh token saved
    // in local storage

    console.log('refreshing token');

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;


    return this.http.post('http://localhost:8000/api/users/api-token-refresh/', JSON.stringify({ token: this.token }),{ headers: contentHeaders})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
                    // console.log ("new token: " + token);
 
                    // updates observable (changes received by all subscribers to this observable)
                    this.subject.next({
                      username: currentUser,
                      token: token
                      });
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: currentUser, token: token }));
 
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });

    }






    refreshToken = () => {

        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // console.log ("currentUser: " + currentUser);
        var token = currentUser && currentUser.token;
        // console.log ("token: " + token);
        let tokenExpDate = this.jwtHelper.getTokenExpirationDate(token);
        // console.log ("tokenExpDate: " + tokenExpDate);
    
        let jwtExp = this.jwtHelper.decodeToken(token).exp;
        let now: number = new Date().valueOf();
        let exp: Date = new Date(0);
        exp.setUTCSeconds(jwtExp);
        let delay: number = exp.valueOf() - now - 1000;


        // console.log("delay:" +  delay)

        return IntervalObservable.create(delay)
          .flatMap((i) => this.getNewJwt())

        
      }
    


}