import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent, FormsModule]  // importante FormsModule para ngModel
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event when onSearchChange is called', () => {
    spyOn(component.search, 'emit');
    component.searchText = 'test query';

    component.onSearchChange();

    expect(component.search.emit).toHaveBeenCalledWith('test query');
  });

  it('should update searchText with input and emit event on input event', () => {
    spyOn(component.search, 'emit');
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');

    input.value = 'hello';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Aquí simulamos que onSearchChange se llama cuando cambia input
    component.onSearchChange();

    expect(component.searchText).toBe('hello');
    expect(component.search.emit).toHaveBeenCalledWith('hello');
  });
});