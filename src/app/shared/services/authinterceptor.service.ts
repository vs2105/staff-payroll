import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, finalize } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthinterceptorService implements HttpInterceptor {

  constructor(private _loaderservice: LoaderService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const Authtoken = 'bearer token from local storage'
    this._loaderservice.loadingStatus.next(true)
    const authRequest = req.clone({
      setHeaders: {
        'Authorization': Authtoken,
        'content-type': 'application/json'
      }
    })
    return next.handle(authRequest)
      .pipe
      (
        delay(500),

        finalize(() => {
          this._loaderservice.loadingStatus.next(false)
        })

      )
  }

}
