import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialsHifiComponent } from './financials-hifi.component';

describe('FinancialsHifiComponent', () => {
  let component: FinancialsHifiComponent;
  let fixture: ComponentFixture<FinancialsHifiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialsHifiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialsHifiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
