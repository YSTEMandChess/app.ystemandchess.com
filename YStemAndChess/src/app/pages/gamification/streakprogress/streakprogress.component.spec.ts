import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreakprogressComponent } from './streakprogress.component';

describe('StreakprogressComponent', () => {
  let component: StreakprogressComponent;
  let fixture: ComponentFixture<StreakprogressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreakprogressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreakprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
