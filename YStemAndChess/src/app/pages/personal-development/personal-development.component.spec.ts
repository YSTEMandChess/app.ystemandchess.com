import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDevelopmentComponent} from './personal-development.component';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { ModalModule } from '../../_modal';

describe('PersonalDevelopmentComponent', () => {

    let component: PersonalDevelopmentComponent;
    let fixture: ComponentFixture<PersonalDevelopmentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [ PersonalDevelopmentComponent, HeaderComponent, FooterComponent ],
          imports: [ ModalModule ]
        })
        .compileComponents();
      }));

});