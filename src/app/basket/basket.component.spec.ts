import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasketComponent } from './basket.component';
import { provideRouter } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as CartSelectors from '../state/cart.selectors';
import * as CartActions from '../state/cart.actions';

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  const initialState = {
    cart: {
      items: [{ id: 1, title: 'Item 1', quantity: 2, price: 10 }],
      total: 20,
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: CartSelectors.selectCartItems, value: initialState.cart.items },
            { selector: CartSelectors.selectCartTotal, value: initialState.cart.total }
          ]
        }),
        provideRouter([])
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch updateQuantity when quantity changes', () => {
    component.onQuantityChange(1, '3');
    expect(dispatchSpy).toHaveBeenCalledWith(CartActions.updateQuantity({ id: 1, quantity: 3 }));
  });

  it('should not dispatch updateQuantity for negative quantity', () => {
    component.onQuantityChange(1, '-1');
    expect(dispatchSpy).not.toHaveBeenCalledWith(CartActions.updateQuantity({ id: 1, quantity: -1 }));
  });

  it('should dispatch removeProduct when removeItem is called', () => {
    component.removeItem(1);
    expect(dispatchSpy).toHaveBeenCalledWith(CartActions.removeProduct({ id: 1 }));
  });

});