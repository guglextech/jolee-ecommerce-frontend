import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { topCategories } from 'src/app/features/admin/data/e-commerce';

@Component({
  selector: 'app-top-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './top-categories.component.html',
  styleUrl: './top-categories.component.scss',
})
export class TopCategoriesComponent {
  public topCategories = topCategories;
}
