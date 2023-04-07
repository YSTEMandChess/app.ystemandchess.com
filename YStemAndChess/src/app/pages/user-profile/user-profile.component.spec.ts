import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { HeaderComponent } from '../../header/header.component';
// import { FooterComponent } from '../../footer/footer.component';
import { FooterComponent } from '../../footer/footer.component';
import {SponsorsComponent} from "../sponsors/sponsors.component";
import {BoardHifiComponent} from "../board/board-hifi.component";
import {AboutUsComponent} from "../aboutUs/about-us.component";
import { ModalModule } from '../../_modal';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileComponent, HeaderComponent, FooterComponent, SponsorsComponent, BoardHifiComponent, AboutUsComponent ],
      imports: [ ModalModule ]
    })
    .compileComponents(); 
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
