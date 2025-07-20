import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductdetailsComponent } from './productdetails.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

describe('ProductdetailsComponent', () => {
  let component: ProductdetailsComponent;
  let fixture: ComponentFixture<ProductdetailsComponent>;
  let httpMock: HttpTestingController;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductdetailsComponent,
        HttpClientTestingModule
      ],
      providers: [
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductdetailsComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(Store);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    fixture.detectChanges();  // Aquí se dispara ngOnInit y la petición HTTP

    const req = httpMock.expectOne('https://fakestoreapi.com/products/1');
    req.flush({ id: 1, title: 'Test Product', price: 10 });

    expect(component).toBeTruthy();
    expect(component.product).toEqual({ id: 1, title: 'Test Product', price: 10 });
  });

  it('should fetch product on init', () => {
    fixture.detectChanges();

    const req = httpMock.expectOne('https://fakestoreapi.com/products/1');
    expect(req.request.method).toBe('GET');

    const mockProduct = { id: 1, title: 'Test Product', price: 10 };
    req.flush(mockProduct);

    expect(component.product).toEqual(mockProduct);
  });

  it('should dispatch addProduct and alert when addToCart called', () => {
    spyOn(window, 'alert');
    spyOn(store, 'dispatch');

    component.product = { id: 1, title: 'Test Product', price: 10 };
    component.quantity = 2;

    component.addToCart();

    expect(store.dispatch).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Añadido 2 x "Test Product" al carrito.');
  });
});