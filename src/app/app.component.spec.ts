import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { FooterComponent } from './footer/footer.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        TooltipComponent,
        FooterComponent,
        RouterTestingModule // para simular <router-outlet>
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have title 'ejercicio-incremental'`, () => {
    expect(component.title).toBe('ejercicio-incremental');
  });

  it('should render tooltip and footer components', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-tooltip')).not.toBeNull();
    expect(compiled.querySelector('app-footer')).not.toBeNull();
  });
});
