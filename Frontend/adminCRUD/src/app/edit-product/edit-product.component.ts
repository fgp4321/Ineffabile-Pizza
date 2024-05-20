import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { HttpProviderService } from "../Service/http-provider.service";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  editProductForm: ProductForm = new ProductForm();
  selectedFile: File | null = null;

  @ViewChild("productForm")
  productForm!: NgForm;

  isSubmitted: boolean = false;
  productId: any;
  imagenActual: string = '';

  constructor(
    private toastr: ToastrService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private httpProvider: HttpProviderService
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params["productId"];
    this.getProductDetailByID();
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  getProductDetailByID() {
    this.httpProvider.getProductDetailByID(this.productId).subscribe(
      (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData) {
            this.editProductForm.nombre = resultData.nombre;
            this.editProductForm.descripcion = resultData.descripcion;
            this.editProductForm.precio_pvp = resultData.precio_pvp;
            this.editProductForm.precio_oferta = resultData.precio_oferta;
            this.editProductForm.categoria_nombre = resultData.categoria_nombre;
            this.editProductForm.imagen1 = resultData.imagen1;
            this.imagenActual = this.getImagePath(resultData); // Añadir la ruta de la imagen actual
          }
        }
      },
      (error: any) => {
        console.error('Error obteniendo detalles del producto:', error);
      }
    );
  }

  getImagePath(product: any): string {
    if (product.imagen1.startsWith('http://') || product.imagen1.startsWith('https://')) {
        return product.imagen1;
    }
    let basePath = 'http://localhost:9100/images/';
    switch (product.categoria_nombre) {
        case 'Bebidas':
            return basePath + 'bebidas/' + product.imagen1;
        case 'Complementos':
            return basePath + 'complementos/' + product.imagen1;
        case 'Pastas':
            return basePath + 'pastas/' + product.imagen1;
        case 'Pizzas':
            return basePath + 'pizzas/' + product.imagen1;
        default:
            return basePath + 'otros/' + product.imagen1;  // Para categorías no especificadas
    }
  }

  EditProduct(isValid: any) {
    this.isSubmitted = true;

    if (isValid) {
      const formData = new FormData();
      formData.append('nombre', this.editProductForm.nombre);
      formData.append('descripcion', this.editProductForm.descripcion);
      formData.append('precio_pvp', this.editProductForm.precio_pvp);
      formData.append('precio_oferta', this.editProductForm.precio_oferta);
      formData.append('categoria_nombre', this.editProductForm.categoria_nombre);

      if (this.selectedFile) {
        formData.append('imagen1', this.selectedFile);
      } else {
        formData.append('imagen1', this.editProductForm.imagen1);
      }

      this.httpProvider.editProduct(this.productId, formData).subscribe(
        (data: any) => {
          if (data != null && data.body != null) {
            var resultData = data.body;
            this.toastr.success(`Producto: "${resultData.nombre}" modificado correctamente.`);
            setTimeout(() => {
              this.router.navigate(['/Home']);
            }, 500);
          }
        },
        (error: any) => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        }
      );
    }
  }
}

export class ProductForm {
  nombre: string = "";
  descripcion: string = "";
  precio_pvp: string = "";
  precio_oferta: string = "";
  categoria_nombre: string = "";
  imagen1: string = "";
}
