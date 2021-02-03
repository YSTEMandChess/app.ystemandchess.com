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
  private level: number = 12;
  private centipawn: number = 0;
  private principleVariation: Array<String>;
  private prevFEN: String =
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  private turn: number = 1;
  private color: String = "white";

  constructor() {}

  ngOnInit(): void {
    this.chess = Chess();
    
    var config = {
      pieceTheme: '../chessclient/img/chesspieces/wikipedia/{piece}.png',
      draggable: true,
      position: 'start',
      onDrop: this.onDrop.bind(this)
    }
    this.board = ChessBoard('board', config);
    window.addEventListener('resize', this.board.resize);
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
      this.centipawn = parseInt(split[split.indexOf("mate") + 1]);
    } else {
        this.centipawn = parseInt(split[split.indexOf("cp") + 1]);
        if (this.color == "black") {
          this.centipawn *= -1;
        }
    }
    this.principleVariation = split.slice(split.indexOf("pv") + 1, split.length - 2);    
  }

  //Display centipawn value and change the evaluation bar accoridngly
  private updateCentiPawnEval() {
    var formatCP = (this.centipawn/100 < 0 ? "" : "+" ) + this.centipawn/100;
    if(this.centipawn)

    document.getElementById("centipawn-value").innerText = formatCP;

    var maxCpRange: number = 20;
    var CpToHeightRatiio = 100/maxCpRange;

    document.getElementById("centipawn-inner").style.height = ( 50 + this.centipawn/100 * CpToHeightRatiio) + "%";
    
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
}
