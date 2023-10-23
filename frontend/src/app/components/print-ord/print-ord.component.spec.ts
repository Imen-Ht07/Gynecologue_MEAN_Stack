import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintOrdComponent } from './print-ord.component';

describe('PrintOrdComponent', () => {
  let component: PrintOrdComponent;
  let fixture: ComponentFixture<PrintOrdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintOrdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintOrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
