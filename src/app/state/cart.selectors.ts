import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState, CART_FEATURE_KEY } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>(CART_FEATURE_KEY);

export const selectCartItems = createSelector(
  selectCartState,
  state => state.items
);

export const selectCartTotal = createSelector(
  selectCartItems,
  items => items.reduce((acc, item) => acc + item.price * item.quantity, 0)
);