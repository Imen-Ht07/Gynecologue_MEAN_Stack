import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPatComponent } from './add-pat.component';

describe('AddPatComponent', () => {
  let component: AddPatComponent;
  let fixture: ComponentFixture<AddPatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
