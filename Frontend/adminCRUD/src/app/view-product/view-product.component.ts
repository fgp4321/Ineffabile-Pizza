import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpProviderService } from "../Service/http-provider.service";
import { WebApiService } from "../Service/web-api.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

  productId: any
  productDetail: any = []
  showPassword: boolean = false;

  constructor(private toastr: ToastrService,public webApiService: WebApiService, private route: ActivatedRoute, private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['productId']
    this.getProductDetailByID();
  }

  getProductDetailByID(){
    this.httpProvider.getProductDetailByID(this.productId).subscribe(
      (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData) {
            this.toastr.success(`Visualizando detalles de "${resultData.nombre}".`);
            this.productDetail = resultData;
          }
        }
      },
      (error: any) => {
        console.error('Error obteniendo detalles del usuario:', error);
      }
    );
  }

}
