/* tslint:disble max-line-length */
import { Injectable } from '@angular/core';
import { HttpUserService } from './http.user.client';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class AuthService {

  private userId: number;

  constructor(private httpUserService: HttpUserService,
    private cookieService: CookieService) {

  }

  login(user: string, password: string): Observable<boolean> {

    return this.httpUserService.login(user, password).pipe(
      map((resp: any) => {
        if (resp && resp.name) {
          console.log("valid user confirmed");
          this.saveUser(resp.id);
          this.saveToken(resp.jwtToken);
          return true;
        }
        else {
          console.log("invalid user confirmed");
          return false;
        }
      }));
  }

  saveUser(user: string) {
    this.cookieService.set('userId',user);
    //localStorage.setItem('userId', user);
  }
  saveToken(token: string) {
    let todayDate = new Date();
    let expireDate = new Date(todayDate.getTime() + 300000);
    console.log(expireDate);
    this.cookieService.set('jwtToken',token,expireDate);
    //localStorage.setItem('jwtToken', token);
  }

  logout(): any {
    this.cookieService.deleteAll();
    //localStorage.removeItem('userId');
    //localStorage.removeItem('jwtToken');
  }

  getUser(): any {
    return this.cookieService.get('userId');
    //return localStorage.getItem('userId');
  }

  getToken(): any {
    return this.cookieService.get('jwtToken');
    //return localStorage.getItem('jwtToken');
  }

  isLoggedIn(): boolean {
    console.log("TOKEN:" +this.getToken().length)
    return this.getToken().length !== 0;
  }
}

export const AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService }
];