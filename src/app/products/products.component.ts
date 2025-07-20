import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { Store } from '@ngrx/store';
import * as ProductsSelectors from '../state/products.selectors';
import * as ProductsActions from '../state/products.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<ProductsActions.Product[]> = this.store.select(ProductsSelectors.selectAllProducts);
  filteredProducts: ProductsActions.Product[] = [];
  allProducts: ProductsActions.Product[] = [];

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(ProductsActions.loadProducts());

    this.products$.subscribe(products => {
      this.allProducts = products;
      this.filteredProducts = products;
    });
  }

  filterProducts(filterText: string) {
    if (!filterText.trim()) {
      this.filteredProducts = this.allProducts;
      return;
    }
    const lower = filterText.toLowerCase();
    this.filteredProducts = this.allProducts.filter(p =>
      p.title.toLowerCase().includes(lower) || p.category.toLowerCase().includes(lower)
    );
  }
}