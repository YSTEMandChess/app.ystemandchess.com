import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

export class Chess {
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
    eventer(
      messageEvent,
      (e) => {
        this.chessBoard = (<HTMLFrameElement>(
          document.getElementById(this.frameId)
        )).contentWindow;
        if (typeof e.data === 'object') return;

        const isDataAFen = e.data.indexOf('/') > -1;
        const info = this.dataTransform(e.data);
        const msg = this.createAmessage(info, this.color);
        this.chessBoard.postMessage(msg, environment.urls.chessClientURL);
        if (e.data.indexOf('p') === -1 && isDataAFen) {
          setTimeout(() => {
            Swal.fire('Lesson completed', 'Good Job', 'success');
            this.newGameInit('8/8/8/8/8/8/8/8 w - - 0 1');
          }, 200);
        }
      },

      false
    );
  }

  public newGameInit(FEN: string) {
    this.stopTheGameFlag = false;
    const msg = this.createAmessage(FEN, this.color);
    this.chessBoard.postMessage(msg, environment.urls.chessClientURL);
  }

  private dataTransform(data) {
    if (data === 'ReadyToRecieve') data = '8/8/8/8/8/8/8/8 w - - 0 1';
    if (data.split('/')[7]) {
      let laststring = data.split('/')[7].split(' ');
      laststring[1] = 'w';
      laststring[2] = '-';
      laststring[3] = '-';
      laststring[4] = '0';
      laststring[5] = '1';
      laststring = laststring.join(' ');
      let tranfomed = data.split('/');
      tranfomed[7] = laststring;
      return tranfomed.join('/');
    }
    return data;
  }

  private createAmessage(fen: String, color: string) {
    return JSON.stringify({
      boardState: fen,
      color: color,
      lessonFlag: this.isLesson,
    });
  }
}
