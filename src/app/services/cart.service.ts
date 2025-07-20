import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];

  // Observable para emitir los cambios del carrito
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    // Opcional: cargar carrito desde sessionStorage/localStorage
  }

  addItem(item: CartItem) {
    const existing = this.cartItems.find(ci => ci.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.cartItems.push({ ...item });
    }
    this.updateCart();
  }

  updateQuantity(id: number, quantity: number) {
    const item = this.cartItems.find(ci => ci.id === id);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(id);
      } else {
        item.quantity = quantity;
        this.updateCart();
      }
    }
  }

  removeItem(id: number) {
    this.cartItems = this.cartItems.filter(ci => ci.id !== id);
    this.updateCart();
  }

  clearCart() {
    this.cartItems = [];
    this.updateCart();
  }

  private updateCart() {
    this.cartItemsSubject.next([...this.cartItems]);
  }
}