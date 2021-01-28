import { Component, OnInit } from '@angular/core';

declare var ChessBoard:any;

@Component({
  selector: 'app-board-editor',
  templateUrl: './board-editor.component.html',
  styleUrls: ['./board-editor.component.scss']
})
export class BoardEditorComponent implements OnInit {

  private board;
  private useAnimation:boolean = false;

  constructor() {     
  }

  ngOnInit(): void {
    var config = {
      pieceTheme: '../chessclient/img/chesspieces/wikipedia/{piece}.png',
      draggable: true,
      dropOffBoard: 'trash',
      position: 'start',
      sparePieces: true
    }
    this.board = ChessBoard('board', config);
    window.addEventListener('resize', this.board.resize);
  }

  public flipBoard() {
    this.board.flip();
  }

  public clearBoard() {
    this.board.clear(this.useAnimation);
  }

  public startPosition() {
    this.board.start(this.useAnimation);
  }
  
}
