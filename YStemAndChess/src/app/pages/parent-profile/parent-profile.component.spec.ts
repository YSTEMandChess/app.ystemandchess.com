import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ParentProfileComponent } from './parent-profile.component';
import { HeaderComponent } from '../../header/header.component';
// import { FooterComponent } from '../../footer/footer.component';
import { FooterComponent } from '../../footer/footer.component';
import {SponsorsComponent} from "../sponsors/sponsors.component";
import {BoardHifiComponent} from "../board/board-hifi.component";
import {AboutUsComponent} from "../aboutUs/about-us.component";
import { ModalModule } from '../../_modal';

describe('ParentProfileComponent', () => {
  let component: ParentProfileComponent;
  let fixture: ComponentFixture<ParentProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentProfileComponent, HeaderComponent, FooterComponent, SponsorsComponent, BoardHifiComponent, AboutUsComponent ],
      imports: [ ModalModule ]
    })
    .compileComponents(); 
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
