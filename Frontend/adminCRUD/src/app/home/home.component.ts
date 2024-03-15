import { Component, OnInit, Input, Type } from '@angular/core';
import { Router } from "@angular/router";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { HttpProviderService } from "../Service/http-provider.service";
import { NgZone } from '@angular/core';

@Component({
  selector: 'ng-modal-confirm',
  template: `
  <div class="modal-header">
    <h5 class="modal-title" id="modal-title">Delete Confirmation</h5>
    <button type="button" class="btn close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">x</span>
    </button>
  </div>
  <div class="modal-body">
    <p>¿Está seguro de que desea eliminar el usuario?</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">CANCELAR</button>
    <button type="button" ngbAutofocus class="btn btn-success" (click)="modal.close('Ok click')">OK</button>
  </div>
  `
})

export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) {
  }
}

const MODALS: { [name:string]: Type<any> } = {
  deleteModal: NgModalConfirm
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  closeResult = ''
  userList: any = []

  constructor(private router: Router, private modalService: NgbModal, private toastr: ToastrService, private httpProvider: HttpProviderService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.getAllUser()
  }

  async getAllUser(){
    this.httpProvider.getAllUser().subscribe((data: any)=>{
      if (data != null && data.body != null) {
        var resultData = data.body
        if (resultData) {
          this.userList = resultData
        }
      }
    },
    (error: any)=>{
      if (error) {
        if (error.status == 404) {
          if (error.error && error.error.message) {
            this.userList = []
          }
        }
      }
    })
  }

  AddUser() {
    this.router.navigate(['AddUser'])
  }

  deleteUserConfirmation(user: any) {
    this.modalService.open(MODALS['deleteModal'],
    {
      ariaLabelledBy: 'modal-basic-title'
    }).result.then((result)=>{
      this.deleteUser(user)
    },
      (reason)=>{})
  }

  deleteUser(user: any) {
    this.httpProvider.deleteUserByID(user._id).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body
        this.toastr.success(`Usuario con nombre ${resultData.nombre} eliminado correctamente.`);
        //Para refrescar
        this.getAllUser();
      }
    },
    (error: any) => {})
  }
}
