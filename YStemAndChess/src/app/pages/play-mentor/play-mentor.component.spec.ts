import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayMentorComponent } from './play-mentor.component';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { PlayComponent } from '../play/play.component';
import { ModalModule } from '../../_modal';

describe('PlayMentorComponent', () => {
  let component: PlayMentorComponent;
  let fixture: ComponentFixture<PlayMentorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayMentorComponent, HeaderComponent, FooterComponent, PlayComponent ],
      imports: [ ModalModule ]
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
