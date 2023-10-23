import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarnetCreateComponent } from './carnet-create.component';

describe('CarnetCreateComponent', () => {
  let component: CarnetCreateComponent;
  let fixture: ComponentFixture<CarnetCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarnetCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarnetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
