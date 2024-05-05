import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";

import { AddUserComponent } from "./add-user/add-user.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { ViewUserComponent } from "./view-user/view-user.component";

import { AddProductComponent } from "./add-product/add-product.component";
import { EditProductComponent } from "./edit-product/edit-product.component";
import { ViewProductComponent } from "./view-product/view-product.component";

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'ViewUser/:userId', component: ViewUserComponent },
  { path: 'AddUser', component: AddUserComponent },
  { path: 'EditUser/:userId', component: EditUserComponent },

  { path: 'ViewProduct/:productId', component: ViewProductComponent },
  { path: 'AddProduct', component: AddProductComponent },
  { path: 'EditProduct/:productId', component: EditProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
