import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardAnalyzerComponent } from './board-analyzer.component';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { ModalModule } from '../../_modal';

describe('BoardAnalyzerComponent', () => {
  let component: BoardAnalyzerComponent;
  let fixture: ComponentFixture<BoardAnalyzerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardAnalyzerComponent, HeaderComponent, FooterComponent ],
      imports: [ ModalModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
