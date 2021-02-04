import { Component, OnInit } from '@angular/core';
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
  private useAnimation: boolean = false;
  private level: number = 10;
  private centipawn: string = "0";
  private principleVariation: Array<String>;
  private prevFEN: String =
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  private turn: number = 1;
  private color: String = "white";

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
    console.log(res[res.length -2]);
    
    var split = res[res.length -2].split(" ");

    if (split.indexOf("mate") != -1) {
      this.centipawn = "M" + parseInt(split[split.indexOf("mate") + 1]);
    } else {
        var value: number = parseInt(split[split.indexOf("cp") + 1])/100;
        value = this.color == "black" ? value * -1 : value;
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

    if (this.color == "black") {
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

    this.httpGetAsync(
      `${environment.urls.stockFishURL}/?info=${"true"}&level=${this.level}&fen=${this.prevFEN}&move=${source+target}`,
      (response) => {
        this.parseStockfish(response);
        this.updateCentiPawnEval();
      }
    );

    this.prevFEN = this.chess.fen();
    this.color = this.color == "white" ? "black" : "white";
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
}
