import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPatienteComponent } from './about-patiente.component';

describe('AboutPatienteComponent', () => {
  let component: AboutPatienteComponent;
  let fixture: ComponentFixture<AboutPatienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutPatienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutPatienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
