// src/app/core/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, from } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Skip interceptor for specific endpoints (like login, register)
    if (request.url.includes('/auth/login') || request.url.includes('/auth/register')) {
      return next.handle(request);
    }
    
    const token = this.authService.getToken();
    
    if (token) {
      request = this.addToken(request, token);
    }
    
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(request, next);
        }
        
        return throwError(error);
      })
    );
  }
  
  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next('');
      
      return from(this.authService.refreshToken()).pipe(
        switchMap(token => {
          this.isRefreshing = false;
          
          if (token) {
            this.refreshTokenSubject.next(token);
            return next.handle(this.addToken(request, token));
          }
          
          // Token refresh failed, logout and redirect
          this.authService.logout();
          return throwError('Token refresh failed');
        })
      );
    }
    
    // Wait for token to be refreshed
    return this.refreshTokenSubject.pipe(
      filter(token => token !== ''),
      take(1),
      switchMap(token => next.handle(this.addToken(request, token)))
    );
  }
}