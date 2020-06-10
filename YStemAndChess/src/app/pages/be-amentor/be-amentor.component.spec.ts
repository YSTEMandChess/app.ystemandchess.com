import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeAMentorComponent } from './be-amentor.component';

describe('BeAMentorComponent', () => {
  let component: BeAMentorComponent;
  let fixture: ComponentFixture<BeAMentorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeAMentorComponent ]
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
