import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Select2Module } from 'ng-select2-component';
import { SvgIconComponent } from '../../../header/svg-icon/svg-icon.component';
import {
  stockAvailability,
  stockLevel,
} from 'src/app/features/admin/data/product';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    Select2Module,
    SvgIconComponent,
    NgbNavModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
})
export class InventoryComponent {
  @Input() active: number;
  @Input() additionalActiveId: number;
  @Output() changeTab = new EventEmitter<any>();
  @Output() changeTabDetails = new EventEmitter<number>();
  public stockForm: any;

  constructor(public fb: FormBuilder) {
    this.stockForm = this.fb.array([
      this.fb.group({
        countryCode: ['GH'],
        totalQty: [0],
        inStock: [''],
      }),
      this.fb.group({
        countryCode: ['UK'],
        totalQty: [0],
        inStock: [''],
      }),
    ]);
  }

  next() {
    // this.additionalActiveId = this.additionalActiveId + 1;
    // this.changeTabDetails.emit(this.additionalActiveId);
    this.changeTab.emit({
      activeTab: this.active,
      formProps: {
        totalQty: this.stockForm.value.totalQty,
      },
    });
  }

  previous() {
    this.active = this.active - 1;
    this.changeTab.emit(this.active);
  }
}
