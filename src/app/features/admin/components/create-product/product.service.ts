import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productForm: any;
  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      sku: [''],
      name: [''],
      description: [''],
      price: this.fb.group({
        countryCode: [''],
        amount: [''],
        currency: [''],
      }),
      category: [''],
      subcategory: [''],
      image: this.fb.group({
        url: [''],
        alt: [''],
        isPrimary: [''],
      }),
      stock: [''],
    });
  }
}
