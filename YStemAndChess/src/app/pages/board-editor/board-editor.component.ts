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
  private shortfen: string;
  public longFen: string;

  constructor() {     
  }

  ngOnInit(): void {
    var config = {
      pieceTheme: '../../../assets/images/chessPieces/wikipedia/{piece}.png',
      draggable: true,
      dropOffBoard: 'trash',
      onChange: this.onChange.bind(this),
      position: 'start',
      sparePieces: true
    }
    this.board = ChessBoard('board', config);
    this.setFens(this.board.fen());

    window.addEventListener('resize', this.board.resize);
  }

  public flipBoard() {
    this.board.flip();
  }

  public clearBoard() {
    this.board.clear(this.useAnimation);
    this.setFens(this.board.fen());
  }

  public startPosition() {
    this.board.start(this.useAnimation);
    this.setFens(this.board.fen());
  }

  public onFenChange() {
    this.board.position(this.longFen);
  }

  private onChange (oldPos, newPos) {
    this.setFens(ChessBoard.objToFen(newPos));
  }

  private setFens(fen: string) {
    this.shortfen = fen;
    this.longFen = this.shortfen + " w KQkq - 0 1";
  }
}
