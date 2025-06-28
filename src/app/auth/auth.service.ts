import { Injectable } from '@angular/core';
import { ApiService } from '../features/admin/services/api.service';
import { ILogin, ILoginRes } from '../core/models/auth';
import { LocalStorageService } from '../core/services/localStorage.service';
import { BehaviorSubject, tap } from 'rxjs';
import { UserProfile } from '../core/models/user';
import { Router } from '@angular/router';
import { CartService } from '../core/services/cart.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean | null>(null);
  private properties: { [key: string]: any } = {};
  private currentUserSubject = new BehaviorSubject<UserProfile | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private localStorage: LocalStorageService,
    private router: Router,
    private cartService: CartService
  ) {}

  login(payload: ILogin) {
    return this.apiService.post<ILoginRes>('users/login', payload).pipe(
      tap((response: ILoginRes) => {
        if (response && response.token) {
        }
        this.isAuthenticated.next(true);
      })
    );
  }

  logout(): void {
    this.isAuthenticated.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('tokenExpiration');
    this.cartService.clearCart();

    this.currentUserSubject.next(null);

    this.router.navigate(['/']);
  }

  getProperty(key: string): any {
    return this.properties[key] || null;
  }

  setProperty(key: string, value: any): void {
    this.properties[key] = value;
  }

  getAuthStatus(): boolean {
    const state = this.localStorage.getItem('token')?.length > 0;
    this.isAuthenticated.next(state);
    this.currentUserSubject.next(this.localStorage.getItem('user') || null);
    return !!this.isAuthenticated.value;
  }
}
