import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./country-specific/ghana/home.routes').then(
        (m) => m.HomepageInRoutes
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/admin/admin.routes').then((r) => r.AdminRoutes),
  },
  {
    path: 'dashboard',
    children: [{ path: '**', component: LoginComponent }],
    data: {
      title: 'Login',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminGuard],
})
export class AppRoutes {}
