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
import { CreateCategoryModalComponent } from './create-category-modal/create-category-modal.component';
// import { Select2Module } from 'ng-select2-component';
import { ProductService } from '../product.service';
import { Product } from 'src/app/core/models/product.model';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-product-categories',
  standalone: true,
  imports: [
    TagInputModule,
    CommonModule,
    FormsModule,
    // Select2Module,
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
  public productSubCategories: any[] = [];
  public ProductBrands: any[] = [];
  public loadingCategories = false;

  public selectedBrand: any;
  public createCategoryForm: any;
  public selectedCategory: any;
  public selectedSubCategory: any;

  constructor(
    private modal: NgbModal,
    private fb: FormBuilder,
    private productService: ProductService,
    private ls: LocalStorageService
  ) {
    this.createCategoryForm = this.fb.group({
      brand: [{}, Validators.required],
      category: [{}, Validators.required],
      subCategory: [{}, Validators.required],
    });
  }

  ngOnInit(): void {
    const form = this.productService.getProductForm();
    if (form?.get('category')?.value && this.ls.getItem('selectedCategory')) {
      this.selectedCategory = this.ls.getItem('selectedCategory');
      this.productCategory = [this.selectedCategory, ...this.productCategory];
    }
    if (form?.get('brand')?.value) {
      this.selectedBrand = form.get('brand')?.value;
      this.ProductBrands = [this.selectedBrand, ...this.ProductBrands];
    }
    // this.loadingCategories = true;
    // this.productService.getProductCategories().subscribe((categories) => {
    //   this.productCategory = [
    //     ...this.productCategory,
    //     ...categories.categories,
    //   ];
    //   this.loadingCategories = false;
    // });
    // console.log({ ...this.selectedCategory });
    this.fetchCategoriesAndBrands();
  }

  fetchCategoriesAndBrands() {
    this.loadingCategories = true;
    forkJoin([
      this.productService.getProductCategories(),
      this.productService.getBrands(),
    ]).subscribe((results) => {
      this.productCategory = [
        ...this.productCategory,
        ...results[0].categories,
      ];
      this.ProductBrands = [...this.ProductBrands, ...results[1].brands];
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
    // console.log(this.createCategoryForm.value);
    // console.log('Form Value:', this.createCategoryForm.value);
    if (this.createCategoryForm.valid || true) {
      this.active = this.active + 1;
      this.changeTab.emit({
        activeTab: this.active,
        formProps: {
          categoryId: this.selectedCategory.id,
          category: this.selectedCategory.name,
          brand: this.selectedBrand.name,
        },
      });
      this.ls.setItem('selectedCategory', this.selectedCategory);
    }
  }

  previous() {
    this.active = this.active - 1;
    this.changeTab.emit({
      activeTab: this.active,
      formProps: {
        category: this.createCategoryForm.value.category,
      },
    });
  }
}
