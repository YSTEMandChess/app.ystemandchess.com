import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from '../../footer/footer.component';
import { MentoringBenefitArticleComponent } from './mentoring-benefit-article.component';
import { HeaderComponent } from '../../header/header.component';

describe('MentoringBenefitArticleComponent', () => {
  let component: MentoringBenefitArticleComponent;
  let fixture: ComponentFixture<MentoringBenefitArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentoringBenefitArticleComponent, FooterComponent, HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentoringBenefitArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});