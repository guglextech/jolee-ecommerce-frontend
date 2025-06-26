import { Component } from '@angular/core';
// import { Select2Data, Select2Module } from 'ng-select2-component';
import { CardComponent } from '../../../sharedComponents/card/card.component';
import { Category } from 'src/app/core/models/category';
import { category, categoryStatus } from 'src/app/features/admin/data/category';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.scss',
})
export class CategoryFilterComponent {
  public category: Category[] = category;
  public categoryStatus = categoryStatus;
  public parentCategory: any = [];
  public categoryType: any = [];

  constructor() {
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
  }
}
