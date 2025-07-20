import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';

export const PRODUCTS_FEATURE_KEY = 'products';

export const selectProductsState = createFeatureSelector<ProductsState>(PRODUCTS_FEATURE_KEY);

export const selectAllProducts = createSelector(
  selectProductsState,
  state => state.products
);

export const selectLoading = createSelector(
  selectProductsState,
  state => state.loading
);

export const selectError = createSelector(
  selectProductsState,
  state => state.error
);