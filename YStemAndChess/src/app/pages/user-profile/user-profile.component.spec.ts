import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { UserProfileComponent } from './user-profile.component';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { LoginComponent } from '../login/login.component';
import { ModalModule } from '../../_modal';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
