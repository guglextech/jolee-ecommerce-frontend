import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from 'src/app/core/services/cart.service';
import { CountryService } from 'src/app/core/services/country.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
  ],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  subtotal: number = 0;
  shipping: number = 0;
  tax: number = 0;
  total: number = 0;
  isUpdating: boolean = false;
  promoCode: string = '';
  promoDiscount: number = 0;
  promoApplied: boolean = false;

  constructor(
    private cartService: CartService,
    private countryService: CountryService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadCart();

    // Subscribe to cart changes
    this.cartService.cart$.subscribe(() => {
      this.loadCart();
    });

    // Subscribe to country changes to update prices
    this.countryService.country$.subscribe(() => {
      this.calculateTotals();
    });
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotals();
  }

  getPrice(item: any): number {
    const country = this.countryService.getCurrentCountry();
    const priceInfo = item?.find((p: any) => p.countryCode === country);
    return priceInfo ? priceInfo.amount : 0;
  }

  calculateTotals(): void {
    // Calculate subtotal
    this.subtotal = this.cartItems.reduce((total, item) => {
      const priceInfo = this.getPrice(item.price);
      return total + priceInfo * item.quantity;
    }, 0);

    // Calculate shipping (could be more complex based on country, weight, etc.)
    const country = this.countryService.getCurrentCountry();
    this.shipping = this.subtotal > 0 ? (country === 'GH' ? 15 : 5.99) : 0;

    // Calculate tax
    this.tax = this.subtotal * (country === 'GH' ? 0.03 : 0.07); // 3% for Ghana, 7% for US

    // Apply promo discount if any
    const discountedSubtotal = this.subtotal - this.promoDiscount;

    // Calculate total
    this.total = discountedSubtotal + this.shipping + this.tax;
  }

  updateQuantity(itemId: string, newQuantity: number): void {
    if (newQuantity < 1) {
      return;
    }

    this.isUpdating = true;
    this.cartService.updateQuantity(itemId, newQuantity);
    this.loadCart();

    setTimeout(() => {
      this.isUpdating = false;
    }, 300);
  }

  removeItem(itemId: string): void {
    this.cartService.removeFromCart(itemId);
    this.notificationService.success('Item removed from cart');
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.notificationService.info('Cart has been cleared');
  }

  applyPromoCode(): void {
    // Simple promo code implementation (in a real app, this would call an API)
    const validPromos: { [key: string]: number } = {
      SAVE10: 0.1,
      WELCOME15: 0.15,
      FREESHIP: 0,
    };

    if (this.promoCode && validPromos[this.promoCode.toUpperCase()]) {
      const discountRate = validPromos[this.promoCode.toUpperCase()];

      if (this.promoCode.toUpperCase() === 'FREESHIP') {
        this.shipping = 0;
        this.promoApplied = true;
        this.notificationService.success('Free shipping applied!');
      } else {
        this.promoDiscount = this.subtotal * discountRate;
        this.promoApplied = true;
        this.notificationService.success(
          `${discountRate * 100}% discount applied!`
        );
      }

      this.calculateTotals();
    } else {
      this.notificationService.error('Invalid promo code');
    }
  }

  removePromo(): void {
    this.promoCode = '';
    this.promoDiscount = 0;
    this.promoApplied = false;
    this.calculateTotals();
  }

  checkout(): void {
    // In a real app, this would navigate to checkout page or process
    this.notificationService.info('Proceeding to checkout...');
    // this.router.navigate(['/checkout']);
  }

  // Helper method to format currency based on current country
  // formatPrice(price: number): string {
  //   return this.countryService.formatPrice(price);
  // }

  // Helper method to increment quantity
  incrementQuantity(item: any): void {
    if (item.quantity > item.available) return;
    this.updateQuantity(item.productId, item.quantity + 1);
  }

  // Helper method to decrement quantity
  decrementQuantity(item: any): void {
    if (item.quantity > 1) {
      this.updateQuantity(item.productId, item.quantity - 1);
    }
  }
}
