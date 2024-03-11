import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { HttpProviderService } from "../Service/http-provider.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})

export class EditUserComponent implements OnInit {
  editUserForm: userForm = new userForm()

  @ViewChild("userForm")
  userForm!: NgForm

  isSubmitted: boolean = false
  userId: any
  showPassword: boolean = false;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router, private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params["userId"]
    this.getUserDetailByID()
  }

  getUserDetailByID(){
    this.httpProvider.getUserDetailByID(this.userId).subscribe((data: any)=>{
      if (data != null && data.body != null) {
        var resultData = data.body
        if (resultData) {
          this.editUserForm.nombre = resultData.nombre;
          this.editUserForm.apellido = resultData.apellido;
          this.editUserForm.username = resultData.username;
          this.editUserForm.email = resultData.email;
          this.editUserForm.telefono = resultData.telefono;
        }
      }
    },
    (error:any) => { })
  }

  EditUser(isValid: any) {
    this.isSubmitted = true;
  
    if (isValid) {
      this.httpProvider.editUser(this.userId, this.editUserForm).subscribe(
        async (data) => {
          if (data != null && data.body != null) {
            var resultData = data.body;
            if (resultData != null && resultData.isSuccess) {
              this.toastr.success(resultData.message);
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);
            }
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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}

export class userForm {
  nombre: string = "";
  apellido: string = "";
  username: string = "";
  email: string = "";
  password: string = "";
  telefono: string = "";
  rol: string[] = []; // Updated to store multiple roles
}
