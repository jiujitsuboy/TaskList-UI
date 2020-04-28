import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ITask } from '../view-tasks/task.model';
import { HttpService } from './abstract.http.client';

@Injectable()
export class HttpUserService extends HttpService {

  constructor(private http: HttpClient) {
    super();
  }
  getTasks(id: number): Observable<any> {
    return this.http.get(this.endpointUrl + 'user/' + id).pipe(
      map(this.extractData));
  }
  login (user:string,password:string): Observable<any> {
    console.log(`User:${user} Password:${password}`);
    let credentials = {
      user: user,
      pass:password
    }
    return this.http.post<any>(this.endpointUrl + 'user/login',
               JSON.stringify(credentials), this.endHttpOptions)
                  .pipe(tap((t) => console.log(`login user=${user}`)),
                  catchError(this.handleError<any>('login'))
    );
  }

}

export const HTTP_USER_PROVIDERS: Array<any> = [
  { provide: HttpUserService, useClass: HttpUserService }
];