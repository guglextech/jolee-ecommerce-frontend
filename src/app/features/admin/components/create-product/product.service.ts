import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import {
  IProductCategoriesRes,
  IProductCategory,
  IProductCategoryRes,
} from '../../../../core/models/category';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { IProductBrand } from 'src/app/core/models/brand';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productForm: any;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private ls: LocalStorageService
  ) {
    this.productForm = this.fb.group({
      inStock: [''],
      isActive: [true],
      name: [''],
      description: [''],
      prices: [[]],
      images: [[]],
      reviews: [[]],
      brand: [''],
      category: [''],
      categoryId: [''],
      subcategory: [''],
      quantity: [{}],
      metadata: [[]],
      attributes: [{}],
      averageRating: [0],
    });
  }

  get prices(): FormArray {
    return this.productForm.get('prices') as FormArray;
  }

  get images(): FormArray {
    return this.productForm.get('image') as FormArray;
  }

  updateProductForm(data: any) {
    this.productForm.patchValue(data);
    this.persistProduct();
  }

  getProductForm(): FormGroup {
    return this.productForm;
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

  getBrands() {
    return this.api.get<IProductBrand>('brands');
  }

  createBrand(brand: { name: string; description?: string }) {
    return this.api.post('brands', brand);
  }

  createProduct() {
    return this.api.post('products', this.productForm.value);
  }

  persistProduct() {
    this.ls.setItem('product', this.productForm.value);
  }

  clearProductForm() {
    this.productForm.reset();
    this.ls.removeItem('product');
  }

  restoreProductForm() {
    const product = this.ls.getItem('product');
    if (product) {
      this.productForm.patchValue(product);
    }
  }
}
