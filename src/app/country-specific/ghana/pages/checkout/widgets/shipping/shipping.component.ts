import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// import { AddressModalComponent } from '../../../../shared/components/ui/modal/address-modal/address-modal.component';
import { user } from 'src/app/core/data/user';
import { AddressModalComponent } from './address-modal/address-modal.component';
import { AuthService } from 'src/app/auth/auth.service';
import { UserProfile } from 'src/app/core/models/user';

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [],
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.scss',
})
export class ShippingComponent implements OnInit {
  public userDetails: UserProfile | null = null;

  constructor(private modal: NgbModal, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe({
      next: (user) => {
        if (user) {
          console.log('User details fetched:', user);
          this.userDetails = user;
        }
      },
      error: (err) => console.error('Error fetching user details:', err),
    });
  }

  openAddressModal() {
    this.modal.open(AddressModalComponent, { size: 'lg', centered: true });
  }
}
