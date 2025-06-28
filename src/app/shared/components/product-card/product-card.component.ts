import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { CartService } from 'src/app/core/services/cart.service';
import { CountryService } from 'src/app/core/services/country.service';
import { Product } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() layout: 'grid' | 'list' = 'grid';
  @Output() addToCartClicked = new EventEmitter<Product>();
  @Output() quickViewClicked = new EventEmitter<Product>();

  currentPrice: number = 0;
  formattedPrice: string = '';
  discountPercentage: number = 0;
  isAddingToCart = false;
  isFavorite = false;
  countryPrice: number = 0;

  constructor(
    public countryService: CountryService,
    public cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.updateProductPrices();
    this.checkIfInWishlist();

    this.countryService.country$.subscribe((data) => {
      this.updateProductPrices();
      if (data === 'GH') {
        this.countryPrice = 0;
      }
      if (data === 'US') {
        this.countryPrice = 1;
      }
    });

    this.wishlistService.wishlist$.subscribe(() => {
      this.checkIfInWishlist();
    });
  }

  private updateProductPrices(): void {
    const country = this.countryService.getCurrentCountry();
    const priceInfo = this.product?.prices.find(
      (p) => p.countryCode === country
    );

    if (priceInfo) {
      this.currentPrice = priceInfo.amount;
      this.formattedPrice = this.countryService.formatPrice(priceInfo.amount);

      // Check if there's a sale
      // if (this.product.attributes?.originalPrice) {
      //   const originalPrice = this.product.attributes.originalPrice;
      //   if (originalPrice > this.currentPrice) {
      //     this.discountPercentage = Math.round(((originalPrice - this.currentPrice) / originalPrice) * 100);
      //   }
      // }
    }
  }

  getDiscountedPrice(): string {
    const originalPrice = this.product.prices[this.countryPrice].amount;
    const discount = this.product.prices[this.countryPrice].discount || 0;
    const discountedPrice = originalPrice - (originalPrice * discount) / 100;
    return this.countryService.formatPrice(discountedPrice);
  }

  private checkIfInWishlist(): void {
    this.isFavorite = this.wishlistService.isInWishlist(this.product?._id);
  }

  toggleCartAddRemove(): void {
    const isInCart = this.cartService.isInCart(this.product._id);
    if (isInCart) {
      this.cartService.removeFromCart(this.product._id);
    } else {
      // this.addToCart();
      this.cartService.addToCart(this.product, 1);
    }
    // setTimeout(() => {
    //   this.isAddingToCart = false;
    // }, 800);
  }

  openQuickView(): void {
    this.quickViewClicked.emit(this.product);
  }

  toggleWishlist(): void {
    if (this.isFavorite) {
      this.wishlistService.removeFromWishlist(this.product._id);
    } else {
      this.wishlistService.addToWishlist(this.product);
    }
    this.isFavorite = !this.isFavorite;
  }

  getStockLabel(): string {
    if (this.product.quantity.GH.totalQty === 0) {
      return 'Out of Stock';
    }
    if (this.product.quantity.GH.totalQty < 5) {
      return 'Low Stock';
    }
    return 'In Stock';
  }

  getStockClass(): string {
    if (
      this.product.quantity.GH.totalQty >= this.product.quantity.GH.totalSold
    ) {
      return 'badge bg-danger';
    }
    if (
      this.product.quantity.GH.totalQty - this.product.quantity.GH.totalSold <
      5
    ) {
      return 'badge bg-warning text-dark';
    }
    return 'badge bg-success';
  }
}
