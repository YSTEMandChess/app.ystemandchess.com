import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ivo-lessons',
  templateUrl: './ivo-lessons.component.html',
  styleUrls: ['./ivo-lessons.component.css'],
})
export class IvoLessonsComponent implements OnInit {
  private currentFEN: String =
    'rnbqkbnr/pppppppp/8/8/8/8/5PPP/RNBQKBNR w KQkq - 0 1';
  private color = 'white';
  constructor() {}

  ngOnInit(): void {}
  public newGameInit() {
    this.color = Math.random() > 0.5 ? 'white' : 'black';
    if (this.color === 'white') {
      this.currentFEN =
        'rnbqkbnr/pppppppp/8/8/7P/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    } else {
      this.currentFEN =
        'rnbqkbnr/pppppppp/8/8/7P/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    }
  }
}
