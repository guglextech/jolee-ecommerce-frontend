import { Injectable } from '@angular/core';
import { ApiService } from '../features/admin/services/api.service';
import { ILogin, ILoginRes } from '../core/models/auth';
import { LocalStorageService } from '../core/services/localStorage.service';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean | null>(null);
  private properties: { [key: string]: any } = {};

  constructor(
    private apiService: ApiService,
    private localStorage: LocalStorageService
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
    return !!this.isAuthenticated.value;
  }
}
