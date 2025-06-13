import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AngularEditorModule } from "@kolkov/angular-editor";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { Select2Module } from "ng-select2-component";
// import { TagInputModule } from "ngx-chips";

// import { CreateCategoryModalComponent } from "../../../../shared/components/ui/modal/create-category-modal/create-category-modal.component";
// import { SvgIconComponent } from "../../../../shared/components/ui/svg-icon/svg-icon.component";
// import { productCategory } from "../../../../shared/data/product";
import { SvgIconComponent } from '../../header/svg-icon/svg-icon.component';
import { TagInputModule } from 'ngx-chips';
import { productCategory } from '../../../data/pos';
import { CreateCategoryModalComponent } from './create-category-modal/create-category-modal.component';
import { Select2Module } from 'ng-select2-component';

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
export class ProductCategoriesComponent {
  @Input() active: number;
  @Output() changeTab = new EventEmitter<any>();

  public productCategory = productCategory;
  public items = ['watches', 'sports', 'clothes', 'bottles'];

  public createCategoryForm: any;

  constructor(private modal: NgbModal, private fb: FormBuilder) {
    this.createCategoryForm = this.fb.group({
      categoryName: [''],
      subCategory: [''],
    });
  }

  createCategoryModal() {
    this.modal.open(CreateCategoryModalComponent, { size: 'lg' });
  }

  next() {
    console.log({
      category: this.createCategoryForm.value.categoryName,
      subCategory: this.createCategoryForm.value.subCategory,
    });
    this.active = this.active + 1;
    this.changeTab.emit({
      activeTab: this.active,
      formProps: {
        category: this.createCategoryForm.value.categoryName,
        subCategory: this.createCategoryForm.value.subCategory,
      },
    });
  }

  createCategory() {
    this.changeTab.emit({
      activeTab: this.active,
      formProps: {
        category: this.createCategoryForm.value.categoryName,
        subCategory: this.createCategoryForm.value.subCategory,
      },
    });
    console.log('Category Created:', this.createCategoryForm.value);
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
