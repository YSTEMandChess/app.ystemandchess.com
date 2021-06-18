import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  public level: number = 10;
  public startFen: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  public currFen: string = this.startFen;
  private centipawn: string = "0";
  private principleVariation: Array<String>;

  // Plies is an array of Moves
  // Moves contain up to two Move Objects
  public plies: Array<Array<Move>> = [];
  public currMove: Move    // Current move on the board

  //debounce functions
  public depthDebounce = this.debounce(this.onDepthInput.bind(this));

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['fen']) {
        this.startFen = params['fen'];
        this.currFen = this.startFen;
      }
    })
    this.chess = Chess(this.startFen);
    var config = {
      pieceTheme: '../../../assets/images/chessPieces/wikipedia/{piece}.png',
      draggable: true,
      position: this.startFen,
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
    var color: string;

    this.principleVariation = split.slice(split.indexOf("pv") + 1, split.length - 2);    

    if (split.indexOf("mate") != -1) {
      var turnsTillMate = parseInt(split[split.indexOf("mate") + 1]);
      turnsTillMate = this.chess.turn() == "b" ? turnsTillMate * -1 : turnsTillMate;
      
      color = turnsTillMate < 0 ? "b" : "w";
      if (turnsTillMate == 0 ) {
        this.centipawn = "-"
      } else {
        this.centipawn = "#" + Math.abs(turnsTillMate);
      }
    } else {
        var value: number = parseInt(split[split.indexOf("cp") + 1])/100;
        value = this.chess.turn() == "b" ? value * -1 : value;
        var sign: string = value < 0 ? "" : "+";

        this.centipawn = sign + value;
    }
    this.updateCentiPawnEval(color);
  }

  //Display centipawn value and change the evaluation bar accoridngly
  private updateCentiPawnEval(color: string) {
    document.getElementById("centipawn-value").innerText = this.centipawn;

    //In %
    var maxCpRange: number = 20;
    var maxBarRange: number = 95;
    var CpToHeightRatiio = maxBarRange/maxCpRange;
    var evalBar = document.getElementById("centipawn-inner");

    if (this.centipawn[0] == "#") {
      if ( color == "b" ) {
        evalBar.style.height = 0 + "%";
      } else {
        evalBar.style.height = 100 + "%"
      }
    } else {
      evalBar.style.height = Math.min(Math.max(( 50 + parseFloat(this.centipawn) * CpToHeightRatiio), 100 - maxBarRange), 100) + "%";
    }
    
    var PV = document.getElementById("principle-variation");
    var formatPV: String = "";
    var i = 0;
    var j = 1;

    if(this.chess.game_over()) {
      PV.innerText = "";      
      return;
    }

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

    this.currFen = this.chess.fen();
    this.updateMoveList(move);
    this.updateEngineEvaluation();
    
    var moveAudioSrc = "../../../assets/audio/move.ogg";
    var captureAudioSrc = "../../../assets/audio/capture.ogg"
    var slideAudioSrc = "../../../assets/audio/slider.ogg"

    if (move.captured || this.chess.in_check()) {
      this.playAudio(captureAudioSrc);
      return;
    }

    if (move.san == "O-O" || move.san == "O-O-O") {
      this.playAudio(slideAudioSrc);
    }

    this.playAudio(moveAudioSrc);
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
      indexes: !this.currMove ? { pIndex: 0, mIndex: 0 } : this.getNextMoveIndex(this.currMove.indexes),
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
      if (!this.currMove) {
        if (JSON.stringify(moveObj) === JSON.stringify(this.plies[0][0])) {
          this.currMove = this.plies[0][0];
          return;
        }
        this.plies = [[moveObj]];
        this.currMove = moveObj;
        return;
      }
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

  private getPrevMoveIndex(moveIndexes: MoveIndexes): MoveIndexes {
    if (moveIndexes.pIndex == 0 && moveIndexes.mIndex == 0) {
      return moveIndexes;
    }

    var prevMoveIndexes: MoveIndexes = {
      pIndex: moveIndexes.pIndex,
      mIndex: moveIndexes.mIndex
    };
    if (moveIndexes.mIndex == 0) {
      prevMoveIndexes.pIndex--;
      prevMoveIndexes.mIndex = 1;
    } else {
      prevMoveIndexes.mIndex = 0;
    }
    return prevMoveIndexes;
  }

  //@move-Movelist move object
  public setMove(move) {
    if(!move) {
      return
    }
    this.chess.load(move.fen);
    this.board.position(move.fen);
    this.currMove = move;
    this.updateEngineEvaluation();    
  }

  public startPosition() {
    this.board.position(this.startFen);
    this.chess.load(this.startFen);
    this.currMove = null;
    this.updateEngineEvaluation()
    this.currFen = this.startFen;
  }

  public lastPosition() {
    var lastPly = this.plies[this.plies.length - 1];
    var lastMove = lastPly[lastPly.length - 1];

    this.setMove(lastMove);
    this.currFen = lastMove.fen;
  }

  public nextPosition() {
    if (this.plies.length == 0) {
      return;
    }

    if (!this.currMove) {
      this.setMove(this.plies[0][0]);
      this.currFen = this.plies[0][0].fen;
      return
    }

    var lastPly = this.plies[this.plies.length - 1];
    var lastMove = lastPly[lastPly.length - 1];

    if (this.currMove == lastMove) {
      return;
    }

    var nextMoveIndexes = this.getNextMoveIndex(this.currMove.indexes);
    var nextMove = this.plies[nextMoveIndexes.pIndex][nextMoveIndexes.mIndex];
    this.setMove(nextMove);
    this.currFen = nextMove.fen;
  }

  public prevPosition() {
    if (this.plies.length == 0) {
      return;
    }

    if (!this.currMove) {
      return
    }

    if (this.currMove == this.plies[0][0]) {
      this.startPosition();
      return;
    }

    var prev: Move;

    var prevMoveIndexes = this.getPrevMoveIndex(this.currMove.indexes);
    var prevMove = this.plies[prevMoveIndexes.pIndex][prevMoveIndexes.mIndex];
    this.setMove(prevMove);
    this.currFen = prevMove.fen;
  }

  public flipBoard() {
    this.board.flip();
  }

  private playAudio(src: string){
    let audio = new Audio();
    audio.src = src;
    audio.load();
    audio.play();
  }

  public onFenChange() {
    this.startFen = this.currFen;
    this.chess.load(this.startFen);
    this.board.position(this.startFen);
    this.plies = [];
    this.currMove = null;
  }
}
