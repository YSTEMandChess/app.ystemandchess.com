import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { AgoraService } from 'src/app/agora.service';
import { Chess } from 'src/app/models/Chess';
import { environment } from 'src/environments/environment';
import { SocketService } from '../../services/socket/socket.service';

//import * as JitsiMeetExternalAPI from "../../../../src/assets/external_api.js";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {
  chessSrc;
  chess: Chess;
  userContent = '';
  rotated = false;

  constructor(
    private cookie: CookieService,
    private socket: SocketService,
    private sanitization: DomSanitizer,
    private as: AgoraService
  ) {}

  async ngOnInit() {
    this.chessSrc = await this.sanitization.bypassSecurityTrustResourceUrl(
      environment.urls.chessClientURL
    );
    this.chess = await new Chess('chessBd', false);

    //this.as.videoOn('local_stream', 'remote_stream');

    if (this.cookie.check('login')) {
      this.userContent = JSON.parse(
        atob(this.cookie.get('login').split('.')[1])
      );
    }
  }
  undoPrevMove() {
    this.chess.undoPrevMove();
  }
  newGame() {
    this.chess.flipBoard();
  }

  /*
    this.socket.listen('gameOver').subscribe((data) => {
      alert('game over ');
    });
  /*
 
    this.socket.emitMessage(
      'flipBoard',
      JSON.stringify({ username: this.userContent.username })
    );
  private sendFromQueue() {
    this.messageQueue.forEach((element) => {
      let newData = JSON.parse(<string>element);
      var chessBoard = (<HTMLFrameElement>document.getElementById('chessBd'))
        .contentWindow;
      chessBoard.postMessage(
        JSON.stringify({
          boardState: newData.boardState,
          color: newData.color,
        }),
        environment.urls.chessClientURL
      );
    });
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

  public flipBoard() {
    let userContent = JSON.parse(atob(this.cookie.get('login').split('.')[1]));
    this.socket.emitMessage(
      'flipBoard',
      JSON.stringify({ username: userContent.username })
    );
  }

  public updateBoardState(data) {
    let userContent = JSON.parse(atob(this.cookie.get('login').split('.')[1]));
    this.socket.emitMessage(
      'newState',
      JSON.stringify({ boardState: data, username: userContent.username })
    );
  }

  public createNewGame() {
    let userContent = JSON.parse(atob(this.cookie.get('login').split('.')[1]));
    this.socket.emitMessage(
      'createNewGame',
      JSON.stringify({ username: userContent.username })
    );
  }

  public gameOverAlert() {
    let userContent = JSON.parse(atob(this.cookie.get('login').split('.')[1]));
    this.socket.emitMessage(
      'gameOver',
      JSON.stringify({ username: userContent.username })
    );
  }
  */
}
