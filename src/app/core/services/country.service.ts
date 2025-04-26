import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export type CountryCode = 'GH' | 'US';

export interface CountryConfig {
  currency: string;
  currencySymbol: string;
  taxRate: number;
  paymentMethods: string[];
  shippingOptions: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  defaultLanguage: string;
}

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private countrySubject = new BehaviorSubject<CountryCode>('US');
  public country$ = this.countrySubject.asObservable();


  
  private countryConfig: Record<CountryCode, CountryConfig> = {
    GH: {
      currency: 'GHS',
      currencySymbol: '₵',
      taxRate: 0.15,
      paymentMethods: ['mobile_money_mtn', 'mobile_money_vodafone', 'card'],
      shippingOptions: [
        { id: 'standard', name: 'Standard Delivery', price: 15.0 },
        { id: 'express', name: 'Express Delivery', price: 30.0 },
      ],
      defaultLanguage: 'en-GH',
    },
    US: {
      currency: 'USD',
      currencySymbol: '$',
      taxRate: 0.065, // Varies by state, using average
      paymentMethods: ['credit_card', 'paypal', 'apple_pay'],
      shippingOptions: [
        { id: 'standard', name: 'Standard Shipping', price: 5.99 },
        { id: 'express', name: 'Express Shipping', price: 12.99 },
      ],
      defaultLanguage: 'en-US',
    },
  };

  constructor(private http: HttpClient) {
    this.initCountry();
  }

  private initCountry(): void {
    const savedCountry = localStorage.getItem('country') as CountryCode;
    if (savedCountry && (savedCountry === 'GH' || savedCountry === 'US')) {
      this.setCountry(savedCountry);
    } else {
      // this.detectCountry().subscribe();
    }
  }

  // detectCountry(): Observable<CountryCode> {
  //   return this.http.get<{countryCode: string}>(`${environment.API_URL}/geo/detect`)
  //     .pipe(
  //       tap(response => {
  //         const country = response.countryCode === 'GH' ? 'GH' : 'US';
  //         this.setCountry(country);
  //       })
  //     );
  // }

  setCountry(country: CountryCode): void {
    this.countrySubject.next(country);
    localStorage.setItem('country', country);
  }

  getCurrentCountry(): CountryCode {
    return this.countrySubject.value;
  }

  getCountryConfig(): CountryConfig {
    return this.countryConfig[this.getCurrentCountry()];
  }

  formatPrice(price: number): string {
    const config = this.getCountryConfig();
    return `${config.currencySymbol}${price.toFixed(2)}`;
  }

  calculateTax(amount: number): number {
    const config = this.getCountryConfig();
    return amount * config.taxRate;
  }
}
