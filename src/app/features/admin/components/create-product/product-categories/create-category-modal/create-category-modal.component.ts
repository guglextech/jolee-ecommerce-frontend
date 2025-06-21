import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Select2Data, Select2Module } from 'ng-select2-component';
import { Category, IProductCategory } from 'src/app/core/models/category';
import { category, categoryStatus } from 'src/app/features/admin/data/category';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-create-category-modal',
  standalone: true,
  imports: [AngularEditorModule, Select2Module],
  templateUrl: './create-category-modal.component.html',
  styleUrl: './create-category-modal.component.scss',
})
export class CreateCategoryModalComponent {
  public category: Category[] = category;
  public catObj: FormGroup = new FormGroup({});
  public categoryStatus = categoryStatus;
  public parentCategory: Select2Data = [];
  public categoryType: Select2Data = [];

  constructor(
    private modal: NgbActiveModal,
    private form: FormBuilder,
    private service: ProductService
  ) {
    // this.category.filter((category) => {
    //   this.parentCategory.push({
    //     value: category.category_name,
    //     label: category.category_name,
    //   });
    //   this.categoryType.push({
    //     value: category.category_type,
    //     label: category.category_type,
    //   });
    // });
    this.catObj = this.form.group({
      name: [''],
      description: [''],
    });
  }

  close() {
    this.modal.close();
  }

  submitCreate() {
    console.log(this.catObj.value);
    if (this.catObj.valid) {
      this.service
        .createProductCategory(this.catObj.value as IProductCategory)
        .subscribe({
          next: (response) => {
            this.modal.close({
              action: 'create',
              data: this.catObj,
            });
            console.info('Category created successfully', response);
          },
          error: (error) => {
            console.error('Error creating category', error);
          },
        });
    } else {
      console.error('Form is invalid');
    }
    this.catObj.reset();
  }
}
