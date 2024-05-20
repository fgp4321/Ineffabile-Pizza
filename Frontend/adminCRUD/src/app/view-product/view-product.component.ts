import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpProviderService } from "../Service/http-provider.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

  productId: any;
  productDetail: any = [];

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private httpProvider: HttpProviderService
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['productId'];
    this.getProductDetailByID();
  }

  getProductDetailByID() {
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
        console.error('Error obteniendo detalles del producto:', error);
      }
    );
  }

  getImagePath(product: any): string {
    // Comprobar si la imagen ya es una URL válida
    if (product.imagen1.startsWith('http://') || product.imagen1.startsWith('https://')) {
      return product.imagen1;
    }

    // Construir la ruta basada en la URL del backend
    let basePath = 'http://localhost:9100/images/';
    switch (product.categoria_nombre.toLowerCase()) {
      case 'bebidas':
        return basePath + 'bebidas/' + product.imagen1;
      case 'complementos':
        return basePath + 'complementos/' + product.imagen1;
      case 'pastas':
        return basePath + 'pastas/' + product.imagen1;
      case 'pizzas':
        return basePath + 'pizzas/' + product.imagen1;
      default:
        return basePath + 'otros/' + product.imagen1;  // Para categorías no especificadas
    }
  }
}
