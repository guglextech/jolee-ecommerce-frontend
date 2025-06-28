import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/features/admin/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private api: ApiService) {}

  getProducts() {
    return this.api.get('products');
  }
}
