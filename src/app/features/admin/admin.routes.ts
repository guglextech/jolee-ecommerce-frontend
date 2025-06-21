import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { EcommerceComponent } from './components/ecommerce/ecommerce.component';
import { CategoryComponent } from './components/category/category.component';
import { AdminGuard } from 'src/app/core/guards/admin.guard';

export const AdminRoutes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: AdminComponent,
    children: [
      {
        path: 'home',
        component: EcommerceComponent,
        data: {
          pageTitle: 'Jolee Dashboard',
          title: 'Dashboard',
          breadcrumb: 'dashboard',
        },
      },

      {
        path: 'category',
        component: CategoryComponent,
        data: {
          title: 'Category',
          breadcrumb: 'Category',
        },
      },

      {
        path: 'create',
        component: CreateProductComponent,
        data: {
          title: 'Product',
          breadcrumb: 'Product',
        },
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];
