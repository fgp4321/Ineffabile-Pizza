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

  constructor(private toastr: ToastrService, public webApiService: WebApiService, private route: ActivatedRoute, private httpProvider: HttpProviderService) { }

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
            this.productDetail.imagenRuta = this.getImagePath(resultData); // Añadir ruta de imagen modificada
          }
        }
      },
      (error: any) => {
        console.error('Error obteniendo detalles del usuario:', error);
      }
    );
  }

  getImagePath(product: any): string {
    let basePath = '/assets/';
    switch (product.categoria_nombre) {  // Asumiendo que 'categoria_nombre' es cómo se recibe la categoría
      case 'Bebidas':
        return basePath + 'bebidas/' + product.imagen1;
      case 'Complementos':
        return basePath + 'complementos/' + product.imagen1;
      case 'Pastas':
        return basePath + 'pastas/' + product.imagen1;
      case 'Pizzas':
        return basePath + 'pizzas/' + product.imagen1;
      default:
        return basePath + 'otros/' + product.imagen1;  // Para cualquier categoría no especificada
    }
  }
}
