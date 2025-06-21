import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CategoryFilterComponent } from './widgets/category-filter/category-filter.component';
import { Category } from 'src/app/core/models/category';
import { TableComponent } from '../sharedComponents/table/table.component';
import { TableClickedAction, TableConfigs } from 'src/app/core/models/common';
import { category } from '../../data/category';
import { CreateCategoryModalComponent } from '../create-product/product-categories/create-category-modal/create-category-modal.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, CategoryFilterComponent, TableComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  public categories: Category[];
  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Category', field_value: 'category_name', sort: true },
      { title: 'Description', field_value: 'description', sort: true },
      { title: 'Category Type', field_value: 'category_type', sort: true },
    ],
    row_action: [
      { label: 'Edit', action_to_perform: 'edit', icon: 'edit-content' },
      {
        label: 'Delete',
        action_to_perform: 'delete',
        icon: 'trash1',
        modal: true,
        model_text: 'Do you really want to delete the category?',
      },
    ],
    data: [] as Category[],
  };

  constructor(private modal: NgbModal) {
    this.tableConfig.data = this.category(category);
    this.categories = category;
  }

  handleAction(value: TableClickedAction) {
    if (value.action_to_perform === 'delete' && value.data) {
      this.categories = this.categories.filter(
        (category: Category) => category.id !== value.data.id
      );
      this.tableConfig = {
        ...this.tableConfig,
        data: this.category(this.categories),
      };
    }
  }

  private category(categories: Category[]) {
    return categories.map((category: Category) => {
      const formattedCategory = { ...category };
      formattedCategory.name = `<div class="product-names">
                                <div class="light-product-box">
                                  <img class="img-fluid" src="${category.image}" alt="t-shirt">
                                </div>
                                <p>${category.name}</p>
                              </div>`;

      formattedCategory.description = `<p class="f-light">${category.description}</p>`;
      formattedCategory.category_type = `<span class="badge badge-light-${category.color}">${category.category_type}</span>`;
      return formattedCategory;
    });
  }

  openCategoryModal() {
    this.modal
      .open(CreateCategoryModalComponent, {
        size: 'lg',
        centered: true,
      })
      .result.then((result) => {
        if (result.action === 'create') {
          this.categories.push(result.data);
          this.tableConfig.data = this.category(this.categories);
        }
      })
      .catch(() => {
        // Handle modal dismissal
      });
  }

  ngOnDestroy() {
    this.tableConfig.data = [];
  }
}
