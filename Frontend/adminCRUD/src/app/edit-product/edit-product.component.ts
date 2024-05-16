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

  editProductForm: productForm = new productForm()

  @ViewChild("productForm")
  productForm!: NgForm

  isSubmitted: boolean = false
  productId: any

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router, private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params["productId"]
    this.getProductDetailByID()
  }

  getProductDetailByID(){
    this.httpProvider.getProductDetailByID(this.productId).subscribe((data: any)=>{
      if (data != null && data.body != null) {
        var resultData = data.body
        if (resultData) {
          this.editProductForm.nombre = resultData.nombre;
          this.editProductForm.descripcion = resultData.descripcion;
          this.editProductForm.precio_pvp = resultData.precio_pvp;
          this.editProductForm.precio_oferta = resultData.precio_oferta;
          this.editProductForm.categoria_nombre = resultData.categoria_nombre;
          this.editProductForm.imagen1 = resultData.imagen1;
        }
      }
    },
    (error:any) => { })
  }

  EditProduct(isValid: any) {
    this.isSubmitted = true;
  
    if (isValid) {
      // Agregar el símbolo de Euro al precio_oferta antes de enviar los datos
      this.editProductForm.precio_oferta = (+this.editProductForm.precio_oferta).toFixed(2);
      
      this.httpProvider.editProduct(this.productId, this.editProductForm).subscribe(
        async (data) => {
          if (data != null && data.body != null) {
            var resultData = data.body;
            this.toastr.success(`Producto: "${resultData.nombre}" modificado correctamente.`);
            setTimeout(() => {
              this.router.navigate(['/Home']);
            }, 500);
          }
        },
        async (error) => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        }
      );
    }
  }
}

export class productForm {
  nombre: string = "";
  descripcion: string = "";
  precio_pvp: string = "";
  precio_oferta: string = "";
  categoria_nombre: string = "";
  imagen1: string = "";
}
