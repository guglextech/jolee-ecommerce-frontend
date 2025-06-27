import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, tap, map, catchError } from 'rxjs/operators';
import { Product } from 'src/app/core/models/product.model';
import { MockProductService } from 'src/app/core/services/mockproduct.service';
import { CartService } from 'src/app/core/services/cart.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ApiService } from 'src/app/features/admin/services/api.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  standalone: true,
})
export class ProductDetailsComponent implements OnInit {
  product$: Observable<Product | undefined>;
  relatedProducts$: Observable<Product[]>;
  quantity = 1;
  selectedImageIndex = 0;
  selectedCountry = 'GH';
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: MockProductService,
    private api: ApiService,
    private cartService: CartService
  ) {
    console.log('ProductDetailsComponent constructor called');
  }

  ngOnInit(): void {
    console.log('ProductDetailsComponent initialized');

    // Get product details based on URL parameter
    this.product$ = this.route.paramMap.pipe(
      tap((params) => {
        const productId = params.get('id');
        console.log({ productId });
      }),
      switchMap((params) => {
        const productId = params.get('id');
        if (!productId) {
          return of(undefined);
        }

        return this.api.get<Product | undefined>(`products/${productId}`).pipe(
          tap((product) => console.log('Product fetched:', product)),
          map((product: any) => product.product),
          catchError((error) => {
            return of(undefined);
          })
        );
      }),
      tap((product: any) => {
        this.loading = false;
        if (product) {
          // this.getRelatedProducts(product.product);
        } else {
          console.warn('No product found');
        }
      })
    );
  }

  getRelatedProducts(product: Product): void {
    this.relatedProducts$ = this.productService
      .getProductsByCategory(product.category)
      .pipe(
        map((products) => {
          const related = products
            .filter((p) => p._id !== product._id)
            .slice(0, 4);
          return related;
        })
      );
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(product: Product): void {
    console.log('Added to cart:', product.name, 'Quantity:', this.quantity);
  }

  setSelectedImage(index: number): void {
    this.selectedImageIndex = index;
  }

  getProductPrice(product: Product): number {
    const priceObj = product.prices?.find(
      (p) => p.countryCode === this.selectedCountry
    );
    return priceObj ? priceObj.amount : 0;
  }

  getPrimarImage(product: Product): string {
    if (!product.images || product.images.length === 0) {
      return 'assets/images/placeholder.jpg';
    }
    const primaryImage = product.images[0];
    return primaryImage;
  }

  getProductImages(product: Product): string[] {
    if (!product.images || product.images.length === 0) {
      return ['assets/images/placeholder.jpg'];
    }
    return product.images;
  }

  getOriginalPrice(product: Product): number | undefined {
    // Uncomment the following lines if you have original price logic
    // if (product.attributes?.originalPrice) {
    //   return product.attributes.originalPrice;
    // }
    return undefined;
  }

  isOnSale(product: Product): boolean {
    return true; // Placeholder for sale logic
    // Uncomment the following lines if you have sale logic
    // (
    //   product.attributes?.badges?.includes('Sale') ||
    //   !!product.attributes?.originalPrice
    // );
  }

  isNew(product: Product): boolean {
    return product.attributes?.badges?.find(
      (item) => item.display.toLowerCase() === 'new'
    )
      ? true
      : false ||
        !!product.attributes?.badges.find(
          (item) => item.display.toLowerCase() === 'isnew'
        )
      ? true
      : false || false;
  }
}
