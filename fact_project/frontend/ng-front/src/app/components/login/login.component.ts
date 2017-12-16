import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpClient } from '@angular/common/http';

import { AuthenticationService } from '../../services/authentication.service';
import { error } from 'selenium-webdriver';
import { isDefined } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

	req: any;
	title: string = "Login";
	endpoint: string = "http://127.0.0.1:8000/api/users/login/";
	usernameError: [any];
	passwordError: [any];
	nonFieldError: [any];
	error: string;

	constructor(
		public _router: Router,
		public _http: Http,
		public _authenticationService: AuthenticationService) {};

	ngOnInit() {
		// reset login status
		this._authenticationService.logout();
		//this.login("login","portos","123qweasd.")
	};

	login(event, username, password) {
		
		this.req = this._authenticationService.login(username, password)
			.subscribe(result => {
				if (result === true) {
					// login successful
					// this._authenticationService.sendMessage();
					console.log("login succesful")
					this._router.navigate(['home']);
				} else {
					// login failed
					this.error = 'Username or password is incorrect';
					error => console.log(error)
				}
			});
		event.preventDefault();
	

	};

	signup(event) {
		this._router.navigate(['signup']);
	};

	ngOnDestroy(){
		if ( isDefined(this.req)) {this.req.unsubscribe();}
	}

}