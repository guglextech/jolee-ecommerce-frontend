import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { CartService } from 'src/app/core/services/cart.service';
import { CountryService } from 'src/app/core/services/country.service';
import { MockProductService } from 'src/app/core/services/mockproduct.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { ProductCardComponent } from 'src/app/shared/components/product-card/product-card.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    HeaderComponent,
    ProductCardComponent,
    LoadingSpinnerComponent,
    PaginationComponent,
    FooterComponent,
    NgFor,
    NgIf,
    NgClass
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent {
  products: Product[] = [];
  isLoading = true;
  selectedLayout: 'grid' | 'list' = 'grid';
  selectedColumns = 3;
  
  currentCountry = 'US';
  
  constructor(
    private mockProductService: MockProductService,
    private countryService: CountryService,
    private cartService: CartService,
    private notificationService: NotificationService,
    private wishlistService: WishlistService
  ) {}
  
  ngOnInit(): void {
    this.loadProducts();
    
    // Subscribe to country changes
    this.countryService.country$.subscribe(country => {
      this.currentCountry = country;
      // No need to reload products since the ProductCard component handles price display by country
    });
  }
  
  loadProducts(): void {
    this.isLoading = true;
    this.mockProductService.getProducts().subscribe(
      products => {
        this.products = products;
        this.isLoading = false;
      },
      error => {
        console.error('Error loading products', error);
        this.notificationService.error('Failed to load products');
        this.isLoading = false;
      }
    );
  }
  
  changeLayout(layout: 'grid' | 'list'): void {
    this.selectedLayout = layout;
  }
  
  changeColumns(columns: number): void {
    this.selectedColumns = columns;
  }
  
  handleAddToCart(product: Product): void {
    // The product card component already adds to cart, but we can show a notification
    this.notificationService.success(`${product.name} added to cart`);
  }
  
  handleQuickView(product: Product): void {
    // In a real app, this would open a modal with product details
    this.notificationService.info(`Quick view for ${product.name}`);
  }
  
  toggleWishlist(productId: string): void {
    if (this.wishlistService.isInWishlist(productId)) {
      this.wishlistService.removeFromWishlist(productId);
    } else {
      const product = this.products.find(p => p.id === productId);
      if (product) {
        this.wishlistService.addToWishlist(product);
      }
    }
  }
  
  refreshData(): void {
    this.loadProducts();
  }
}
