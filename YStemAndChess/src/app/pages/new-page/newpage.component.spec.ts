import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { from } from 'rxjs';

import { NewpageComponent } from './newpage.component';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { ModalModule } from '../../_modal/modal.module';

import { SocketService } from './../../socket.service';
import { CookieService } from 'ngx-cookie-service';
import { NgxAgoraModule, AgoraConfig } from 'ngx-agora';
import { environment } from 'src/environments/environment';

describe('NewpageComponent', () => {
  let component: NewpageComponent;
  let fixture: ComponentFixture<NewpageComponent>;
  const agoraConfig: AgoraConfig = {
    AppID: environment.agora.appId
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewpageComponent, HeaderComponent, FooterComponent ],
      imports: [ ModalModule, NgxAgoraModule.forRoot(agoraConfig) ],
      providers: [ HeaderComponent, SocketService, CookieService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// describe('NewpageComponent', () => {
//   let component: NewpageComponent;
//   let fixture: ComponentFixture<NewpageComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ NewpageComponent, HeaderComponent, FooterComponent ],
//       imports: [ ModalModule ]
//       providers: [ NewpageComponent, HeaderComponent, FooterComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(NewpageComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
