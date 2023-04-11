import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from '../../footer/footer.component';
import { OnlineArticleComponent } from './online-article.component';
import { HeaderComponent } from '../../header/header.component';

describe('OnlineArticleComponent', () => {
  let component: OnlineArticleComponent;
  let fixture: ComponentFixture<OnlineArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineArticleComponent, FooterComponent, HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});