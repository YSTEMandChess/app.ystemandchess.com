import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayLessonComponent } from './play-lesson.component';

describe('PlayLessonComponent', () => {
  let component: PlayLessonComponent;
  let fixture: ComponentFixture<PlayLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayLessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
