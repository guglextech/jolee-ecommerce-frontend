import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CountryService } from './country.service';
import { CartItem } from '../models/cart-item.model';

export interface CartSummary {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  itemCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();
  public cart$ = this.cartItemsSubject.asObservable();

  private cartSummarySubject = new BehaviorSubject<CartSummary>({
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0,
    itemCount: 0,
  });
  public cartSummary$ = this.cartSummarySubject.asObservable();

  constructor(
    private http: HttpClient,
    private countryService: CountryService
  ) {
    this.loadCart();
    this.countryService.country$.subscribe(() => {
      this.loadCart();
    });
  }

  private loadCart(): void {
    const country = this.countryService.getCurrentCountry();
    const cartKey = `cart_${country}`;
    const storedCart = localStorage.getItem(cartKey);

    if (storedCart) {
      try {
        const cartItems: CartItem[] = JSON.parse(storedCart);
        this.cartItemsSubject.next(cartItems);
        this.updateCartSummary();
      } catch (e) {
        localStorage.removeItem(cartKey);
        this.cartItemsSubject.next([]);
        this.updateCartSummary();
      }
    } else {
      this.cartItemsSubject.next([]);
      this.updateCartSummary();
    }
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.getValue();
  }

  private saveCart(): void {
    const country = this.countryService.getCurrentCountry();
    const cartKey = `cart_${country}`;
    localStorage.setItem(cartKey, JSON.stringify(this.cartItemsSubject.value));
    this.updateCartSummary();
  }

  addToCart(product: any, quantity: number = 1): void {
    const currentCart = this.cartItemsSubject.value;
    const existingItemIndex = currentCart.findIndex(
      (item) => item.productId === product.id
    );

    if (existingItemIndex !== -1) {
      // Update existing item
      return;
      // const updatedCart = [...currentCart];
      // updatedCart[existingItemIndex].quantity += quantity;
      // this.cartItemsSubject.next(updatedCart);
    } else {
      // Add new item
      const newItem: CartItem = {
        productId: product.id,
        name: product.name,
        price: product.prices,
        image: product.images[0] || '',
        quantity: product.quantity,
        cartQty: quantity,
        available: product.totalQty - product.totalSold,
      };
      this.cartItemsSubject.next([...currentCart, newItem]);
    }

    this.saveCart();
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const currentCart = this.cartItemsSubject.value;
    const itemIndex = currentCart.findIndex(
      (item) => item.productId === productId
    );

    if (itemIndex !== -1) {
      const updatedCart = [...currentCart];
      updatedCart[itemIndex].cartQty = quantity;
      this.cartItemsSubject.next(updatedCart);
      this.saveCart();
    }
  }

  removeFromCart(productId: string): void {
    const filteredCart = this.cartItemsSubject.value.filter(
      (item) => item.productId !== productId
    );
    this.cartItemsSubject.next(filteredCart);
    this.saveCart();
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    this.saveCart();
  }

  getItemCount(): number {
    return this.cartItemsSubject.value.length;
  }

  private updateCartSummary(): void {
    const items = this.cartItemsSubject.value;
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = this.countryService.calculateTax(subtotal);

    // Default to 0 shipping until shipping method is selected
    const shipping = 0;

    this.cartSummarySubject.next({
      subtotal,
      tax,
      shipping,
      total: subtotal + tax + shipping,
      itemCount: this.getItemCount(),
    });
  }

  /**
   * Updates the shipping cost and recalculates the total cost of the order
   * @param shippingCost The new shipping cost
   */
  updateShipping(shippingCost: number): void {
    const summary = this.cartSummarySubject.value;
    this.cartSummarySubject.next({
      ...summary,
      shipping: shippingCost,
      total: summary.subtotal + summary.tax + shippingCost,
    });
  }

  checkout(shippingDetails: any, paymentDetails: any) {
    const country = this.countryService.getCurrentCountry();
    console.log({
      shippingDetails,
      paymentDetails,
    });
    return this.http.post(
      `${environment.API_URL}/payment/create-invoice`,
      paymentDetails
    );
    // .pipe(
    //   map((response) => {
    //     this.clearCart();
    //     return response;
    //   })
    // );
  }
}
