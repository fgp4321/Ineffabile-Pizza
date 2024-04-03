import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-delete-modal',
  templateUrl: './product-delete-modal.component.html'
})
export class ProductDeleteModalComponent {
  constructor(public modal: NgbActiveModal) {}
}
