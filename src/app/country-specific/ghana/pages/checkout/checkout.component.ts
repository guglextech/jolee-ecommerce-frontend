import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

import { CompletedComponent } from './widgets/completed/completed.component';
import { InformationComponent } from './widgets/information/information.component';
import { PaymentComponent } from './widgets/payment/payment.component';
import { ShippingComponent } from './widgets/shipping/shipping.component';
// import { checkoutTabs, orderDetails } from '../../shared/data/order';
import { CardComponent } from 'src/app/features/admin/components/sharedComponents/card/card.component';
import { checkoutTabs, orderDetails } from 'src/app/core/data/order';
import { CartService } from 'src/app/core/services/cart.service';
import { CountryService } from 'src/app/core/services/country.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    NgbNavModule,
    CardComponent,
    InformationComponent,
    ShippingComponent,
    PaymentComponent,
    CompletedComponent,
    HeaderComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  public activeTab: number = 1;
  public orderDetails = orderDetails;
  public checkoutTabs = checkoutTabs;
  subtotal: number;

  constructor(
    public router: Router,
    public cart: CartService,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.calculateTotals();
  }

  handleStep(value: number) {
    if (value == -1) {
      this.activeTab = this.activeTab - 1;
    } else if (value == 1 && this.activeTab < this.checkoutTabs.length) {
      this.activeTab = this.activeTab + 1;
    }
  }

  getPrice(item: any): number {
    const country = this.countryService.getCurrentCountry();
    const priceInfo = item?.find((p: any) => p.countryCode === country);
    return priceInfo ? priceInfo.amount : 0;
  }

  calculateTotals(): void {
    // Calculate subtotal
    this.subtotal = this.cart.getCartItems().reduce((total, item) => {
      const priceInfo = this.getPrice(item.price);
      return total + priceInfo * item.quantity;
    }, 0);
  }

  placeOrder() {
    this.router.navigate(['/order/1']);
  }
}
