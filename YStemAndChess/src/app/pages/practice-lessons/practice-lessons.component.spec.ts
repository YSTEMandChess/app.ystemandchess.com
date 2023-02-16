import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeLessonsComponent } from './practice-lessons.component';

describe('PracticeLessonsComponent', () => {
  let component: PracticeLessonsComponent;
  let fixture: ComponentFixture<PracticeLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticeLessonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
