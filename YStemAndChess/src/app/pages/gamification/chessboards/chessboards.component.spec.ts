import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessboardsComponent } from './chessboards.component';

describe('ChessboardsComponent', () => {
  let component: ChessboardsComponent;
  let fixture: ComponentFixture<ChessboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChessboardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChessboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
