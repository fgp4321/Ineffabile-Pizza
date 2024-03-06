import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { WebApiService } from "./web-api.service";

var apiUrl = "http://localhost:9000/"

var httpLink = {
  getAllUser: apiUrl + "/api/user/getAllUser",
  deleteUserByID: apiUrl + "/api/user/deleteUserByID",
  getUserDetailByID: apiUrl + "/api/user/getUserDetailByID",
  saveUser: apiUrl + "/api/user/saveUser"
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
    return this.webApiService.post(httpLink.deleteUserByID + '?employeeId=' + model, "")
  }

  public getUserDetailByID(model: any): Observable<any> {
    return this.webApiService.get(httpLink.getUserDetailByID + '?employeeId=' + model)
  }

  public saveUser(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveUser,model)
  }
}
