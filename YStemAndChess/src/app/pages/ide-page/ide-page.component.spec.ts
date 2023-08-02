import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdePageComponent } from './ide-page.component';

describe('IdePageComponent', () => {
  let component: IdePageComponent;
  let fixture: ComponentFixture<IdePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
