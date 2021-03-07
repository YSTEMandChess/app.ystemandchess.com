import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { PieceLessonsComponent } from './piece-lessons.component';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { PlayLessonComponent } from '../play-lesson/play-lesson.component';
import { ModalModule } from '../../_modal';

describe('PieceLessonsComponent', () => {
  let component: PieceLessonsComponent;
  let fixture: ComponentFixture<PieceLessonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieceLessonsComponent, HeaderComponent, FooterComponent, PlayLessonComponent ],
      imports: [ ModalModule ]
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
