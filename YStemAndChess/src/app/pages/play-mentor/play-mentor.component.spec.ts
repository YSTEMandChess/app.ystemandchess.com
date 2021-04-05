import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { PlayMentorComponent } from './play-mentor.component';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { PlayComponent } from '../play/play.component';
import { ModalModule } from '../../_modal';

import { NgxAgoraModule, AgoraConfig } from 'ngx-agora';
import { environment } from 'src/environments/environment';

describe('PlayMentorComponent', () => {
  let component: PlayMentorComponent;
  let fixture: ComponentFixture<PlayMentorComponent>;
  const agoraConfig: AgoraConfig = {
    AppID: environment.agora.appId
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayMentorComponent, HeaderComponent, FooterComponent, PlayComponent ],
      imports: [ ModalModule, NgxAgoraModule.forRoot(agoraConfig) ]
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
