import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from '../../footer/footer.component';
import { MissionHifiComponent } from './mission-hifi.component';
import { HeaderComponent } from '../../header/header.component';

describe('MissionHifiComponent', () => {
  let component: MissionHifiComponent;
  let fixture: ComponentFixture<MissionHifiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionHifiComponent, FooterComponent, HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionHifiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});