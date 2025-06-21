import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SvgIconComponent } from '../../header/svg-icon/svg-icon.component';
import { bogoProducts, priceDiscount } from '../../../data/product';
import { ProductService } from '../product.service';
import { productPrice } from 'src/app/core/models/product.model';
import {
  FormArray,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-product-price-discount',
  standalone: true,
  imports: [NgbNavModule, SvgIconComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './product-price-discount.component.html',
  styleUrl: './product-price-discount.component.scss',
})
export class ProductPriceDiscountComponent {
  @Input() active: number;
  @Output() changeTab = new EventEmitter<number>();
  public discountedPrice: number = 0;
  public discountPercentage: number = 0;
  public priceForm: any;

  public bogoProducts = bogoProducts;
  public priceDiscount = priceDiscount;
  constructor(private productService: ProductService, public fb: FormBuilder) {
    this.priceForm = this.fb.array([
      this.fb.group({
        countryCode: ['GH'],
        amount: [0],
        currency: ['GHC'],
      }),
      this.fb.group({
        countryCode: ['UK'],
        amount: [0],
        currency: ['$'],
      }),
    ]);

    this.priceForm.controls.forEach((control: any) => {
      control.valueChanges.subscribe((value: productPrice) => {
        if (this.discountPercentage > 0) {
          this.getDiscount(value.countryCode);
        }
        if (this.discountedPrice > 0) {
          this.getDiscountedPrice(value.countryCode);
        }
      });
    });
  }
  get prices() {
    return this.priceForm.value;
  }

  public getDiscount(countryCode: string) {
    const selectedCountryprice = this.prices.find(
      (price: productPrice) => price.countryCode === countryCode
    );
    console.log('selectedCountryprice', selectedCountryprice);
    if (this.discountedPrice && selectedCountryprice.amount) {
      this.discountPercentage =
        ((selectedCountryprice?.amount - this.discountedPrice) /
          selectedCountryprice.amount) *
        100;
      return;
    }
    this.discountPercentage = 0;
  }

  public getDiscountedPrice(countryCode: string) {
    const selectedCountryprice =
      this.prices.find(
        (price: productPrice) => price.countryCode === countryCode
      ) || 0;
    if (this.discountPercentage) {
      this.discountedPrice =
        selectedCountryprice.amount -
        (selectedCountryprice.amount * this.discountPercentage) / 100;
    } else {
      this.discountedPrice = selectedCountryprice.amount;
    }
  }

  next() {
    this.active = this.active + 1;
    this.changeTab.emit(this.active);
  }

  previous() {
    this.active = this.active - 1;
    this.changeTab.emit(this.active);
  }
}
