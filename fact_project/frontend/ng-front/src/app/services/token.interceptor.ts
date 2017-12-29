
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import {ToasterService} from 'angular2-toaster';
import { Router } from '@angular/router';
import { Injectable, Injector } from '@angular/core';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {
  zone: any;
  toasterService: any;
  private router;

  constructor(toasterService: ToasterService, private injector: Injector) {this.toasterService = toasterService; }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `JWT ${currentUser.token}`
                }
            });
        }

    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // redirect to the login route
          // or show a modal
          console.log('401');
          if (this.router == null) {
            this.router = this.injector.get(Router);
          }
          this.toasterService.pop('error 401', 'unauthorized');
          this.router.navigate(['/login']);
        } else {
          console.log(err.error);
        }
      }
    });
  }
}
