/* tslint:disble max-line-length */
import { Injectable } from '@angular/core';
import { HttpUserService } from './http.user.client';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user.model';


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
          this.saveUser(resp);          
          return true;
        }
        else {
          console.log("invalid user confirmed");
          return false;
        }
      }));
  }

  saveUser(user: any) {
    this.createCookie('user',user);
  }

  saveToken(token:string){
    this.saveUser(this.parseCookie("user"));
  }

  private createCookie(name:string,value:any):void{
    let todayDate = new Date();
    let expireDate = new Date(todayDate.getTime() + 300000);    
    this.cookieService.set(name,JSON.stringify(value));
    console.log(`Cookie created ${this.cookieService.get(name)}`);
  }

  logout(): any {
    this.cookieService.deleteAll();
  }

  getUserId(): any {
    return  this.parseCookie("user").id;
  }

  getUserName(): any {
    return  this.parseCookie("user").name;
  }

  getToken(): any {
    console.log("getToken called");
    return  this.parseCookie("user").jwtToken;
  }

  private parseCookie(name:string):any{
 
    let cookie:string = this.cookieService.get(name);
    let user:User = new User(-1,"","");

    console.log(`user fresh ${user}`);
    console.log(`user cookie ${cookie}`);
    if(cookie){
      let userTemp:any = JSON.parse(cookie);
      user = new User(userTemp.id,userTemp.name,userTemp.jwtToken);
      console.log(`user parsed ${user}`);
    }
    return user;
  }

  isLoggedIn(): boolean {
    console.log("TOKEN:" +this.getToken().length)
    return this.getToken().length !== 0;
  }
}

export const AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService }
];