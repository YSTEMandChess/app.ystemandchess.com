import { Component, OnInit } from '@angular/core';
import { Move, MoveIndexes } from './board-analyzer.model';
import { environment } from 'src/environments/environment';

declare var ChessBoard:any;
declare var Chess:any;

@Component({
  selector: 'app-board-analyzer',
  templateUrl: './board-analyzer.component.html',
  styleUrls: ['./board-analyzer.component.scss']
})

export class BoardAnalyzerComponent implements OnInit {

  private board;
  private chess;
  private level: number = 10;
  private centipawn: string = "0";
  private principleVariation: Array<String>;
  private prevFEN: String =
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

  // Plies is an array of Moves
  // Moves contain up to two Move Objects
  public plies: Array<Array<Move>> = [];
  public currMove: Move    // Current move one the board

  //debounce functions
  public depthDebounce = this.debounce(this.onDepthInput.bind(this));

  constructor() {}

  ngOnInit(): void {
    this.chess = Chess();
    
    var config = {
      pieceTheme: '../chessclient/img/chesspieces/wikipedia/{piece}.png',
      draggable: true,
      position: 'start',
      onDrop: this.onDrop.bind(this),
      onSnapEnd: this.onSnapEnd.bind(this)

    }
    this.board = ChessBoard('board', config);
    this.updateEngineEvaluation();
  }

  //get the evaluation from the engine and update the screen
  private updateEngineEvaluation() {
    this.httpGetAsync(
      `${environment.urls.stockFishURL}/?info=${"true"}&level=${this.level}&fen=${this.chess.fen()}`,
      (response) => {
        this.parseStockfish(response);
        this.updateCentiPawnEval();
      }
    );
  }
    
  private httpGetAsync(theUrl: string, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    };
    xmlHttp.open('POST', theUrl, true); // true for asynchronous
    xmlHttp.send(null);
  }

  //Obtian the centipawn value and principle variation form
  //the stockfish server response
  private parseStockfish(str: string) {
    var res: Array<string> = JSON.parse(str);    
    var split = res[res.length -2].split(" ");

    if (split.indexOf("mate") != -1) {
      this.centipawn = "M" + parseInt(split[split.indexOf("mate") + 1]);
    } else {
        var value: number = parseInt(split[split.indexOf("cp") + 1])/100;
        value = this.chess.turn() == "b" ? value * -1 : value;
        var sign: string = value < 0 ? "" : "+";

        this.centipawn = sign + value;
    }
    this.principleVariation = split.slice(split.indexOf("pv") + 1, split.length - 2);    
  }

  //Display centipawn value and change the evaluation bar accoridngly
  private updateCentiPawnEval() {
    document.getElementById("centipawn-value").innerText = this.centipawn;

    //In %
    var maxCpRange: number = 20;
    var maxBarRange: number = 95;
    var CpToHeightRatiio = maxBarRange/maxCpRange;

    document.getElementById("centipawn-inner").style.height = 
    Math.min(Math.max(( 50 + parseFloat(this.centipawn) * CpToHeightRatiio), 100 - maxBarRange), 100) + "%";
    
    var formatPV: String = "";
    var i = 0;
    var j = 1;

    if (this.chess.turn() == "b") {
      formatPV = "1... " + this.principleVariation[0] + " ";
      i = 1;
      j = 2;
    }

    for (i; i < this.principleVariation.length; i += 2) {
      formatPV += j.toString() + ". " + this.principleVariation[i] + " ";
      if (i + 1 < this.principleVariation.length) {
        formatPV += this.principleVariation[i + 1] + " ";
      }
      j ++;
    }

    var PV = document.getElementById("principle-variation");
    PV.innerText = formatPV.toString();
  }

  private onDrop(source, target) {
    // see if the move is legal    
    var move = this.chess.move({
      from: source,
      to: target,
      promotion: 'q'
    });
  
    // illegal move
    if (move === null) return 'snapback';

    this.updateMoveList(move);
    
    this.httpGetAsync(
      `${environment.urls.stockFishURL}/?info=${"true"}&level=${this.level}&fen=${this.prevFEN}&move=${source+target}`,
      (response) => {
        this.parseStockfish(response);
        this.updateCentiPawnEval();
      }
    );

    this.prevFEN = this.chess.fen();
  }

  private onSnapEnd() {
    this.board.position(this.chess.fen())
  }
  

  public debounce(callback, wait = 500) {
    var timerId;

    return () => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback();
      }, wait);
    };
  }
  
  //validate depth input and update the evaluation
  private onDepthInput() {
    var maxDepth = 20;
    var minDepth = 10;

    if (this.level < minDepth || typeof this.level != 'number') {
      this.level = minDepth;
      this.updateEngineEvaluation();
      return;
    }

    if ( this.level > maxDepth) {
      this.level = maxDepth;
      this.updateEngineEvaluation();
      return;
    }

    this.updateEngineEvaluation();
  }

  //@move-Move object returned by chess.js move method
  //Add a move object consisting of the move in SAN and the FEN
  //Add move to curr ply or create a new ply
  private updateMoveList(move) {
    var currPly = this.plies[this.plies.length - 1]
    var movesPerPly = 2;
    var moveObj: Move = {
      move: move.san,
      indexes: !currPly ? { pIndex: 0, mIndex: 0 } : this.getNextMoveIndex(this.currMove.indexes),
      fen: this.chess.fen()
    }

    if (!currPly) {
      this.plies.push([moveObj]);
      this.currMove = moveObj;
      return;
    }


    // If the new move would overwrite an existing move
    // then delete all moves from the existing move onward
    // unless the new move is the same as the existing move
    if (this.currMove != currPly[currPly.length - 1]) {
      var nextMoveIndexes = this.getNextMoveIndex(this.currMove.indexes);
      var nextMove = this.plies[nextMoveIndexes.pIndex][nextMoveIndexes.mIndex];

      if(JSON.stringify(nextMove) === JSON.stringify(moveObj)) {
        this.currMove = nextMove;
        return;
      }

      for (var i = this.plies.length - 1; i >= 0; i--) {
        var found: boolean = false;
        for (var j = 1; j >= 0; j--) {
          if (this.plies[i][j] != this.currMove) {
            this.plies[i].pop();
          } else {
            found = true;
            currPly = this.plies[this.plies.length - 1];
            break;
          }
        }
        if (found) break;
        this.plies.pop();
      }
    }

    this.currMove = moveObj;

    if (!currPly[movesPerPly - 1]) {
      this.plies[this.plies.length - 1].push(moveObj);
      return
    }

    this.plies.push([moveObj]);
  }

  private getLastMoveIndexes(): MoveIndexes {
    var numPly = this.plies.length - 1;
    var moveObj: MoveIndexes = {
      pIndex: numPly,
      mIndex: this.plies[numPly].length - 1
    }
    return moveObj;
  }

  private getNextMoveIndex(moveIndexes: MoveIndexes): MoveIndexes {
    var nextMoveIndexes: MoveIndexes = {
      pIndex: moveIndexes.pIndex,
      mIndex: moveIndexes.mIndex
    };
    if (moveIndexes.mIndex == 0) {
      nextMoveIndexes.mIndex++;
    } else {
      nextMoveIndexes.pIndex++;
      nextMoveIndexes.mIndex = 0;
    }
    return nextMoveIndexes;
  }


  //@move-Movelist move object
  public setMove(move) {
    this.chess.load(move.fen);
    this.board.position(move.fen);
    this.currMove = move;
    this.updateEngineEvaluation();    
  }
}
