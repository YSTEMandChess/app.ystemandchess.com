import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyChessComponent } from './why-chess.component';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { ModalModule } from '../../_modal';

describe('WhyChessComponent', () => {
  let component: WhyChessComponent;
  let fixture: ComponentFixture<WhyChessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhyChessComponent, HeaderComponent, FooterComponent ],
      imports: [ ModalModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyChessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
