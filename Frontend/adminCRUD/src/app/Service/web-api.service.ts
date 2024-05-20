// web-api.service.ts
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WebApiService {
  constructor(private httpClient: HttpClient) { }

  // GET call
  get(url:string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }),
      observe: "response" as 'body'
    }
    return this.httpClient.get(
      url,
      httpOptions
    )
    .pipe(
      map((response: any) => this.ReturnResponseData(response)),
      catchError(this.handleError)
    )
  }

  // POST call
  post(url: string, model: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), 
      observe: "response" as 'body'
    };
    return this.httpClient.post(  
      url,
      model,
      httpOptions)
      .pipe(
        map((response: any) => this.ReturnResponseData(response)),
        catchError(this.handleError)
      
    );
  }

  // PUT call
  put(url: string, model: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json' // Eliminar esta línea para permitir que el navegador establezca el tipo de contenido para FormData
      }), 
      observe: "response" as 'body'
    };
    return this.httpClient.put(  
      url,
      model,
      httpOptions)
      .pipe(
        map((response: any) => this.ReturnResponseData(response)),
        catchError(this.handleError)
      
    );
  }
  
  // DELETE call
  delete(url: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: "response" as 'body'
    };
    return this.httpClient.delete(
      url,
      httpOptions
    ).pipe(
      map((response: any) => this.ReturnResponseData(response)),
      catchError(this.handleError)
    );
  }

  private ReturnResponseData(response: any) {
    return response;
  }
  
  private handleError(error: any) {
    return throwError(error);
  }
}
