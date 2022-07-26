import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss'],
})
export class LessonsComponent implements OnInit {
  constructor(private cookie: CookieService) {}

  ngOnInit(): void {
    if (this.cookie.check('piece')) {
      this.cookie.delete('piece');
    }
  }
  
  assignPawn() {
    console.log('this.cookie.check(piece): ', this.cookie.check('piece'));
    this.cookie.set('piece', 'pawn');
  }

  assignRook() {
    this.cookie.set('piece', 'rook');
  }

  assignBishop() {
    this.cookie.set('piece', 'bishop');
  }

  assignHorse() {
    this.cookie.set('piece', 'horse');
  }

  assignQueen() {
    this.cookie.set('piece', 'queen');
  }

  assignKing() {
    this.cookie.set('piece', 'king');
  }

  assignCapture() {
    this.cookie.set('piece', 'capture');
  }

  assignProtection() {
    this.cookie.set('piece', 'protection');
  }

  assignCombat() {
    this.cookie.set('piece', 'combat');
  }

  assignCheckInOne() {
    this.cookie.set('piece', 'check in one');
  }

  assignOutOfCheck() {
    this.cookie.set('piece', 'out of check');
  }

  assignMateInOne() {
    this.cookie.set('piece', 'mate in one');
  }

  assignBoardSetup() {
    this.cookie.set('piece', 'board setup');
  }

  assignCastling() {
    this.cookie.set('piece', 'castling');
  }

  assignEnPassant() {
    this.cookie.set('piece', 'en passant');
  }

  assignStalemate() {
    this.cookie.set('piece', 'stalemate');
  }

  assignPieceValue() {
    this.cookie.set('piece', 'piece value');
  }

  assignCheckInTwo() {
    this.cookie.set('piece', 'check in two');
  }
}
