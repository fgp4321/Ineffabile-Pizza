import { Component, OnInit, Input, Type } from '@angular/core';
import { Router } from "@angular/router";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { HttpProviderService } from "../Service/http-provider.service";
import { NgZone } from '@angular/core';
import { UserDeleteModalComponent } from '../user-delete-modal/user-delete-modal.component';
import { ProductDeleteModalComponent } from '../product-delete-modal/product-delete-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  closeResult = ''
  userList: any = []
  productList: any = []

  constructor(private router: Router, private modalService: NgbModal, private toastr: ToastrService, private httpProvider: HttpProviderService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.getAllUser()
    this.getAllProduct()
  }

  async getAllUser(){
    this.httpProvider.getAllUser().subscribe((data: any)=>{
      if (data != null && data.body != null) {
        var resultData = data.body
        if (resultData) {
          this.userList = resultData
        }
      }
    },
    (error: any)=>{
      if (error) {
        if (error.status == 404) {
          if (error.error && error.error.message) {
            this.userList = []
          }
        }
      }
    })
  }

  AddUser() {
    this.router.navigate(['AddUser'])
  }

  deleteUserConfirmation(user: any) {
    this.modalService
      .open(UserDeleteModalComponent, { ariaLabelledBy: 'modal-basic-title' }) // Usar el componente modal de usuario
      .result.then(
        (result) => {
          this.deleteUser(user);
        },
        (reason) => {}
      );
  }

  deleteUser(user: any) {
    this.httpProvider.deleteUserByID(user._id).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body
        this.toastr.success(`Usuario con nombre "${resultData.nombre}" eliminado correctamente.`);
        //Para refrescar
        this.getAllUser();
      }
    },
    (error: any) => {})
  }



  async getAllProduct(){
    this.httpProvider.getAllProduct().subscribe((data: any)=>{
      if (data != null && data.body != null) {
        var resultData = data.body
        if (resultData) {
          this.productList = resultData
        }
      }
    },
    (error: any)=>{
      if (error) {
        if (error.status == 404) {
          if (error.error && error.error.message) {
            this.productList = []
          }
        }
      }
    })
  }

  AddProduct() {
    this.router.navigate(['AddProduct'])
  }

  deleteProductConfirmation(product: any) {
    this.modalService
      .open(ProductDeleteModalComponent, { ariaLabelledBy: 'modal-basic-title' }) // Usar el componente modal de producto
      .result.then(
        (result) => {
          this.deleteProduct(product);
        },
        (reason) => {}
      );
  }

  deleteProduct(product: any) {
    this.httpProvider.deleteProductByID(product._id).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body
        this.toastr.success(`Producto con nombre "${resultData.nombre}" eliminado correctamente.`);
        //Para refrescar
        this.getAllProduct();
      }
    },
    (error: any) => {})
  }

  isPrecioOfertaAvailable(product: any): boolean {
    return product.precio_oferta !== null && product.precio_oferta !== undefined;
  }
}
