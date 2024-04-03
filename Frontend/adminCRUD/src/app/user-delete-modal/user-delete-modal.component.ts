import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-delete-modal',
  templateUrl: './user-delete-modal.component.html'
})
export class UserDeleteModalComponent {
  constructor(public modal: NgbActiveModal) {}
}