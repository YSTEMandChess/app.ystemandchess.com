import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StudentRecordingsComponent } from './student-recordings.component';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { ModalModule } from '../../_modal';

describe('StudentRecordingsComponent', () => {
  let component: StudentRecordingsComponent;
  let fixture: ComponentFixture<StudentRecordingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentRecordingsComponent, HeaderComponent, FooterComponent ],
      imports: [ ModalModule ]
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
