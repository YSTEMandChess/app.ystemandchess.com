import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

declare var ChessBoard:any;

@Component({
  selector: 'app-board-analyzer',
  templateUrl: './board-analyzer.component.html',
  styleUrls: ['./board-analyzer.component.scss']
})
export class BoardAnalyzerComponent implements OnInit {

  private board;
  private useAnimation: boolean = false;
  private level: number = 7;
  private currentFEN: String = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  private centipawn: number = 0;
  private principleVariation: string;

  constructor() { }

  ngOnInit(): void {
    var config = {
      pieceTheme: '../chessclient/img/chesspieces/wikipedia/{piece}.png',
      draggable: true,
      position: 'start',
    }
    this.board = ChessBoard('board', config);
    window.addEventListener('resize', this.board.resize);
    this.httpGetAsync(
      `${environment.urls.stockFishURL}/?info=${"true"}&level=${this.level}&fen=${this.currentFEN}`,
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
  private parseStockfish(str) {
    var split = str.split(" ");    
    var cpIndex = split.indexOf("cp");

    this.centipawn = split[cpIndex + 1];
    this.principleVariation = split.slice(split.indexOf("pv") + 1, split.length - 2);    
  }

  //Display centipawn value and change the evaluation bar accoridngly
  private updateCentiPawnEval() {
    var formatCP = (this.centipawn/100 <0 ? "-" : "+" ) + this.centipawn/100;

    document.getElementById("centipawn-value").innerText = formatCP;

    var maxCpRange: number = 20;
    var CpToHeightRatiio = 100/maxCpRange;

    document.getElementById("centipawn-inner").style.height = ( 50 + this.centipawn/100 * CpToHeightRatiio) + "%";

  }
}
