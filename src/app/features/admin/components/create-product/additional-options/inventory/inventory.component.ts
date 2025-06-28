import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { Select2Module } from 'ng-select2-component';
import { SvgIconComponent } from '../../../header/svg-icon/svg-icon.component';
import {
  FormArray,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    // Select2Module,
    SvgIconComponent,
    NgbNavModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
})
export class InventoryComponent implements OnInit {
  @Input() active: number;
  @Input() additionalActiveId: number;
  @Output() changeTab = new EventEmitter<any>();
  @Output() changeTabDetails = new EventEmitter<number>();
  public stockForm: FormArray;

  constructor(public fb: FormBuilder, private productService: ProductService) {
    this.stockForm = this.fb.array([
      this.fb.group({
        totalQty: [0, Validators.required],
        totalSold: [0, Validators.required],
      }),
      this.fb.group({
        totalQty: [0, Validators.required],
        totalSold: [0, Validators.required],
      }),
    ]);
  }

  ngOnInit(): void {
    const form = this.productService.getProductForm();
    if (form) {
      this.stockForm.patchValue([
        {
          totalQty: form.get('quantity')?.value?.GH?.totalQty,
          totalSold: form.get('quantity')?.value?.GH?.totalSold,
        },
        {
          totalQty: form.get('quantity')?.value?.US?.totalQty,
          totalSold: form.get('quantity')?.value?.US?.totalSold,
        },
      ]);
    }
  }

  previous() {
    this.active = this.active - 1;
    this.changeTab.emit({
      activeTab: this.active,
      formProps: {
        quantity: {
          GH: this.stockForm.value[0],
          US: this.stockForm.value[1],
        },
      },
    });
  }

  next() {
    this.additionalActiveId = this.additionalActiveId + 1;
    this.changeTabDetails.emit(this.additionalActiveId);
    this.changeTab.emit({
      activeTab: this.active,
      formProps: {
        quantity: {
          GH: this.stockForm.value[0],
          US: this.stockForm.value[1],
        },
      },
    });
  }
}
