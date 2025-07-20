import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as CartActions from '../state/cart.actions';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  product: any = null;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private store: Store
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get(`https://fakestoreapi.com/products/${id}`).subscribe({
        next: (prod) => (this.product = prod),
        error: (err) => console.error(err)
      });
    }
  }

  addToCart() {
    if (this.product && this.quantity > 0) {
      const item = {
        id: this.product.id,
        title: this.product.title,
        price: this.product.price,
        quantity: this.quantity,
      };
      this.store.dispatch(CartActions.addProduct({ product: item }));
      alert(`Añadido ${this.quantity} x "${this.product.title}" al carrito.`);
    }
  }
}