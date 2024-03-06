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
  addUserForm: userForm = new userForm()

  @ViewChild("userForm")
  userForm!: NgForm
  isSubmitted: boolean = false
  constructor(private router: Router, private httpProvider: HttpProviderService, private toastr: ToastrService) { }

  ngOnInit(): void {}

  AddUser(isValid: any){
    this.isSubmitted = true
    if (isValid) {
      this.httpProvider.saveUser(this.addUserForm).subscribe(async data => {
        if (data != null && data.body != null) {
          if (data != null && data.body != null) {
            var resultData = data.body
            if (resultData != null && resultData.isSuccess) {
              this.toastr.success(resultData.message)
              setTimeout(()=>{
                this.router.navigate(['/Home'])
              }, 500)
            }
          }
        }
      },
      async error => {
        this.toastr.error(error.message)
        setTimeout(()=>{
          this.router.navigate(['/Home'])
        },500)
      })
    }
  }
}


export class userForm {
  nombre: string = ""
  apellido: string = ""
  username: string = ""
  email: string = ""
  telefono: string = ""
}