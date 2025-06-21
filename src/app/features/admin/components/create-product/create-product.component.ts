import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class CreateProductComponent {
  public active = 1;
  public addProduct = addProduct;

  constructor(public productService: ProductService) {}
  changeTab(data: any) {
    this.active = data.activeTab;
    this.productService.productForm.patchValue(data.formProps);
    console.log({ formValue: this.productService.productForm.value });
  }
}
