import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { MentorProfileComponent } from './mentor-profile.component';
import { HeaderComponent } from '../../header/header.component';
// import { FooterComponent } from '../../footer/footer.component';
import { FooterComponent } from '../../footer/footer.component';
import {SponsorsComponent} from "../sponsors/sponsors.component";
import {BoardHifiComponent} from "../board/board-hifi.component";
import {AboutUsComponent} from "../aboutUs/about-us.component";
import { ModalModule } from '../../_modal';

describe('MentorProfileComponent', () => {
  let component: MentorProfileComponent;
  let fixture: ComponentFixture<MentorProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorProfileComponent, HeaderComponent, FooterComponent, SponsorsComponent, BoardHifiComponent, AboutUsComponent ],
      imports: [ ModalModule ]
    })
    .compileComponents(); 
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
