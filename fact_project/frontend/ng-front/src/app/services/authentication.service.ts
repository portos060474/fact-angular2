import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'
import { tokenNotExpired } from 'angular2-jwt';
 
import { contentHeaders } from './headers';

@Injectable()
export class AuthenticationService {
    public token: string;
    private subject = new Subject<any>();
 
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
}