import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayMentorComponent } from './play-mentor.component';

describe('PlayMentorComponent', () => {
  let component: PlayMentorComponent;
  let fixture: ComponentFixture<PlayMentorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayMentorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
