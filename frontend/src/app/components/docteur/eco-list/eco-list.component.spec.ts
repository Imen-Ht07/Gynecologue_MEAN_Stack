import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoListComponent } from './eco-list.component';

describe('EcoListComponent', () => {
  let component: EcoListComponent;
  let fixture: ComponentFixture<EcoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
