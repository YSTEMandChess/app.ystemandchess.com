import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { SocketService } from './../../socket.service';

@Component({
  selector: 'app-newpage',
  templateUrl: './newpage.component.html',
  styleUrls: ['./newpage.component.scss'],
})
export class NewpageComponent implements OnInit {
  level;
  currentFEN;
  messageQueue;
  color;
  constructor(private socket: SocketService) {
    this.level = 1;
    this.currentFEN =
      'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1';
    this.messageQueue = [];
    this.color = 'white';
  }

  ngOnInit(): void {
    this.httpGetAsync(
      `${environment.urls.chessClientURL}/?level=${this.level}&fen=${this.currentFEN}`,
      (response) => {
        if (true) {
          var chessBoard = (<HTMLFrameElement>(
            document.getElementById('chessBd')
          )).contentWindow;
          chessBoard.postMessage(
            JSON.stringify({ boardState: response, color: this.color }),
            environment.urls.chessClientURL
          );
        }
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

  private sendFromQueue() {
    this.messageQueue.forEach((element) => {
      console.log('sending message ' + element);
      var chessBoard = (<HTMLFrameElement>document.getElementById('chessBd'))
        .contentWindow;
      chessBoard.postMessage(element, environment.urls.chessClientURL);
    });
  }
}
