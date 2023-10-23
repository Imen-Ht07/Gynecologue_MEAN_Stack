import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPatientesComponent } from './list-patientes.component';

describe('ListPatientesComponent', () => {
  let component: ListPatientesComponent;
  let fixture: ComponentFixture<ListPatientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPatientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPatientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
