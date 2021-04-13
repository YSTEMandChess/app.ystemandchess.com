import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { from } from 'rxjs';

import { LearningsComponent } from './learnings.component';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { ModalModule } from '../../_modal/modal.module';

import { SocketService } from '../../services/socket/socket.service';
import { CookieService } from 'ngx-cookie-service';
import { NgxAgoraModule, AgoraConfig } from 'ngx-agora';
import { environment } from 'src/environments/environment';

describe('LearningsComponent', () => {
  let component: LearningsComponent;
  let fixture: ComponentFixture<LearningsComponent>;
  const agoraConfig: AgoraConfig = {
    AppID: environment.agora.appId,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LearningsComponent, HeaderComponent, FooterComponent],
      imports: [ModalModule, NgxAgoraModule.forRoot(agoraConfig)],
      providers: [HeaderComponent, SocketService, CookieService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// describe('LearningsComponent', () => {
//   let component: LearningsComponent;
//   let fixture: ComponentFixture<LearningsComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ LearningsComponent, HeaderComponent, FooterComponent ],
//       imports: [ ModalModule ]
//       providers: [ LearningsComponent, HeaderComponent, FooterComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(LearningsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
