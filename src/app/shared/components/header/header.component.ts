import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CountrySelectorComponent } from '../country-selector/country-selector.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { FormsModule } from '@angular/forms';
import { HeaderNoticeComponent } from 'src/app/features/admin/components/header/header-notice/header-notice.component';

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
  cartItemCount = 0;
  isAuthenticated = false;
  isAdmin = false;
  menuOpen = false;
  searchQuery = '';
  userName = '';

  categories = [
    { name: 'Bakery', route: '/products/category/bakery', icon: 'bi-cake2' },
    { name: 'Grocery', route: '/products/category/grocery', icon: 'bi-basket' },
    {
      name: 'Fresh Produce',
      route: '/products/category/produce',
      icon: 'bi-apple',
    },
    { name: 'Dairy', route: '/products/category/dairy', icon: 'bi-cup-hot' },
  ];

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cartSummary$.subscribe((summary) => {
      this.cartItemCount = summary.itemCount;
    });

    this.authService.currentUser$.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.isAdmin = user?.role === 'admin';
      this.userName = user ? `${user.firstName} ${user.lastName}` : '';
    });
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
