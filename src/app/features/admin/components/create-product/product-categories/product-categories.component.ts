import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SvgIconComponent } from '../../header/svg-icon/svg-icon.component';
import { TagInputModule } from 'ngx-chips';
import { productCategory } from '../../../data/pos';
import { CreateCategoryModalComponent } from './create-category-modal/create-category-modal.component';
import { Select2Module } from 'ng-select2-component';
import { ProductService } from '../product.service';
import { Product } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-product-categories',
  standalone: true,
  imports: [
    TagInputModule,
    CommonModule,
    FormsModule,
    Select2Module,
    SvgIconComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './product-categories.component.html',
  styleUrl: './product-categories.component.scss',
})
export class ProductCategoriesComponent implements OnInit {
  @Input() active: number;
  @Output() changeTab = new EventEmitter<any>();

  public productCategory: Product[] = [];
  public items = ['watches', 'sports', 'clothes', 'bottles'];
  public loadingCategories = false;

  public createCategoryForm: any;

  constructor(
    private modal: NgbModal,
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.createCategoryForm = this.fb.group({
      category: ['', Validators.required],
      subCategory: [''],
    });
  }

  ngOnInit(): void {
    this.loadingCategories = true;
    this.productService.getProductCategories().subscribe((categories) => {
      this.productCategory = categories.categories;
      this.loadingCategories = false;
    });
  }

  createCategoryModal() {
    this.modal.open(CreateCategoryModalComponent, { size: 'lg' });
  }

  createCategory() {
    this.changeTab.emit({
      activeTab: this.active,
      formProps: {
        category: this.createCategoryForm.value.categoryName,
        // subCategory: this.createCategoryForm.value.subCategory,
      },
    });
    console.log('Category Created:', this.createCategoryForm.value);
  }

  next() {
    if (this.createCategoryForm.valid) {
      this.active = this.active + 1;
      this.changeTab.emit({
        activeTab: this.active,
        formProps: {
          category: this.createCategoryForm.value.category,
        },
      });
    }
  }

  previous() {
    this.active = this.active - 1;
    this.changeTab.emit({
      activeTab: this.active,
      formProps: {
        productCategory: this.createCategoryForm.value,
      },
    });
  }
}
