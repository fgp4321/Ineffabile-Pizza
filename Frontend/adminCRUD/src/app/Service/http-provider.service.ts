// http-provider-service.ts
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WebApiService } from './web-api.service';

//URL Backend
var apiUrl = "http://localhost:9100";

//API Usuarios
var userHttpLink = {
  getAllUser: apiUrl + "/api/v2/usuarios/getAllUser",
  deleteUserByID: apiUrl + "/api/v2/usuarios/deleteUserByID",
  getUserDetailByID: apiUrl + "/api/v2/usuarios/getUserDetailByID",
  saveUser: apiUrl + "/api/v2/usuarios/saveUser",
  editUser: apiUrl + "/api/v2/usuarios/editUser",
}

//API Productos
var productHttpLink = {
  getAllProduct: apiUrl + "/api/v2/productos/getAllProduct",
  deleteProductByID: apiUrl + "/api/v2/productos/deleteProductByID",
  getProductDetailByID: apiUrl + "/api/v2/productos/getProductDetailByID",
  saveProduct: apiUrl + "/api/v2/productos/saveProduct",
  editProduct: apiUrl + "/api/v2/productos/editProduct",
}

//API Pedidos
var orderHttpLink = {
  getAllOrder: apiUrl + "/pedidos/getAllOrder",
  deleteOrderByID: apiUrl + "/pedidos/deleteOrderByID",
  getOrderDetailByID: apiUrl + "/pedidos/getOrderDetailByID",
  saveOrder: apiUrl + "/pedidos/saveOrder",
  editOrder: apiUrl + "/pedidos/editOrder",
}

@Injectable({
  providedIn: 'root',
})
export class HttpProviderService {
  constructor(private webApiService: WebApiService) { }

  //USUARIOS
  public getAllUser(): Observable<any> {
    return this.webApiService.get(userHttpLink.getAllUser).pipe(
      catchError(error => {
        console.error('Error en la solicitud getAllUser:', error);
        return throwError(error);
      })
    );
  }

  public deleteUserByID(userId: string): Observable<any> {
    return this.webApiService.delete(`${userHttpLink.deleteUserByID}/${userId}`).pipe(
      catchError(error => {
        console.error('Error en la solicitud deleteUserByID:', error);
        return throwError(error);
      })
    );
  }

  public getUserDetailByID(userId: string): Observable<any> {
    return this.webApiService.get(`${userHttpLink.getUserDetailByID}/${userId}`).pipe(
      catchError(error => {
        console.error('Error en la solicitud getUserDetailByID:', error);
        return throwError(error);
      })
    );
  }

  public saveUser(model: any): Observable<any> {
    return this.webApiService.post(userHttpLink.saveUser, model).pipe(
        catchError(error => {
            console.error('Error en la solicitud saveUser:', error);
            return throwError(error);
        })
    );
}

  public editUser(userId: string, model: any): Observable<any> {
    return this.webApiService.put(`${userHttpLink.editUser}/${userId}`, model).pipe(
      catchError(error => {
        console.error('Error en la solicitud editUser:', error);
        return throwError(error);
      })
    );
  }


  //-----------------------------------------------------------------------



  //PRODUCTOS
  public getAllProduct(): Observable<any> {
    return this.webApiService.get(productHttpLink.getAllProduct).pipe(
      catchError(error => {
        console.error('Error en la solicitud getAllProduct:', error);
        return throwError(error);
      })
    );
  }

  public deleteProductByID(productId: string): Observable<any> {
    return this.webApiService.delete(`${productHttpLink.deleteProductByID}/${productId}`).pipe(
      catchError(error => {
        console.error('Error en la solicitud deleteProductByID:', error);
        return throwError(error);
      })
    );
  }

  public getProductDetailByID(productId: string): Observable<any> {
    return this.webApiService.get(`${productHttpLink.getProductDetailByID}/${productId}`).pipe(
      catchError(error => {
        console.error('Error en la solicitud getProductDetailByID:', error);
        return throwError(error);
      })
    );
  }

  public saveProduct(model: any): Observable<any> {
    return this.webApiService.post(productHttpLink.saveProduct, model).pipe(
        catchError(error => {
            console.error('Error en la solicitud saveProduct:', error);
            return throwError(error);
        })
    );
}

  public editProduct(productId: string, model: any): Observable<any> {
    return this.webApiService.put(`${productHttpLink.editProduct}/${productId}`, model).pipe(
      catchError(error => {
        console.error('Error en la solicitud editProduct:', error);
        return throwError(error);
      })
    );
  }


//-----------------------------------------------------------------------
}
