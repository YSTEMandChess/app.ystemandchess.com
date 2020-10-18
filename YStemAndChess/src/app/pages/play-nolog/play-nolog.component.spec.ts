import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayNologComponent } from './play-nolog.component';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { PlayComponent } from '../play/play.component';
import { ModalModule } from '../../_modal';

import { SocketService } from './../../socket.service';
import { CookieService } from 'ngx-cookie-service';

describe('PlayNologComponent', () => {
  let component: PlayNologComponent;
  let fixture: ComponentFixture<PlayNologComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayNologComponent, HeaderComponent, FooterComponent, PlayComponent ],
      imports: [ ModalModule ],
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
