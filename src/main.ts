import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { cartReducer, CART_FEATURE_KEY } from './app/state/cart.reducer';
import { provideEffects } from '@ngrx/effects';
import { productsReducer, PRODUCTS_FEATURE_KEY } from './app/state/products.reducer';
import { ProductsEffects } from './app/state/products.effects';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes),
    provideHttpClient(),
    provideStore({ [CART_FEATURE_KEY]: cartReducer, [PRODUCTS_FEATURE_KEY]: productsReducer }),
    provideEffects([ProductsEffects]),
    provideStoreDevtools({ maxAge: 25 })
    
  ],
});