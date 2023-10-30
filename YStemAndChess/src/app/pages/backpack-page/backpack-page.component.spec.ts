import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackpackPageComponent } from './backpack-page.component';

describe('BackpackPageComponent', () => {
  let component: BackpackPageComponent;
  let fixture: ComponentFixture<BackpackPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackpackPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackpackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
