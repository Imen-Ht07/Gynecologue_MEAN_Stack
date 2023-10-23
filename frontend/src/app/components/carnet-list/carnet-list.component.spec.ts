import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarnetListComponent } from './carnet-list.component';

describe('CarnetListComponent', () => {
  let component: CarnetListComponent;
  let fixture: ComponentFixture<CarnetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarnetListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarnetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
