import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListappoComponent } from './listappo.component';

describe('ListappoComponent', () => {
  let component: ListappoComponent;
  let fixture: ComponentFixture<ListappoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListappoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListappoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
