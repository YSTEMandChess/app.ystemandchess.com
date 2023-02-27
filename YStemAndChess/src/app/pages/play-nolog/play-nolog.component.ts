import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-play-nolog',
  templateUrl: './play-nolog.component.html',
  styleUrls: ['./play-nolog.component.scss'],
})
export class PlayNologComponent implements OnInit {
  private messageQueue = new Array();
  private isReady: boolean;
  private color: String = 'white';
  private level: number = 5;
  public chessSrc;
  isStepLast;
  currentStep;
  isNearBottom;
  scrollContainer;
  public move;
  displayMoves = [];
  public pieceImage;
  newGameId: any;
  FEN;
  private currentFEN: String =
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  private prevFEN: String = this.currentFEN;

  constructor(private sanitization: DomSanitizer) {
    this.chessSrc = sanitization.bypassSecurityTrustResourceUrl(
      environment.urls.chessClientURL
    );
  }
  @ViewChild('scrollframe', { static: false }) scrollFrame: ElementRef;

  ngOnInit(): void {
    var eventMethod = window.addEventListener
      ? 'addEventListener'
      : 'attachEvent';
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';
    this.httpGetAsync(
      `${environment.urls.middlewareURL}/meetings/storeMoves`,
      (response) => {
        let result = JSON.parse(response);
        this.newGameId = result.gameId;
      }
    );

    // Listen to message from child window
    eventer(
      messageEvent,
      (e) => {
        console.log('e: ', e);
        // Means that there is the board state and whatnot

        if (environment.productionType === 'development') {
          if (e.origin == environment.urls.chessClientURL) {
            this.prevFEN = this.currentFEN;
            let info = e.data;
            const temp = info.split(':');
            const piece = info.split('-');
            if (info == 'ReadyToRecieve') {
              this.isReady = true;
              this.sendFromQueue();
            } else if (temp?.length > 1 && temp[0] === 'target') {
              this.move = temp[1];
            } else if (piece?.length > 1 && piece[0] === 'piece') {
              this.pieceImage = piece[1];
            } else if (typeof info !== 'object' && info && info !== 'draw') {
              this.currentFEN = info;
              this.level = parseInt(
                (<HTMLInputElement>document.getElementById('movesAhead')).value
              );
              if (this.level <= 1) this.level = 1;
              else if (this.level >= 30) this.level = 30;
              this.httpGetAsync(
                `${environment.urls.middlewareURL}/meetings/storeMoves?gameId=${this.newGameId}&fen=${this.currentFEN}&pos=${this.move}&image=${this.pieceImage}`,
                (response) => {
                  response = JSON.parse(response);
                  let finalMove =
                    response.moves.length > 0
                      ? response.moves[response.moves.length - 1]
                      : response.moves;
                  this.displayMoves = finalMove || [];
                  this.scrollToBottom();
                  setTimeout(() => {
                    this.getMovesList();
                    setTimeout(() => {
                      this.scrollToBottom();
                    }, 500);
                  }, 1000);
                  if (response) {
                    this.httpGetAsync(
                      `${environment.urls.stockFishURL}/?level=${this.level}&fen=${this.currentFEN}`,
                      (response) => {
                        console.log('response from stockfish: ', response);
                        var fen = response.split(' move:')[0];
                        var move = response.split(' move:')[1].slice(0, 2);
                        var pos = response.split('target:')[1];
                        if (this.isReady) {
                          var chessBoard = (<HTMLFrameElement>(
                            document.getElementById('chessBd')
                          )).contentWindow;
                          chessBoard.postMessage(
                            JSON.stringify({
                              boardState: fen,
                              color: this.color,
                            }),
                            environment.urls.chessClientURL
                          );
                          this.httpGetAsync(
                            `${environment.urls.middlewareURL}/meetings/storeMoves?gameId=${this.newGameId}&fen=${fen}&pos=${pos}&image=${move}`,
                            (response) => {
                              response = JSON.parse(response);
                              let finalMove =
                                response.moves.length > 0
                                  ? response.moves[response.moves.length - 1]
                                  : response.moves;
                              this.displayMoves = finalMove || [];
                              this.scrollToBottom();
                              setTimeout(() => {
                                this.getMovesList();
                                setTimeout(() => {
                                  this.scrollToBottom();
                                }, 500);
                              }, 1000);
                            }
                          );
                        } else {
                          this.messageQueue.push(
                            JSON.stringify({
                              boardState: fen,
                              color: this.color,
                            })
                          );
                        }
                        this.currentFEN = response;
                      }
                    );
                  }
                }
              );
            }
          } else {
            console.log('chessClientURL Missmatch.');
          }
        } else {
          if (e.origin != environment.urls.chessClientURL) {
            this.prevFEN = this.currentFEN;
            let info = e.data;
            const temp = info.split(':');
            const piece = info.split('-');
            if (info == 'ReadyToRecieve') {
              this.isReady = true;
              this.sendFromQueue();
            } else if (temp?.length > 1 && temp[0] === 'target') {
              this.move = temp[1];
            } else if (piece?.length > 1 && piece[0] === 'piece') {
              this.pieceImage = piece[1];
            } else if (typeof info !== 'object' && info && info !== 'draw') {
              this.currentFEN = info;
              this.level = parseInt(
                (<HTMLInputElement>document.getElementById('movesAhead')).value
              );
              if (this.level <= 1) this.level = 1;
              else if (this.level >= 30) this.level = 30;
              this.httpGetAsync(
                `${environment.urls.middlewareURL}/meetings/storeMoves?gameId=${this.newGameId}&fen=${this.currentFEN}&pos=${this.move}&image=${this.pieceImage}`,
                (response) => {
                  response = JSON.parse(response);
                  let finalMove =
                    response.moves.length > 0
                      ? response.moves[response.moves.length - 1]
                      : response.moves;
                  this.displayMoves = finalMove || [];
                  this.scrollToBottom();
                  setTimeout(() => {
                    this.getMovesList();
                    setTimeout(() => {
                      this.scrollToBottom();
                    }, 500);
                  }, 1000);
                  if (response) {
                    this.httpGetAsync(
                      `${environment.urls.stockFishURL}/?level=${this.level}&fen=${this.currentFEN}`,
                      (response) => {
                        console.log('response from stockfish: ', response);
                        var fen = response.split(' move:')[0];
                        var move = response.split(' move:')[1].slice(0, 2);
                        var pos = response.split('target:')[1];
                        if (this.isReady) {
                          var chessBoard = (<HTMLFrameElement>(
                            document.getElementById('chessBd')
                          )).contentWindow;
                          chessBoard.postMessage(
                            JSON.stringify({
                              boardState: fen,
                              color: this.color,
                            }),
                            environment.urls.chessClientURL
                          );
                          this.httpGetAsync(
                            `${environment.urls.middlewareURL}/meetings/storeMoves?gameId=${this.newGameId}&fen=${fen}&pos=${pos}&image=${move}`,
                            (response) => {
                              response = JSON.parse(response);
                              let finalMove =
                                response.moves.length > 0
                                  ? response.moves[response.moves.length - 1]
                                  : response.moves;
                              this.displayMoves = finalMove || [];
                              this.scrollToBottom();
                              setTimeout(() => {
                                this.getMovesList();
                                setTimeout(() => {
                                  this.scrollToBottom();
                                }, 500);
                              }, 1000);
                            }
                          );
                        } else {
                          this.messageQueue.push(
                            JSON.stringify({
                              boardState: fen,
                              color: this.color,
                            })
                          );
                        }
                        this.currentFEN = response;
                      }
                    );
                  }
                }
              );
            }
          } else {
            console.log('chessClientURL Missmatch.');
          }
        }
      },
      false
    );
  }
  numberOnly(event): boolean {
    var data = (<HTMLInputElement>document.getElementById('movesAhead')).value;
    const charCode = event.which ? event.which : event.keyCode;
    if (data.length >= 2) {
      return false;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  private sendFromQueue() {
    this.messageQueue.forEach((element) => {
      var chessBoard = (<HTMLFrameElement>document.getElementById('chessBd'))
        .contentWindow;
      chessBoard.postMessage(element, environment.urls.chessClientURL);
    });
  }

  public refresh() {
    var frame = (<HTMLFrameElement>(
      document.getElementById('chessBd')
    )).getAttribute('src');
    this.httpGetAsync(
      `${environment.urls.middlewareURL}/meetings/getStoreMoves?gameId=${this.newGameId}`,
      (response) => {
        let getMoves = JSON.parse(response);
        let finalMove =
          getMoves.moves.length > 0
            ? getMoves.moves[getMoves.moves.length - 1]
            : getMoves.moves;
        this.displayMoves = finalMove || [];
        this.FEN = finalMove[finalMove.length - 1].fen;
        this.currentStep = finalMove.length > 0 ? finalMove.length - 1 : 0;

        setTimeout(() => {
          var chessBoard = (<HTMLFrameElement>(
            document.getElementById('chessBd')
          )).contentWindow;
          chessBoard.postMessage(
            JSON.stringify({ boardState: this.FEN, color: this.color }),
            environment.urls.chessClientURL
          );
        }, 1000);

        (<HTMLFrameElement>document.getElementById('chessBd')).setAttribute(
          'src',
          frame
        );
      }
    );
  }

  public newGameInit() {
    console.log('New game init called');
    this.httpGetAsync(
      `${environment.urls.middlewareURL}/meetings/newGameStoreMoves?gameId=${this.newGameId}`,
      (response) => {
        this.getMovesList();
      }
    );
    this.color = Math.random() > 0.5 ? 'white' : 'black';
    this.currentFEN =
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    this.prevFEN = this.currentFEN;
    var chessBoard = (<HTMLFrameElement>document.getElementById('chessBd'))
      .contentWindow;

    if (this.isReady) {
      var chessBoard = (<HTMLFrameElement>document.getElementById('chessBd'))
        .contentWindow;
      chessBoard.postMessage(
        JSON.stringify({ boardState: this.currentFEN, color: this.color }),
        environment.urls.chessClientURL
      );
    } else {
      this.messageQueue.push(
        JSON.stringify({ boardState: this.currentFEN, color: this.color })
      );
    }

    if (this.color === 'black') {
      this.level = parseInt(
        (<HTMLInputElement>document.getElementById('movesAhead')).value
      );
      if (this.level <= 1) this.level = 1;
      else if (this.level >= 10) this.level = 10;
      this.httpGetAsync(
        `${environment.urls.middlewareURL}/meetings/newGameStoreMoves?gameId=${this.newGameId}`,
        (response) => {
          if (response) {
            this.httpGetAsync(
              `${environment.urls.stockFishURL}/?level=${this.level}&fen=${this.currentFEN}`,
              (response) => {
                var fen = response.split(' move:')[0];
                var move = response.split(' move:')[1].slice(0, 2);
                var pos = response.split('target:')[1];
                if (this.isReady) {
                  var chessBoard = (<HTMLFrameElement>(
                    document.getElementById('chessBd')
                  )).contentWindow;
                  chessBoard.postMessage(
                    JSON.stringify({ boardState: fen, color: this.color }),
                    environment.urls.chessClientURL
                  );
                  this.httpGetAsync(
                    `${environment.urls.middlewareURL}/meetings/storeMoves?gameId=${this.newGameId}&fen=${fen}&pos=${pos}&image=${move}`,
                    (response) => {
                      response = JSON.parse(response);
                      let finalMove =
                        response.moves.length > 0
                          ? response.moves[response.moves.length - 1]
                          : response.moves;
                      this.displayMoves = finalMove || [];
                      this.scrollToBottom();
                      setTimeout(() => {
                        this.getMovesList();
                        setTimeout(() => {
                          this.scrollToBottom();
                        }, 500);
                      }, 1000);
                    }
                  );
                } else {
                  this.messageQueue.push(
                    JSON.stringify({ boardState: fen, color: this.color })
                  );
                }
              }
            );
          }
        }
      );
    }
  }

  public undoPrevMove() {
    this.httpGetAsync(
      `${environment.urls.middlewareURL}/meetings/undoMoves?gameId=${this.newGameId}`,
      (response) => {
        if (response) {
          response = JSON.parse(response);
          this.getMovesList();
          const finalFEN = response.moves[response.moves.length - 1];
          const FEN = finalFEN[finalFEN.length - 2].fen;
          if (finalFEN.length === 2) {
            let chessBoard = (<HTMLFrameElement>(
              document.getElementById('chessBd')
            )).contentWindow;
            chessBoard.postMessage(
              JSON.stringify({
                boardState: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
              }),
              environment.urls.chessClientURL
            );
          } else {
            var chessBoard = (<HTMLFrameElement>(
              document.getElementById('chessBd')
            )).contentWindow;
            chessBoard.postMessage(
              JSON.stringify({
                boardState: FEN,
                color: this.color,
              }),
              environment.urls.chessClientURL
            );
          }
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
  getMovesList = () => {
    this.httpGetAsync(
      `${environment.urls.middlewareURL}/meetings/getStoreMoves?gameId=${this.newGameId}`,
      (response) => {
        response = JSON.parse(response);
        let finalMove =
          response.moves.length > 0
            ? response.moves[response.moves.length - 1]
            : response.moves;
        this.displayMoves = finalMove || [];
        this.currentStep = finalMove.length > 0 ? finalMove.length - 1 : 0;
      }
    );
  };
  setMove(index, direction) {
    this.currentStep =
      index <= 0
        ? 0
        : index > this.displayMoves.length - 1
        ? this.displayMoves.length - 1
        : index;
    if (direction != 'backward') {
      if (this.displayMoves.length - 1 === index) {
        this.isStepLast = true;
        this.refresh();
      } else {
        this.isStepLast = false;
      }
    } else {
      if (this.displayMoves.length <= index) {
        this.isStepLast = true;
        this.refresh();
      } else {
        this.isStepLast = false;
      }
    }
    let movePos = 0;
    if (index <= 0) {
      movePos = 0;
    } else {
      movePos = index - 1;
    }
    this.changeBoardState(this.displayMoves[movePos]?.fen);
    if (this.isNearBottom) {
      this.scrollToBottom();
    }
  }
  imgPos(index) {
    return (
      '../../../assets/images/chessPieces/wikipedia/' +
      this.displayMoves[index].image +
      '.png'
    );
  }
  private changeBoardState(fen?) {
    var chessBoard = (<HTMLFrameElement>document.getElementById('chessBd'))
      .contentWindow;
    chessBoard.postMessage(
      JSON.stringify({
        boardState: fen,
      }),
      environment.urls.chessClientURL
    );
  }
  private scrollToBottom(): void {
    this.scrollContainer = this.scrollFrame?.nativeElement;
    this.scrollContainer?.scroll({
      top: this.scrollContainer?.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }
  private isUserNearBottom(): boolean {
    const threshold = 150;
    const position =
      this.scrollContainer?.scrollTop + this.scrollContainer?.offsetHeight;
    const height = this.scrollContainer?.scrollHeight;
    return position > height - threshold;
  }

  scrolled(event: any): void {
    this.isNearBottom = this.isUserNearBottom();
  }

  private gameOverAlert() {
    alert('Game over.');
  }
}
