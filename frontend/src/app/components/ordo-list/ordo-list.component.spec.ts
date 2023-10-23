import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdoListComponent } from './ordo-list.component';

describe('OrdoListComponent', () => {
  let component: OrdoListComponent;
  let fixture: ComponentFixture<OrdoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
