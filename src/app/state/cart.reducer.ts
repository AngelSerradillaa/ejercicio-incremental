import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { CartItem } from '../services/cart.service';

export const CART_FEATURE_KEY = 'cart';

export interface CartState {
  items: CartItem[];
}

export const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cartItems') ?? '[]'),
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addProduct, (state, { product }) => {
    const existing = state.items.find(item => item.id === product.id);
    let updatedItems;
    if (existing) {
      updatedItems = state.items.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
      );
    } else {
      updatedItems = [...state.items, product];
    }
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    return { ...state, items: updatedItems };
  }),
  on(CartActions.removeProduct, (state, { id }) => {
    const updatedItems = state.items.filter(item => item.id !== id);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    return { ...state, items: updatedItems };
  }),
  on(CartActions.updateQuantity, (state, { id, quantity }) => {
    const updatedItems = state.items.map(item =>
      item.id === id ? { ...item, quantity } : item
    ).filter(item => item.quantity > 0);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    return { ...state, items: updatedItems };
  }),
  on(CartActions.clearCart, state => {
    localStorage.removeItem('cartItems');
    return { ...state, items: [] };
  }),
  on(CartActions.loadCartFromStorage, (state, { items }) => {
    return { ...state, items };
  })
);