// http-provider-service.ts
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WebApiService } from './web-api.service';

var apiUrl = "http://localhost:9000";

var httpLink = {
  getAllUser: apiUrl + "/api/v2/usuarios/getAllUser",
  deleteUserByID: apiUrl + "/api/v2/usuarios/deleteUserByID",
  getUserDetailByID: apiUrl + "/api/v2/usuarios/getUserDetailByID",
  saveUser: apiUrl + "/api/v2/usuarios/saveUser",
  editUser: apiUrl + "/api/v2/usuarios/editUser",
}

@Injectable({
  providedIn: 'root',
})
export class HttpProviderService {
  constructor(private webApiService: WebApiService) { }

  public getAllUser(): Observable<any> {
    return this.webApiService.get(httpLink.getAllUser).pipe(
      catchError(error => {
        console.error('Error en la solicitud getAllUser:', error);
        return throwError(error);
      })
    );
  }

  public deleteUserByID(userId: string): Observable<any> {
    return this.webApiService.delete(`${httpLink.deleteUserByID}/${userId}`).pipe(
      catchError(error => {
        console.error('Error en la solicitud deleteUserByID:', error);
        return throwError(error);
      })
    );
  }

  public getUserDetailByID(userId: string): Observable<any> {
    return this.webApiService.get(`${httpLink.getUserDetailByID}/${userId}`).pipe(
      catchError(error => {
        console.error('Error en la solicitud getUserDetailByID:', error);
        return throwError(error);
      })
    );
  }

  public saveUser(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveUser, model).pipe(
        catchError(error => {
            console.error('Error en la solicitud saveUser:', error);
            return throwError(error);
        })
    );
}

  public editUser(userId: string, model: any): Observable<any> {
    return this.webApiService.put(`${httpLink.editUser}/${userId}`, model).pipe(
      catchError(error => {
        console.error('Error en la solicitud editUser:', error);
        return throwError(error);
      })
    );
  }
}
