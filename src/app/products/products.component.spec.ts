import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as ProductsActions from '../state/products.actions';
import * as ProductsSelectors from '../state/products.selectors';
import { ActivatedRoute } from '@angular/router';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let store: MockStore;
  const mockProducts = [
    { id: 1, title: 'Product 1', category: 'Category A', price: 10 },
    { id: 2, title: 'Product 2', category: 'Category B', price: 20 }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: ProductsSelectors.selectAllProducts,
              value: mockProducts
            }
          ]
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => null } }
          }
        }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadProducts on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(dispatchSpy).toHaveBeenCalledWith(ProductsActions.loadProducts());
  });

  it('should load products from the store', () => {
    expect(component.allProducts.length).toBe(2);
    expect(component.filteredProducts.length).toBe(2);
  });

  it('should filter products correctly', () => {
    component.filterProducts('product 1');
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].title).toBe('Product 1');
  });
});