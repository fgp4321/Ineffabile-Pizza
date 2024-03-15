import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { HttpProviderService } from "../Service/http-provider.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  addUserForm: UserForm = new UserForm();

  @ViewChild("userForm")
  userForm!: NgForm;
  isSubmitted: boolean = false;

  constructor(private router: Router, private httpProvider: HttpProviderService, private toastr: ToastrService) { }

  ngOnInit(): void {}

  AddUser(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.saveUser(this.addUserForm).subscribe(async data => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          this.toastr.success(`Usuario: ${resultData.nombre} registrado correctamente.`);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        }
      },
      async error => {
        this.toastr.error(error.message);
        setTimeout(() => {
          this.router.navigate(['/Home']);
        }, 500);
      });
    }
  }

  togglePasswordVisibility(): void {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const eyeIcon = document.querySelector('.password-input-container i') as HTMLElement;

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}
}



export class UserForm {
  nombre: string = "";
  apellido: string = "";
  username: string = "";
  email: string = "";
  password: string = "";
  telefono: string = "";
  rol: string[] = []; // Updated to store multiple roles
}