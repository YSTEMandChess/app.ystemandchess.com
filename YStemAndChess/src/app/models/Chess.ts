import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

export class Chess {
  stopTheGameFlag: boolean;
  color: string;
  chessBoard;
  moves: string[] = [];

  constructor(private frameId: string, private isLesson: boolean) {
    this.chessBoard = (<HTMLFrameElement>(
      document.getElementById(this.frameId)
    )).contentWindow;
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
        console.log({ data: e.data });

        if (!e || typeof e.data === 'object' || !e.data || this.stopTheGameFlag)
          return;
        if (e.data === '8/8/8/8/8/8/8/8 w - - 0 1') return;

        const isDataAFen = e.data.indexOf('/') > -1;
        if (isDataAFen) this.moves.push(e.data);
        const info = this.isLesson ? this.dataTransform(e.data) : e.data;
        const msg = this.createAmessage(info, this.color);
        this.chessBoard.postMessage(msg, environment.urls.chessClientURL);

        if (this.isLesson) {
          this.lessonOver(e, isDataAFen);
        } else if (!isDataAFen) {
          this.gameOver(e.data);
        }
      },

      false
    );
  }

  public newGameInit(FEN?: string) {
    const msg = this.createAmessage(FEN, this.color);
    if (FEN) {
      this.chessBoard.postMessage(msg, environment.urls.chessClientURL);
      this.stopTheGameFlag = false;
    }
  }

  public undoPrevMove() {
    this.newGameInit(this.moves[this.moves.length - 2]);
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

  private lessonOver(e: any, isDataAFen: boolean) {
    if (e.data.indexOf('p') === -1 && isDataAFen) {
      this.stopTheGameFlag = true;

      setTimeout(() => {
        Swal.fire('Lesson completed', 'Good Job', 'success');
        this.newGameInit();
      }, 200);
    }
  }

  private gameOver(condition) {
    if (condition != 'ReadyToRecieve' && condition != 'gameOver') {
      this.stopTheGameFlag = true;
      setTimeout(() => {
        Swal.fire(condition, 'Good Job', 'success');
      }, 200);
      this.newGameInit();
    }
  }
}
