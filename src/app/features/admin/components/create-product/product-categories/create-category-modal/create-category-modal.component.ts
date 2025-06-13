import { Component } from '@angular/core';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Select2Data, Select2Module } from 'ng-select2-component';
import { Category } from 'src/app/core/models/category';
import { category, categoryStatus } from 'src/app/features/admin/data/category';

@Component({
  selector: 'app-create-category-modal',
  standalone: true,
  imports: [AngularEditorModule, Select2Module],
  templateUrl: './create-category-modal.component.html',
  styleUrl: './create-category-modal.component.scss',
})
export class CreateCategoryModalComponent {
  public category: Category[] = category;
  public catObj: Category = {
    category_name: '',
    description: '',
    category_type: '',
    id: 0,
    color: '',
    image: '',
    is_active: false,
  };
  public categoryStatus = categoryStatus;
  public parentCategory: Select2Data = [];
  public categoryType: Select2Data = [];

  constructor(private modal: NgbActiveModal) {
    this.category.filter((category) => {
      this.parentCategory.push({
        value: category.category_name,
        label: category.category_name,
      });
      this.categoryType.push({
        value: category.category_type,
        label: category.category_type,
      });
    });
  }

  close() {
    this.modal.close();
  }

  submitCreate() {
    // Logic to handle form submission for creating a new category
    this.modal.close({
      action: 'create',
      data: this.catObj,
    });
  }
}
