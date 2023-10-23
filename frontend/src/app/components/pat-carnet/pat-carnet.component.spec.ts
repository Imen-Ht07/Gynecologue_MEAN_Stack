import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatCarnetComponent } from './pat-carnet.component';

describe('PatCarnetComponent', () => {
  let component: PatCarnetComponent;
  let fixture: ComponentFixture<PatCarnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatCarnetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatCarnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
