import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { ClientiComponent } from './components/clienti/clienti.component';
import { LoginComponent } from './components/login/login.component';


const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthGuard]
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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
