import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductDetailsComponent } from './pages/product-detail/product-detail.component';
import { ProductCheckoutComponent } from './pages/product-checkout/product-checkout.component';

export const HomepageInRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
  },
  {
   path: 'checkout',
   component: ProductCheckoutComponent,
 },
];
