import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import {
  IProductCategoriesRes,
  IProductCategory,
  IProductCategoryRes,
} from '../../../../core/models/category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productForm: any;
  constructor(private fb: FormBuilder, private api: ApiService) {
    this.productForm = this.fb.group({
      inStock: [''],
      name: [''],
      description: [''],
      price: [[]],
      discount: [0],
      images: [[]],
      reviews: [[]],
      category: [''],
      subcategory: [''],
      totalQty: [0],
      metadata: [[]],
    });
  }

  get prices(): FormArray {
    return this.productForm.get('prices') as FormArray;
  }

  get images(): FormArray {
    return this.productForm.get('image') as FormArray;
  }

  createProductCategory(category: IProductCategory) {
    return this.api.post('categories', category);
  }

  deleteProductCategory(categoryId: string) {
    return this.api.delete(`categories/${categoryId}`);
  }

  getProductCategories() {
    return this.api.get<IProductCategoriesRes>('categories');
  }

  getProductCategoryById(categoryId: string) {
    return this.api.get<IProductCategoryRes>(`categories/${categoryId}`);
  }

  updateProductCategory(categoryId: string, category: IProductCategory) {
    return this.api.put(`categories/${categoryId}`, category);
  }
}
