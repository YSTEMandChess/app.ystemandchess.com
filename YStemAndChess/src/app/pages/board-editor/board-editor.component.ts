import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-board-editor',
  templateUrl: './board-editor.component.html',
  styleUrls: ['./board-editor.component.scss']
})
export class BoardEditorComponent implements OnInit {

  private messageQueue = new Array();
  private isReady = true;

  constructor() { }

  ngOnInit(): void {
    var eventMethod = window.addEventListener
      ? 'addEventListener'
      : 'attachEvent';
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';
    eventer(
      messageEvent,
      async (e) => {
        this.sendFlagToChessBoard();
        if (e.origin == environment.urls.chessClientURL) {
          //child window has loaded and can now recieve data
          if (e.data == 'ReadyToRecieve') {
            console.log("Recieved");
            
            this.isReady = true;
            this.sendFromQueue();
          }
        }
      },
      false
    );
    
  }

  private sendFromQueue() {
    this.messageQueue.forEach((element) => {
      var chessBoard = (<HTMLFrameElement>document.getElementById('chessBd'))
        .contentWindow;
      chessBoard.postMessage(element, environment.urls.chessClientURL);
    });
  }

  //Tell the chessboard that it is a board-editor
  private sendFlagToChessBoard() {
    var chessBoard: Window = (<HTMLIFrameElement>document.getElementById('chessBd')).contentWindow;    
      chessBoard.postMessage(JSON.stringify({
        boardEditorFlag: true,
    }), environment.urls.chessClientURL);
  }

}
