import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthquestsComponent } from './growthquests.component';

describe('GrowthquestsComponent', () => {
  let component: GrowthquestsComponent;
  let fixture: ComponentFixture<GrowthquestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowthquestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowthquestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
