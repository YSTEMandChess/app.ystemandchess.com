import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { PlayComponent } from './play.component';

import { environment } from 'src/environments/environment';

import { SocketService } from '../../services/socket/socket.service';
import { CookieService } from 'ngx-cookie-service';
import { AgoraClient, ClientEvent, NgxAgoraService, Stream, NgxAgoraModule, AgoraConfig } from 'ngx-agora';
import { ɵBROWSER_SANITIZATION_PROVIDERS, DomSanitizer } from '@angular/platform-browser';
import { NgxAgoraComponent } from 'ngx-agora/lib/ngx-agora.component';
import { env } from 'process';

describe('PlayComponent', () => {
  let component: PlayComponent;
  let fixture: ComponentFixture<PlayComponent>;
  const agoraConfig: AgoraConfig = {
    AppID: environment.agora.appId
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayComponent ],
      imports: [ NgxAgoraModule.forRoot(agoraConfig) ],
      providers: [ SocketService, CookieService, DomSanitizer, NgxAgoraService, ɵBROWSER_SANITIZATION_PROVIDERS ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
