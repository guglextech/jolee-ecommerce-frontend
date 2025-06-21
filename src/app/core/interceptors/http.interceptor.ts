import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/localStorage.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Intercepting request:', req.url);
  const localStorage = inject(LocalStorageService);

  const token = localStorage.getItem('token');
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(clonedRequest);
  }
  return next(req);
};
