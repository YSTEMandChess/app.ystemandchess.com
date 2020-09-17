import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceLessonsComponent } from './piece-lessons.component';

describe('PieceLessonsComponent', () => {
  let component: PieceLessonsComponent;
  let fixture: ComponentFixture<PieceLessonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieceLessonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieceLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
