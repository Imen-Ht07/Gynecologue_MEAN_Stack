import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarnetEditComponent } from './carnet-edit.component';

describe('CarnetEditComponent', () => {
  let component: CarnetEditComponent;
  let fixture: ComponentFixture<CarnetEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarnetEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarnetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
