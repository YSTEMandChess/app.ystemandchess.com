import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayEditorComponent } from './play-editor.component';

describe('PlayEditorComponent', () => {
  let component: PlayEditorComponent;
  let fixture: ComponentFixture<PlayEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
