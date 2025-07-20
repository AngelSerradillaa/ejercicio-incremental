import { Component } from '@angular/core';
import { CartItem } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CartSelectors from '../state/cart.selectors';
import * as CartActions from '../state/cart.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {
  basketItems$: Observable<CartItem[]> = this.store.select(CartSelectors.selectCartItems);
  total$: Observable<number> = this.store.select(CartSelectors.selectCartTotal);

  shipping = {
    nombre: '',
    apellido: '',
    direccion: '',
    cp: '',
    telefono: ''
  };

  constructor(private store: Store, private router: Router) {}

  onQuantityChange(id: number, quantityStr: string) {
    const quantity = Number(quantityStr);
    if (quantity >= 0) {
      this.store.dispatch(CartActions.updateQuantity({ id, quantity }));
    }
  }

  onQuantityInput(event: Event, id: number) {
  const input = event.target as HTMLInputElement;
  const quantityStr = input.value;
  this.onQuantityChange(id, quantityStr);
  }

  removeItem(id: number) {
    this.store.dispatch(CartActions.removeProduct({ id }));
  }

  onSubmit() {
    this.router.navigate(['/checkout']);
  }
}