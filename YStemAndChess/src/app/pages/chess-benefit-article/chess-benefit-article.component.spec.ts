import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from '../../footer/footer.component';
import { ChessBenefitArticleComponent } from './chess-benefit-article.component';
import { HeaderComponent } from '../../header/header.component';

describe('ChessBenefitArticleComponent', () => {
  let component: ChessBenefitArticleComponent;
  let fixture: ComponentFixture<ChessBenefitArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChessBenefitArticleComponent, FooterComponent, HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChessBenefitArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});