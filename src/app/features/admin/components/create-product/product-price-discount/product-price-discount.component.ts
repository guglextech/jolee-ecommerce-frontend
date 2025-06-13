import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SvgIconComponent } from '../../header/svg-icon/svg-icon.component';
import { bogoProducts, priceDiscount } from '../../../data/product';

@Component({
  selector: 'app-product-price-discount',
  standalone: true,
  imports: [NgbNavModule, SvgIconComponent],
  templateUrl: './product-price-discount.component.html',
  styleUrl: './product-price-discount.component.scss',
})
export class ProductPriceDiscountComponent {
  @Input() active: number;
  @Output() changeTab = new EventEmitter<number>();

  public bogoProducts = bogoProducts;
  public priceDiscount = priceDiscount;

  next() {
    this.active = this.active + 1;
    this.changeTab.emit(this.active);
  }

  previous() {
    this.active = this.active - 1;
    this.changeTab.emit(this.active);
  }
}
