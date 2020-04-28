import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const authHeader = "Authorization";
const endpoint = 'http://localhost:8080/';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'        
    })
};
@Injectable()
export abstract class HttpService {

    public pageNro: number;
    public taskPerPage: number;

    constructor(){
        this.taskPerPage = 4;
    }

    get endpointUrl(): string {
        return endpoint;
    }

    get endHttpOptions(): any {
        return httpOptions;
    }


    protected handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.error(error);            
            console.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
    protected extractData(res: Response) {
        let body = res;        
        return body || {};
    }
}