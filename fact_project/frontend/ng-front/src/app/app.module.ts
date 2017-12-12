import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthenticationService } from './services/authentication.service'
import { AuthGuard } from './services/auth.guard';

import { ClientiComponent } from './components/clienti/clienti.component';
import { LoginComponent } from './components/login/login.component';
// import { HttpClient } from 'selenium-webdriver/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'clienti',
    component: ClientiComponent,
    // canActivate: [AuthGuard]
  },
  { 
    path: '**', 
    component: HomeComponent
  }
]



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientiComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    HttpModule,
    NgbModule.forRoot(),
    BsDropdownModule.forRoot(),


  ],
  providers: [AuthenticationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
