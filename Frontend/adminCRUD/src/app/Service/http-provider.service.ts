import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { WebApiService } from "./web-api.service";

var apiUrl = "http://localhost:9000"

var httpLink = {
  getAllUser: apiUrl + "/api/v2/usuarios",
  deleteUserByID: apiUrl + "/api/v2/usuarios/deleteUserByID",
  getUserDetailByID: apiUrl + "/api/v2/usuarios/getUserDetailByID",
  saveUser: apiUrl + "/api/v2/usuarios/saveUser"
}

@Injectable({
  providedIn: 'root'
})

export class HttpProviderService {
  constructor(private webApiService: WebApiService) { }

  public getAllUser(): Observable<any> {
    return this.webApiService.get(httpLink.getAllUser)
  }

  public deleteUserByID(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteUserByID + '?userId=' + model, "")
  }

  public getUserDetailByID(model: any): Observable<any> {
    return this.webApiService.get(httpLink.getUserDetailByID + '?userId=' + model)
  }

  public saveUser(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveUser,model)
  }
}
