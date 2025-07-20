import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CheckoutComponent } from './checkout.component';
import { provideRouter, Router } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import * as CartActions from '../state/cart.actions';
import { Store } from '@ngrx/store';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let dispatchSpy: jasmine.Spy;
  let routerSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutComponent],
      providers: [
        provideMockStore(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    const store = TestBed.inject(Store);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    const router = TestBed.inject(Router);
    routerSpy = spyOn(router, 'navigate').and.stub();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should process payment successfully with correct card number', fakeAsync(() => {
    component.cardNumber = '4999999999999999';
    component.expiry = '12/25';
    component.cvc = '123';

    component.submitPayment();
    expect(component.loading).toBeTrue();

    tick(3000);  // Avanzar tiempo

    expect(component.loading).toBeFalse();
    expect(dispatchSpy).toHaveBeenCalledWith(CartActions.clearCart());
    expect(routerSpy).toHaveBeenCalledWith(['/confirmation']);
  }));

  it('should alert on error with wrong card number', fakeAsync(() => {
    spyOn(window, 'alert');
    component.cardNumber = '1234';
    component.expiry = '12/25';
    component.cvc = '123';

    component.submitPayment();
    expect(component.loading).toBeTrue();

    tick(3000);

    expect(component.loading).toBeFalse();
    expect(window.alert).toHaveBeenCalledWith('Hay un error procesando la compra, revise los datos introducidos.');
    expect(dispatchSpy).not.toHaveBeenCalled();
    expect(routerSpy).not.toHaveBeenCalled();
  }));
});