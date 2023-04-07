import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from '../../footer/footer.component';
import { ComputerBenefitArticleComponent } from './computer-benefit-article.component';
import { HeaderComponent } from '../../header/header.component';

describe('ComputerBenefitArticleComponent', () => {
  let component: ComputerBenefitArticleComponent;
  let fixture: ComponentFixture<ComputerBenefitArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComputerBenefitArticleComponent, FooterComponent, HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerBenefitArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});