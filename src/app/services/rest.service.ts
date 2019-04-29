import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {c,endpoint} from '../constants';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept':  'application/json',
    })
};
@Injectable({
    providedIn: 'root'
})
export class RestService {

    constructor(private http: HttpClient) { }

    private extractData(res : Response){
        let body = res;        
        return body || {};
    }

    getUsers(): Observable<any> {
        let ep = endpoint + 'getUsers';        
        return this.http.get(ep).pipe(
        map(this.extractData));
    }

    register (formData): Observable<any> {
        c.log(formData);
        return this.http.post<any>(endpoint + 'register', JSON.stringify(formData), httpOptions).pipe(
          tap((formData) => c.log(`added product w/ id=${formData.id}`))          
        );
    }

    login (formData): Observable<any> {            
        return this.http.post<any>(endpoint + 'login', JSON.stringify(formData), httpOptions).pipe(
          tap(formData)
        );
    }

    getUser (token): Observable<any> {   
        let httpOptns = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Accept':  'application/json',
                'Authorization': 'Bearer '+token,
            })
        };         
        return this.http.post<any>(endpoint + 'getUser','',httpOptns).pipe();
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
      
          // TODO: send the error to remote logging infrastructure
          c.error(error); // log to c instead
      
          // TODO: better job of transforming error for user consumption
          c.log(`${operation} failed: ${error.message}`);
      
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
    }

    productList(){
        let ep = endpoint + 'products';        
        return this.http.get(ep).pipe(
        map(this.extractData));
    }
}
