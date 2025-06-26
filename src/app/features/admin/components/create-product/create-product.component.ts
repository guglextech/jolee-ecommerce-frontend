import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

import { AddProductDetailsComponent } from './add-product-details/add-product-details.component';
import { AdditionalOptionsComponent } from './additional-options/additional-options.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProductGalleryComponent } from './product-gallery/product-gallery.component';
import { ProductPriceDiscountComponent } from './product-price-discount/product-price-discount.component';
import { ProductService } from './product.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SvgIconComponent } from '../header/svg-icon/svg-icon.component';
import { addProduct } from '../../data/product';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    NgbNavModule,
    CommonModule,
    OwlNativeDateTimeModule,
    ReactiveFormsModule,
    SvgIconComponent,
    AddProductDetailsComponent,
    ProductGalleryComponent,
    ProductCategoriesComponent,
    ProductPriceDiscountComponent,
    AdditionalOptionsComponent,
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent implements OnInit {
  public active = 1;
  public addProduct = addProduct;

  constructor(
    public productService: ProductService,
    private ls: LocalStorageService
  ) {}
  changeTab(data: any) {
    this.active = data.activeTab;
    this.productService.updateProductForm(data.formProps);
    // this.productService.productForm.patchValue(data.formProps);
    // this.productService.persistProduct();
    console.log({ formValue: this.productService.getProductForm().value });
  }

  ngOnInit(): void {
    if (this.ls.getItem('product')) this.productService.restoreProductForm();
  }
}
