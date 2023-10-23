import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEcoComponent } from './add-eco.component';

describe('AddEcoComponent', () => {
  let component: AddEcoComponent;
  let fixture: ComponentFixture<AddEcoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEcoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
