// src/app/core/services/wishlist.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Product } from '../models/product.model';
import { AuthService } from './auth.service';
import { CountryService } from './country.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlistItemsSubject = new BehaviorSubject<Product[]>([]);
  public wishlist$ = this.wishlistItemsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private countryService: CountryService,
    private notificationService: NotificationService
  ) {
    this.loadWishlist();

    // Reload wishlist when country changes
    this.countryService.country$.subscribe(() => {
      this.loadWishlist();
    });

    // Reload wishlist when user authentication changes
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.syncWishlistWithServer();
      } else {
        this.loadLocalWishlist();
      }
    });
  }

  private loadWishlist(): void {
    if (this.authService.isAuthenticated()) {
      this.syncWishlistWithServer();
    } else {
      this.loadLocalWishlist();
    }
  }

  private loadLocalWishlist(): void {
    const country = this.countryService.getCurrentCountry();
    const wishlistKey = `wishlist_${country}`;
    const storedWishlist = localStorage.getItem(wishlistKey);

    if (storedWishlist) {
      try {
        const wishlistItems: Product[] = JSON.parse(storedWishlist);
        this.wishlistItemsSubject.next(wishlistItems);
      } catch (e) {
        localStorage.removeItem(wishlistKey);
        this.wishlistItemsSubject.next([]);
      }
    } else {
      this.wishlistItemsSubject.next([]);
    }
  }

  private saveLocalWishlist(): void {
    const country = this.countryService.getCurrentCountry();
    const wishlistKey = `wishlist_${country}`;
    localStorage.setItem(
      wishlistKey,
      JSON.stringify(this.wishlistItemsSubject.value)
    );
  }

  private syncWishlistWithServer(): void {
    const country = this.countryService.getCurrentCountry();

    this.http
      .get<{ items: Product[] }>(
        `${environment.API_URL}/wishlist?country=${country}`
      )
      .pipe(
        map((response) => response.items),
        catchError(() => {
          // If API fails, fall back to local storage
          this.loadLocalWishlist();
          return of([]);
        })
      )
      .subscribe((items) => {
        this.wishlistItemsSubject.next(items);
      });
  }

  addToWishlist(product: Product): void {
    const currentItems = this.wishlistItemsSubject.value;

    // Check if product is already in wishlist
    if (this.isInWishlist(product._id)) {
      this.notificationService.info('Product is already in your wishlist');
      return;
    }

    // Add to local state
    this.wishlistItemsSubject.next([...currentItems, product]);

    // Save to local storage (as backup)
    this.saveLocalWishlist();

    // If user is logged in, sync with server
    if (this.authService.isAuthenticated()) {
      this.http
        .post(`${environment.API_URL}/wishlist/add`, { productId: product._id })
        .pipe(
          catchError((error) => {
            // If API call fails, we keep the item in local state
            this.notificationService.error(
              'Failed to sync wishlist with server'
            );
            return of(null);
          })
        )
        .subscribe(() => {
          this.notificationService.success('Product added to wishlist');
        });
    } else {
      this.notificationService.success('Product added to wishlist');
    }
  }

  removeFromWishlist(productId: string): void {
    const currentItems = this.wishlistItemsSubject.value;
    const updatedItems = currentItems.filter((item) => item._id !== productId);

    // Update local state
    this.wishlistItemsSubject.next(updatedItems);

    // Save to local storage (as backup)
    this.saveLocalWishlist();

    // If user is logged in, sync with server
    if (this.authService.isAuthenticated()) {
      this.http
        .post(`${environment.API_URL}/wishlist/remove`, { productId })
        .pipe(
          catchError((error) => {
            // If API call fails, we still remove from local state
            this.notificationService.error(
              'Failed to sync wishlist with server'
            );
            return of(null);
          })
        )
        .subscribe(() => {
          this.notificationService.success('Product removed from wishlist');
        });
    } else {
      this.notificationService.success('Product removed from wishlist');
    }
  }

  clearWishlist(): void {
    // Update local state
    this.wishlistItemsSubject.next([]);

    // Clear from local storage
    const country = this.countryService.getCurrentCountry();
    const wishlistKey = `wishlist_${country}`;
    localStorage.removeItem(wishlistKey);

    // If user is logged in, sync with server
    if (this.authService.isAuthenticated()) {
      this.http
        .post(`${environment.API_URL}/wishlist/clear`, {})
        .pipe(
          catchError((error) => {
            this.notificationService.error(
              'Failed to sync wishlist with server'
            );
            return of(null);
          })
        )
        .subscribe(() => {
          this.notificationService.success('Wishlist cleared');
        });
    } else {
      this.notificationService.success('Wishlist cleared');
    }
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistItemsSubject.value.some(
      (item) => item._id === productId
    );
  }

  getWishlistItemCount(): number {
    return this.wishlistItemsSubject.value.length;
  }

  moveAllToCart(): Observable<boolean> {
    const items = this.wishlistItemsSubject.value;

    if (items.length === 0) {
      return of(false);
    }

    // If logged in, use API
    if (this.authService.isAuthenticated()) {
      return this.http
        .post<{ success: boolean }>(
          `${environment.API_URL}/wishlist/move-to-cart`,
          {}
        )
        .pipe(
          map((response) => response.success),
          tap((success) => {
            if (success) {
              this.clearWishlist();
              this.notificationService.success('All items moved to cart');
            }
          }),
          catchError((error) => {
            this.notificationService.error('Failed to move items to cart');
            return of(false);
          })
        );
    } else {
      // Implement local version (would need CartService injected)
      // this.items.forEach(item => this.cartService.addToCart(item));
      // this.clearWishlist();
      this.notificationService.info('Please log in to move items to cart');
      return of(false);
    }
  }
}
