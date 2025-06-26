import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
// import { Select2Module } from 'ng-select2-component';
import { TagInputModule } from 'ngx-chips';
import { SvgIconComponent } from '../../../header/svg-icon/svg-icon.component';
import {
  colorOptionName,
  colorOptionValue,
} from 'src/app/features/admin/data/product';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allergens',
  standalone: true,
  imports: [
    TagInputModule,
    FormsModule,
    // Select2Module,
    SvgIconComponent,
    CommonModule,
  ],
  templateUrl: './variations.component.html',
  styleUrl: './variations.component.scss',
})
export class AllergensComponent implements OnInit {
  @Input() additionalActiveId: number;
  @Input() active: number;
  @Output() changeTabDetails = new EventEmitter<number>();
  @Output() changeTab = new EventEmitter<any>();

  public badges = [];
  public allergens = [];
  public weight = 0;
  public unit = 'g';
  public ingredients = '';
  public organic = false;
  public organicOptions = [
    { name: 'Yes', value: true },
    { name: 'No', value: false },
  ];
  public colorOptionValue = colorOptionValue;
  // public additionalInfoForm:any

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    const form = this.productService.getProductForm();
    if (form) {
      this.badges = form.get('attributes')?.value.badges || [];
      this.allergens = form.get('attributes')?.value.allergens || [];
      this.weight = form.get('attributes')?.value.weight || 0;
      this.unit = form.get('attributes')?.value.weightUnit || '';
      this.ingredients = form.get('attributes')?.value.ingredients || '';
      this.organic = form.get('attributes')?.value.organic || false;
    }
  }

  next() {
    this.changeTab.emit({
      activeTab: this.active,
      formProps: {
        attributes: {
          badges: this.badges,
          allergens: this.allergens,
          weight: this.weight,
          weightUnit: this.unit,
          ingredients: this.ingredients,
          organic: this.organic,
        },
      },
    });
    this.productService.createProduct().subscribe({
      next: (res) => {
        console.log('Product created successfully:', res);
        this.productService.clearProductForm();
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error creating product:', err);
      },
    });
  }

  previous() {
    this.additionalActiveId = this.additionalActiveId - 1;
    this.changeTabDetails.emit(this.additionalActiveId);
  }
}
