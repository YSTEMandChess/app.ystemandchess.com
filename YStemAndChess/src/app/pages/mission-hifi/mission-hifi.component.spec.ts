import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionHifiComponent } from './mission-hifi.component';

describe('MissionHifiComponent', () => {
  let component: MissionHifiComponent;
  let fixture: ComponentFixture<MissionHifiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionHifiComponent ]
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
