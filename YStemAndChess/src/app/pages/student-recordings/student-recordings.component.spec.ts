import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRecordingsComponent } from './student-recordings.component';

describe('StudentRecordingsComponent', () => {
  let component: StudentRecordingsComponent;
  let fixture: ComponentFixture<StudentRecordingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentRecordingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRecordingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
