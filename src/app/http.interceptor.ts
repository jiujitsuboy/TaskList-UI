import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpInterceptor, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { AuthService } from './services/auth.service';

@Injectable()
export class ApiCallsInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {

    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        let jwtToken: string = (this.authService.getToken()) ? (this.authService.getToken()) : "1234567890";


        const modRed = req.clone(
            {
                headers: new HttpHeaders({                    
                    'Authorization': `${jwtToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Expose-Headers': 'Authorization'
                  })
            }
        )

        console.log("INTERCEPTOR CALLED");
        console.log(`Token:${jwtToken}`);
        return next.handle(modRed).do(evt => {
            if (evt instanceof HttpResponse) {
                let token = evt.headers.get("Authorization");
                if (token) {
                    this.authService.saveToken(token);
                }
                console.log('---> Authorization:', evt.headers.get("Authorization"));
            }
        });

    }
}

export const API_INTERCEPTOR_PROVIDERS: Array<any> = [
    { provide: HTTP_INTERCEPTORS, useClass: ApiCallsInterceptor, multi: true }
];