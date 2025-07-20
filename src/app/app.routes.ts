import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./productdetails/productdetails.component').then((m) => m.ProductdetailsComponent),
  },
  {
    path: 'basket',
    loadComponent: () =>
      import('./basket/basket.component').then((m) => m.BasketComponent),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./checkout/checkout.component').then((m) => m.CheckoutComponent),
  },
  {
    path: 'confirmation',
    loadComponent: () =>
      import('./confirmation/confirmation.component').then((m) => m.ConfirmationComponent),
  },
];