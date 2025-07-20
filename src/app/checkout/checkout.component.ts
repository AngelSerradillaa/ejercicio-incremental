import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as CartActions from '../state/cart.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cardNumber = '';
  expiry = '';
  cvc = '';
  loading = false;

  constructor(private router: Router, private store: Store) {}

  submitPayment() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;

      const sanitizedCard = this.cardNumber.replace(/\s+/g, '');
      if (sanitizedCard === '4999999999999999' && this.expiry && this.cvc) {
        this.store.dispatch(CartActions.clearCart());
        this.router.navigate(['/confirmation']);
      } else {
        alert('Hay un error procesando la compra, revise los datos introducidos.');
      }
    }, 3000);
  }
}