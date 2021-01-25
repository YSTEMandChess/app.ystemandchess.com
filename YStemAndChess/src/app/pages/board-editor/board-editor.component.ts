import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-board-editor',
  templateUrl: './board-editor.component.html',
  styleUrls: ['./board-editor.component.scss']
})
export class BoardEditorComponent implements OnInit {

  public board

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
  }

  public flipBoard() {
    this.board.flip();
  }
  
}
