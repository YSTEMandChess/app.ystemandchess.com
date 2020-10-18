import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayComponent } from './play.component';

import { environment } from 'src/environments/environment';

import { SocketService } from './../../socket.service';
import { CookieService } from 'ngx-cookie-service';
import { AgoraClient, ClientEvent, NgxAgoraService, Stream, NgxAgoraModule } from 'ngx-agora';
import { DomSanitizer } from '@angular/platform-browser';
import { TestObject } from 'protractor/built/driverProviders';

describe('PlayComponent', () => {
  let component: PlayComponent;
  let fixture: ComponentFixture<PlayComponent>;
  let agora: AgoraClient;
  let stream: Stream;
  let client: ClientEvent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayComponent ],
      imports: [ NgxAgoraModule ],
      providers: [ SocketService, CookieService, NgxAgoraService, DomSanitizer ]
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
