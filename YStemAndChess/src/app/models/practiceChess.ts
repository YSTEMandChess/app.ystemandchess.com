import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

export class PracticeChess {
  chessBoard;
  color: string;

  constructor(private frameId: string, private isLesson: boolean) {
    this.practiceGame();
  }

  private practiceGame() {
    var eventMethod = window.addEventListener
      ? 'addEventListener'
      : 'attachEvent';
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';

    eventer(
      messageEvent,
      (e) => {
        console.log('e: ', e);
        this.chessBoard = (<HTMLFrameElement>(
          document.getElementById(this.frameId)
        )).contentWindow;
        const info = e.data;
        const msg = this.createAmessage(info, this.color);
        this.chessBoard.postMessage(msg, environment.urls.chessClientURL);
      },

      false
    );
  }
  public newGameInit(FEN: string) {
    console.log('FEN: ', FEN);
    const msg = this.createAmessage(FEN, this.color);
    console.log('msg: ', msg);
    this.chessBoard.postMessage(msg, environment.urls.chessClientURL);
  }
  private createAmessage(fen: String, color: string) {
    console.log('color: ', color);
    console.log('fen: ', fen);
    return JSON.stringify({
      boardState: fen,
      color: color,
      lessonFlag: this.isLesson,
    });
  }
}
