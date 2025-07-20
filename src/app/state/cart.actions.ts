import { createAction, props } from '@ngrx/store';
import { CartItem } from '../services/cart.service';

export const addProduct = createAction(
  '[Cart] Add Product',
  props<{ product: CartItem }>()
);

export const removeProduct = createAction(
  '[Cart] Remove Product',
  props<{ id: number }>()
);

export const updateQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ id: number; quantity: number }>()
);

export const clearCart = createAction('[Cart] Clear Cart');

export const loadCartFromStorage = createAction(
  '[Cart] Load Cart From Storage',
  props<{ items: CartItem[] }>()
);