import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentAddStudentComponent } from './parent-add-student.component';
import { HeaderComponent } from 'src/app/header';

describe('ParentAddStudentComponent', () => {
  let component: ParentAddStudentComponent;
  let fixture: ComponentFixture<ParentAddStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentAddStudentComponent ],
      providers: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentAddStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
