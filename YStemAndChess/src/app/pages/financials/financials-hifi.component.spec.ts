import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialsHifiComponent } from './financials-hifi.component';
import { FooterComponent } from '../../footer/footer.component';

import { HeaderComponent } from '../../header/header.component';

describe('FinancialsHifiComponent', () => {
  let component: FinancialsHifiComponent;
  let fixture: ComponentFixture<FinancialsHifiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialsHifiComponent, FooterComponent, HeaderComponent ]
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