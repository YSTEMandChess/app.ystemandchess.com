import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardHifiComponent } from './board-hifi.component';

describe('BoardPageComponent', () => {
  let component: BoardHifiComponent;
  let fixture: ComponentFixture<BoardHifiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardHifiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardHifiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
