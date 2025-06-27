import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductDetailsComponent } from './pages/product-detail/product-detail.component';
import { ProductCheckoutComponent } from './pages/product-checkout/product-checkout.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CompletedComponent } from './pages/checkout/widgets/completed/completed.component';

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
    component: CheckoutComponent,
  },
  {
    path: 'payment-complete',
    loadComponent: () =>
      import('./pages/checkout/widgets/completed/completed.component').then(
        (c) => c.CompletedComponent
      ),
  },
];
