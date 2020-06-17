import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayNologComponent } from './play-nolog.component';

describe('PlayNologComponent', () => {
  let component: PlayNologComponent;
  let fixture: ComponentFixture<PlayNologComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayNologComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayNologComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
