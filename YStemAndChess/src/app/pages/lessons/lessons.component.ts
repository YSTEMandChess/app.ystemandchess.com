import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {

  constructor(private cookie: CookieService) { }

  ngOnInit(): void {
    if(this.cookie.check('piece')) {
      this.cookie.delete('piece');
    }
  }

  assignPawn() {
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

}
