import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { BeAMentorComponent } from './be-amentor.component';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { ModalModule } from '../../_modal';

describe('BeAMentorComponent', () => {
  let component: BeAMentorComponent;
  let fixture: ComponentFixture<BeAMentorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeAMentorComponent, HeaderComponent, FooterComponent ],
      imports: [ ModalModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeAMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
