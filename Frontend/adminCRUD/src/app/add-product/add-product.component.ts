import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { HttpProviderService } from "../Service/http-provider.service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  addProductForm: ProductForm = new ProductForm();
  selectedFile: File | null = null;

  @ViewChild("productForm")
  productForm!: NgForm;
  isSubmitted: boolean = false;

  constructor(
    private router: Router,
    private httpProvider: HttpProviderService,
    private toastr: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  AddProduct(isValid: any) {
    this.isSubmitted = true;
    if (isValid && this.selectedFile) {
      const formData = new FormData();
      formData.append('nombre', this.addProductForm.nombre);
      formData.append('descripcion', this.addProductForm.descripcion);
      formData.append('precio_pvp', this.addProductForm.precio_pvp);
      formData.append('precio_oferta', this.addProductForm.precio_oferta);
      formData.append('categoria_nombre', this.addProductForm.categoria_nombre);
      formData.append('imagen1', this.selectedFile);

      this.http.post('http://localhost:9100/api/v2/productos/saveProduct', formData).subscribe({
        next: (data: any) => {
          this.toastr.success(`Producto registrado correctamente.`);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        },
        error: (error: any) => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        }
      });
    }
  }
}

export class ProductForm {
  nombre: string = "";
  descripcion: string = "";
  precio_pvp: string = "";
  precio_oferta: string = "";
  categoria_nombre: string = "";
}
