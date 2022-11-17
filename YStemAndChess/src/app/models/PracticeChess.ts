import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

export class PracticeChess {
  stopTheGameFlag: boolean;
  color: string;
  chessBoard;

  constructor(private frameId: string, private isLesson: boolean) {
    this.preGame();
  }

  private preGame() {
    var eventMethod = window.addEventListener
      ? 'addEventListener'
      : 'attachEvent';
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';

    // Listen to message from child window
    eventer(messageEvent, (e) => {
      this.chessBoard = (<HTMLFrameElement>(
          document.getElementById(this.frameId)
          )).contentWindow;
        });
        console.log(' this.chessBoard: ',  this.chessBoard);
  }
  public newGameInit(FEN: string) {
    this.stopTheGameFlag = false;
    const msg = this.createAmessage(FEN, this.color);
    this.chessBoard.postMessage(msg, environment.urls.chessClientURL);
  }
  private createAmessage(fen: String, color: string) {
    return JSON.stringify({
      boardState: fen,
      color: color,
      lessonFlag: this.isLesson,
    });
  }
}
