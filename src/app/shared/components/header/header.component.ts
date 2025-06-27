import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CountrySelectorComponent } from '../country-selector/country-selector.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { FormsModule } from '@angular/forms';
import { HeaderNoticeComponent } from 'src/app/features/admin/components/header/header-notice/header-notice.component';
import { ProductService } from 'src/app/features/admin/components/create-product/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HeaderNoticeComponent,
    RouterModule,
    FormsModule,
    CountrySelectorComponent,
  ],
})
export class HeaderComponent implements OnInit {
  @Output() categorySelected = new EventEmitter<any>();
  cartItemCount = 0;
  isAuthenticated = false;
  isAdmin = false;
  menuOpen = false;
  searchQuery = '';
  userName = '';

  categories: any = [];

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cartSummary$.subscribe((summary) => {
      this.cartItemCount = summary.itemCount;
    });
    // this.productService.getProductCategories().subscribe((categories) => {
    //   console.log({ categories });
    //   this.categories = categories?.categories?.map((category) => ({
    //     // route: `/products/category/${category}`,
    //     icon: 'bi-box-seam',
    //     ...category,
    //   }));
    // });
    this.authService.currentUser$.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.isAdmin = user?.role === 'admin';
      this.userName = user ? `${user.firstName} ${user.lastName}` : '';
    });
  }

  handleCategoryClick(category: any): void {
    this.categorySelected.emit(category);
    this.menuOpen = false;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.closeMenu();
  }

  search(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/products'], {
        queryParams: { search: this.searchQuery.trim() },
      });
      this.searchQuery = '';
    }
  }
}
