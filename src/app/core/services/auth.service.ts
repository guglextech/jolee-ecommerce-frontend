import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private tokenExpirationTimer: any;
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadStoredAuth();
  }
  
  private loadStoredAuth(): void {
    const userData = localStorage.getItem('userData');
    const token = localStorage.getItem('token');
    if (userData && token) {
      const user = JSON.parse(userData);
      this.currentUserSubject.next(user);
      this.autoLogout(this.getTokenExpirationDate(token).getTime() - new Date().getTime());
    }
  }
  
  login(email: string, password: string): Observable<User> {
    return this.http.post<AuthResponse>(`${environment.API_URL}/auth/login`, {
      email,
      password
    }).pipe(
      tap(response => {
        this.handleAuthentication(response);
      }),
      map(response => response.user)
    );
  }
  
  register(userData: { 
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string 
  }): Observable<User> {
    return this.http.post<AuthResponse>(`${environment.API_URL}/auth/register`, userData)
      .pipe(
        tap(response => {
          this.handleAuthentication(response);
        }),
        map(response => response.user)
      );
  }
  
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('tokenExpiration');
    
    this.currentUserSubject.next(null);
    
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    
    this.router.navigate(['/']);
  }
  
  refreshToken(): Observable<string> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return of('');
    }
    
    return this.http.post<{access_token: string}>(`${environment.API_URL}/auth/refresh`, {
      refresh_token: refreshToken
    }).pipe(
      tap(response => {
        localStorage.setItem('token', response.access_token);
        const expirationDate = this.getTokenExpirationDate(response.access_token);
        localStorage.setItem('tokenExpiration', expirationDate.toISOString());
        this.autoLogout(expirationDate.getTime() - new Date().getTime());
      }),
      map(response => response.access_token),
      catchError(error => {
        this.logout();
        return of('');
      })
    );
  }
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
  
  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return !!user && user.role === 'admin';
  }
  
  private handleAuthentication(authResponse: AuthResponse): void {
    localStorage.setItem('token', authResponse.access_token);
    localStorage.setItem('refreshToken', authResponse.refresh_token);
    localStorage.setItem('userData', JSON.stringify(authResponse.user));
    
    const expirationDate = this.getTokenExpirationDate(authResponse.access_token);
    localStorage.setItem('tokenExpiration', expirationDate.toISOString());
    
    this.currentUserSubject.next(authResponse.user);
    this.autoLogout(expirationDate.getTime() - new Date().getTime());
  }
  
  private autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
  
  private getTokenExpirationDate(token: string): Date {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return new Date(new Date().getTime() + 3600 * 1000); // Default 1 hour
    }
    
    try {
      const tokenPayload = JSON.parse(atob(tokenParts[1]));
      if (tokenPayload.exp) {
        return new Date(tokenPayload.exp * 1000);
      }
      return new Date(new Date().getTime() + 3600 * 1000);
    } catch {
      return new Date(new Date().getTime() + 3600 * 1000);
    }
  }
}