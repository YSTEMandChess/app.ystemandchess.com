import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PawnLessonsComponent } from './pawn-lessons.component';

describe('PawnLessonsComponent', () => {
  let component: PawnLessonsComponent;
  let fixture: ComponentFixture<PawnLessonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PawnLessonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PawnLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
