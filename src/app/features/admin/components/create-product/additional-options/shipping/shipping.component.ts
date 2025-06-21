import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Select2Module } from 'ng-select2-component';
import { SvgIconComponent } from '../../../header/svg-icon/svg-icon.component';
import { shippingClass } from 'src/app/features/admin/data/product';

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [Select2Module, SvgIconComponent],
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.scss',
})
export class ShippingComponent {
  @Input() additionalActiveId: number;
  @Output() changeTabDetails = new EventEmitter<number>();

  public shippingClass = shippingClass;

  next() {
    this.additionalActiveId = this.additionalActiveId + 1;
    this.changeTabDetails.emit(this.additionalActiveId);
  }

  previous() {
    this.additionalActiveId = this.additionalActiveId - 1;
    this.changeTabDetails.emit(this.additionalActiveId);
  }
}
