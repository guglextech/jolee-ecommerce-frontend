import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// import { AddressModalComponent } from '../../../../shared/components/ui/modal/address-modal/address-modal.component';
import { user } from 'src/app/core/data/user';
import { AddressModalComponent } from './address-modal/address-modal.component';

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [],
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.scss',
})
export class ShippingComponent {
  public userDetails = user;

  constructor(private modal: NgbModal) {}

  openAddressModal() {
    this.modal.open(AddressModalComponent, { size: 'lg', centered: true });
  }
}
