import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ngx-bootstrap';
import {MatTableModule, MatPaginatorModule, MatFormFieldModule, MatSortModule,MatInputModule, MatCheckboxModule } from '@angular/material';
import { AuthModule, AuthHttp, AuthConfig } from 'angular2-jwt';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { LoginComponent } from './components/login/login.component';

import { AuthenticationService } from './services/authentication.service'
import { AuthGuard } from './services/auth.guard';

import { ClientiComponent } from './components/clienti/clienti.component';
import { ClientService } from './components/clienti/client.service';

import { NavbarComponent } from './components/navbar/navbar.component';

import {ToasterModule, ToasterService} from 'angular2-toaster';
import { FormsModule } from '@angular/forms';


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtTokenInterceptor } from './services/token.interceptor';

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
    canActivate: [AuthGuard]
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
    // HttpModule,
    HttpClientModule,
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
    ToasterModule,
    FormsModule,
  
    
  


  ],
  providers: [
    AuthenticationService, 
    AuthGuard, 
    ClientService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
