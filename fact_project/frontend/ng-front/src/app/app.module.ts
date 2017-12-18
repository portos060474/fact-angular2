import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
import { ClientService } from './components/clienti/client.service';

import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ngx-bootstrap';


import {MatTableModule, MatPaginatorModule, MatFormFieldModule, MatSortModule,MatInputModule, MatCheckboxModule } from '@angular/material';



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
    component: HomeComponent,
    canActivate: [AuthGuard]
  }
]



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientiComponent,
    LoginComponent,
    NavbarComponent,
    ClientiComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    HttpModule,
    NgbModule.forRoot(),
    BsDropdownModule.forRoot(),
    Ng2TableModule,
    PaginationModule.forRoot(),
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
  
    
  


  ],
  providers: [AuthenticationService, AuthGuard, ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
