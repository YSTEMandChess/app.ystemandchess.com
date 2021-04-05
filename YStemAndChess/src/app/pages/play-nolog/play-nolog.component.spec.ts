import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { PlayNologComponent } from './play-nolog.component';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { PlayComponent } from '../play/play.component';
import { ModalModule } from '../../_modal';

import { SocketService } from '../../services/socket/socket.service';
import { CookieService } from 'ngx-cookie-service';
import { AgoraClient, ClientEvent, NgxAgoraService, Stream, NgxAgoraModule, AgoraConfig } from 'ngx-agora';
import { environment } from 'src/environments/environment';

describe('PlayNologComponent', () => {
  let component: PlayNologComponent;
  let fixture: ComponentFixture<PlayNologComponent>;
  const agoraConfig: AgoraConfig = {
    AppID: environment.agora.appId
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayNologComponent, HeaderComponent, FooterComponent, PlayComponent ],
      imports: [ ModalModule, NgxAgoraModule.forRoot(agoraConfig) ],
      providers: [ PlayComponent, HeaderComponent, SocketService, CookieService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayNologComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
