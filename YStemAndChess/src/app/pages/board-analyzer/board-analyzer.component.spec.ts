import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BoardAnalyzerComponent } from './board-analyzer.component';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { FormsModule } from '@angular/forms'; 
import { ModalModule } from '../../_modal';

describe('BoardAnalyzerComponent', () => {
  let component: BoardAnalyzerComponent;
  let fixture: ComponentFixture<BoardAnalyzerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardAnalyzerComponent, HeaderComponent, FooterComponent ],
      imports: [ FormsModule, ModalModule, RouterTestingModule]
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
