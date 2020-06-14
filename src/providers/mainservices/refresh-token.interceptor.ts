import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
//import { environment } from './../../environments/environment';

//import { HelperProvider } from '../helper/helper';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(  private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).catch((errorResponse: HttpErrorResponse) => {
      const error = (typeof errorResponse.error !== 'object') ? JSON.parse(errorResponse.error) : errorResponse;
      
      if (errorResponse.status === 401 ) {
        const http = this.injector.get(HttpClient);
        let headers = new HttpHeaders()
        headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');//client_credentials
        let params = new HttpParams().set('client_id','2').set('client_secret', 'G3RYH2aOWloclC9wmOcuCjNojdCpzA1HNa8dVzMl').set('grant_type', 'password').set('username','admin@aldahayanautosa.com').set('password','Aldahayan@2018');
        
        // return http.post<any>(`http://www.aldahayanautosa.com/aldahyan/oauth/token`, params, { headers: headers })
        return http.post<any>(`http://alhalawani.aldahayanautosa.com/oauth/token`, params, { headers: headers })
          .flatMap(data => {
            localStorage.setItem('adftrmee', data.access_token);
            const cloneRequest = request.clone({setHeaders: {'Authorization': `Bearer ${data.access_token}`}});
            return next.handle(cloneRequest);
          });
      }
     
      return Observable.throw(errorResponse);
    });

  }
}