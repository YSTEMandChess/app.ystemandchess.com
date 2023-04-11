import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from '../../footer/footer.component';
import { MathArticleComponent } from './math-article.component';
import { HeaderComponent } from '../../header/header.component';

describe('MathArticleComponent', () => {
  let component: MathArticleComponent;
  let fixture: ComponentFixture<MathArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MathArticleComponent, FooterComponent, HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MathArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});