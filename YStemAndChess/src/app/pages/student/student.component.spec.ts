import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { StudentComponent } from './student.component';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { PlayComponent } from '../play/play.component';
import { ModalModule } from '../../_modal';

import { NgxAgoraModule, AgoraConfig } from 'ngx-agora';
import { environment } from 'src/environments/environment';

describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;
  const agoraConfig: AgoraConfig = {
    AppID: environment.agora.appId
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentComponent, HeaderComponent, FooterComponent, PlayComponent ],
      imports: [ ModalModule, NgxAgoraModule.forRoot(agoraConfig) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
