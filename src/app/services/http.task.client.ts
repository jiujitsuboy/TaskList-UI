import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ITask } from '../view-tasks/task.model';
import { HttpService } from './abstract.http.client';


@Injectable()
export class HttpTaskService extends HttpService {

  constructor(private http: HttpClient) {
    super();
  }

  getTask(id: number): Observable<any> {
    return this.http.get(this.endpointUrl + 'task/' + id).pipe(
      map(this.extractData));
  }
  getTasks(id: number): Observable<any> {
    return this.http.get(this.endpointUrl + 'task/all/' + id + 
              "?page=" + this.pageNro + "&size=" + this.taskPerPage+"&sort=estimateDate,asc")
              .pipe(tap((t) =>{ console.log(`tap:  ${t}`)}), map(this.extractData));
  }
  addTask (task:ITask): Observable<any> {
    console.log(task);
    return this.http.post<any>(this.endpointUrl + 'task/create', JSON.stringify(task), this.endHttpOptions)
    .pipe(tap((t) => console.log(`added task w/ id=${task.id}`)),
      catchError(this.handleError<any>('addTask'))
    );
  }

  updateTask (id:number, status:string): Observable<any> {
    return this.http.put(this.endpointUrl + 'task/update/' + id + "/" + status, "", this.endHttpOptions)
    .pipe(tap(_ => console.log(`updated status task id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }
}
export const HTTP_TASK_PROVIDERS: Array<any> = [
  { provide: HttpTaskService, useClass: HttpTaskService }
];