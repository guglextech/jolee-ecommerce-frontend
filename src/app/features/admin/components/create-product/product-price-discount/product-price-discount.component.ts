import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SvgIconComponent } from '../../header/svg-icon/svg-icon.component';
import { bogoProducts, discount, priceDiscount } from '../../../data/product';
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
export class ProductPriceDiscountComponent implements OnInit {
  @Input() active: number;
  @Output() changeTab = new EventEmitter<any>();
  public ghSellingPrice: number = 0;
  public ukSellingPrice: number = 0;
  public priceForm: FormArray;

  public bogoProducts = bogoProducts;
  public priceDiscount = priceDiscount;
  constructor(public fb: FormBuilder, private productService: ProductService) {
    this.priceForm = this.fb.array([
      this.fb.group({
        countryCode: ['GH'],
        amount: [0],
        discount: [0],
        currency: ['GHC'],
      }),
      this.fb.group({
        countryCode: ['US'],
        amount: [0],
        discount: [0],
        currency: ['$'],
      }),
    ]);

    this.priceForm.controls.forEach((control: any) => {
      control.valueChanges.subscribe((value: productPrice) => {
        if ((value.discount ?? 0) > 0 && value.amount > 0) {
          // console.log('Discount Value:', value.discount);
          // console.log('Amount Value:', value.amount);
          if (value.countryCode === 'US') {
            this.ukSellingPrice =
              value?.amount - ((value?.discount ?? 0) / 100) * value.amount;
          }
          if (value.countryCode === 'GH') {
            this.ghSellingPrice =
              value?.amount - ((value?.discount ?? 0) / 100) * value.amount;
          }
        } else {
          if (value.countryCode === 'US') {
            this.ukSellingPrice = value.amount;
          }
          if (value.countryCode === 'GH') {
            this.ghSellingPrice = value.amount;
          }
        }
      });
    });
  }

  ngOnInit(): void {
    const form = this.productService.getProductForm();
    if (form) {
      const prices = form.get('prices')?.value;
      if (Array.isArray(prices)) {
        this.priceForm.patchValue(prices);
      }
      // console.log('Form Value:', this.priceForm.value);
      return;
    }
  }
  get prices() {
    return this.priceForm.value;
  }

  next() {
    this.active = this.active + 1;
    // console.log('prices', this.prices);
    this.changeTab.emit({
      activeTab: this.active,
      formProps: {
        prices: this.prices,
      },
    });
  }

  previous() {
    this.active = this.active - 1;
    this.changeTab.emit({
      activeTab: this.active,
      formProps: {
        price: this.prices,
      },
    });
  }
}
