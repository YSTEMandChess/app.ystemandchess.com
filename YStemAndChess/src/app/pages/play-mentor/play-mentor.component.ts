import { CookieService } from 'ngx-cookie-service';
import { SocketService } from '../../services/socket/socket.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-play-mentor',
  templateUrl: './play-mentor.component.html',
  styleUrls: ['./play-mentor.component.scss'],
})



export class PlayMentorComponent implements OnInit {
  private currentFEN: String =
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  private messageQueue = new Array();
  displayMoves = [];
  private isReady: boolean;
  private isNewGame: boolean;
  private playwithcomputer = false;
  private color: String = 'white';
  private level: number = 5;
  private prevFEN: String = this.currentFEN;
  meetingId;
  move;
  currentStep;
  pieceImage;
  userName;
  newGameId;
  isStepLast;
  FEN;
  scrollContainer;
  isNearBottom;
  buttonClicked;
  gameOverMsg: unknown = false;
  constructor(private socket: SocketService, private cookie: CookieService) { }
  @ViewChild('scrollframe', { static: false }) scrollFrame: ElementRef;

  ngOnInit(): void {
    this.meetingId = this.cookie.get('this.meetingId');
    this.getData();
    this.newGameId = this.cookie.get('this.newGameId');
    this.buttonClicked = this.cookie.get('this.buttonClicked');
    if (this.meetingId == '') {
      setTimeout(() => {
        this.playWithComputer();
      }, 1000);;
    };
    if (this.buttonClicked != 'true') {
      setTimeout(() => {
        this.playWithComputer();
      }, 2000);
    }
    let userContent;

    const videodrag = document.getElementById('video');
    const pipButtonmove = document.getElementById('pipBtn');

    const video = videodrag as any;
    const pipButton = pipButtonmove as any;

    var eventMethod = 'addEventListener';
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';
    eventer(
      messageEvent,
      (e) => {
        // Means that there is the board state and whatnot
        this.prevFEN = this.currentFEN;
        let info = e.data;
        if (info == 'ReadyToRecieve') {
          this.isReady = true;
        }
      },
      false
    );

    this.socket.listen('isStepLast').subscribe((data) => {
      this.isStepLast = data
    });
    this.socket.listen('isStepLastUpdate').subscribe((data) => {
      this.isStepLast = data
    });
    this.socket.listen('preventUndoAfterGameOver').subscribe((data: any) => {
      if (data) {
        this.cookie.set("undoAfterGameOver", "true");
      }
    });
  };

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
  getMovesList = () => {
    let url: string = '';
    url = `${environment.urls.middlewareURL}/meetings/getBoardState?meetingId=${this.meetingId}`;
    this.httpGetAsync(url, 'GET', (response) => {
      response = JSON.parse(response);
      this.displayMoves = response.moves || [];
    });
  };
  private httpGetAsync(theUrl: string, method: string = 'POST', callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    };
    xmlHttp.open(method, theUrl, true); // true for asynchronous
    if (!this.playwithcomputer) {
      xmlHttp.setRequestHeader(
        'Authorization',
        `Bearer ${this.cookie.get('login')}`
      );
    }
    xmlHttp.send(null);
  }

  public flipBoard() {
    let userContent = JSON.parse(atob(this.cookie.get('login').split('.')[1]));
    this.socket.emitMessage(
      'flipBoard',
      JSON.stringify({ username: userContent.username })
    );
  }
  public CheckGame() {
    if (this.meetingId == undefined || this.meetingId == '') {
      setTimeout(() => {
        this.newGameInit();
      }, 1000);
    } else {
      this.newGame();
    }
  }
  public newGame() {
    this.gameOverMsg = false
    this.isStepLast = true
    this.socket.emitMessage(
      'isStepLastUpdate',
      JSON.stringify(this.isStepLast)
    );

    this.cookie.delete('gameOverMsg');
    this.cookie.delete('undoAfterGameOver');
    this.displayMoves = [];
    this.playwithcomputer = false;
    let userContent = JSON.parse(atob(this.cookie.get('login').split('.')[1]));
    this.socket.emitMessage(
      'createNewGame',
      JSON.stringify({ username: userContent.username })
    );
    // this.getMovesList();

    let url: string;
    this.displayMoves = [];
    url = `${environment.urls.middlewareURL}/meetings/newBoardState?meetingId=${this.meetingId}`;
    this.httpGetAsync(url, 'POST', (response) => {
      response = JSON.parse(response);
      // this.displayMoves = response.moves || [];
      this.displayMoves = [];
    });
  }

  public playWithComputer() {
    if (this.meetingId) {
      this.cookie.delete('this.meetingId');
      this.httpGetAsync(
        `${environment.urls.middlewareURL}/meetings/endMeeting`,
        'PUT',
        (response) => {
          this.endGame();
        }
      )
    }
    this.httpGetAsync(`${environment.urls.middlewareURL}/meetings/getStoreMoves?gameId=${this.newGameId}`,
      'GET',
      (response) => {
        response = JSON.parse(response);
        let finalMove =
          response.moves.length > 0
            ? response.moves[response.moves.length - 1]
            : response.moves;
        this.displayMoves = finalMove || [];
        this.currentStep = finalMove.length > 0 ? finalMove.length - 1 : 0;
        if (this.currentStep == 0) {
          let chessBoard = (<HTMLFrameElement>(document.getElementById('chessBd'))).contentWindow;
          let FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
          chessBoard.postMessage(JSON.stringify({
            boardState: FEN,
            color: this.color,
          }), environment.urls.chessClientURL);
        } else {
          const finalFEN = response.moves[response.moves.length - 1];
          let FEN = finalFEN[finalFEN.length - 1].fen;
          if (FEN == 'gameOver') {
            this.gameOverAlert()
          }
          let chessBoard = (<HTMLFrameElement>(document.getElementById('chessBd'))).contentWindow;
          chessBoard.postMessage(JSON.stringify({
            boardState: FEN,
            color: this.color,
          }), environment.urls.chessClientURL);
          if (!response) {
            this.newGameInit();
          }
        }
        setTimeout(() => {
          this.scrollToBottom();
        }, 500);
      });
    this.playwithcomputer = true;
    var eventMethod = 'addEventListener';
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';
    eventer(
      messageEvent,
      (e) => {
        // Means that there is the board state and whatnot

        if (environment.productionType === 'development') {
          if (e.origin == environment.urls.chessClientURL) {
            this.prevFEN = this.currentFEN;
            const parts = this.prevFEN.split(' ');
            const activeColor = parts[1];
            let info = e.data;
            const temp = info.split(':');
            const piece = info.split('-');
            if (info == 'ReadyToRecieve') {
              this.isReady = true;
              this.sendFromQueue();
            } else if (info == 'checkmate') {
              if (activeColor == "w") {
                this.gameOverMsg = true
              }
              this.gameOverAlert()
            } else if (info == 'draw') {
              if (activeColor == "w") {
                this.gameOverMsg = true
              }
              this.gameOverAlert()
            } else if (info == 'gameOver') {
              if (activeColor == "w") {
                this.gameOverMsg = true
              }
              this.gameOverAlert()
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
                'POST',
                (response) => {
                  response = JSON.parse(response);
                  let finalMove =
                    response.moves.length > 0
                      ? response.moves[response.moves.length - 1]
                      : response.moves;
                  this.displayMoves = finalMove || [];
                  this.scrollToBottom();
                  setTimeout(() => {
                    this.getMovesLists();
                    setTimeout(() => {
                      this.scrollToBottom();
                    }, 500);
                  }, 1000);
                  if (response) {
                    this.httpGetAsync(
                      `${environment.urls.stockFishURL}/?level=${this.level}&fen=${this.currentFEN}`,
                      'POST',
                      (response) => {
                        if (response == '') {
                          this.displayMoves = [];
                          // setTimeout(() => {
                          //   Swal.fire('Game Over', 'Good Job', 'info');
                          // }, 200);
                          this.newGameInit();
                        }
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
                            'POST',
                            (response) => {
                              response = JSON.parse(response);
                              let finalMove =
                                response.moves.length > 0
                                  ? response.moves[response.moves.length - 1]
                                  : response.moves;
                              this.displayMoves = finalMove || [];
                              this.scrollToBottom();
                              setTimeout(() => {
                                this.getMovesLists();
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
            const parts = this.prevFEN.split(' ');
            const activeColor = parts[1];
            let info = e.data;
            const temp = info.split(':');
            const piece = info.split('-');
            if (info == 'ReadyToRecieve') {
              this.isReady = true;
              this.sendFromQueue();
            } else if (info == 'checkmate') {
              if (activeColor == "w") {
                this.gameOverMsg = true
              }
              this.gameOverAlert();
            } else if (info == 'draw') {
              if (activeColor == "w") {
                this.gameOverMsg = true
              }
              this.gameOverAlert();
            } else if (info == 'gameOver') {
              if (activeColor == "w") {
                this.gameOverMsg = true
              }
              this.gameOverAlert();
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
                'POST',
                (response) => {
                  response = JSON.parse(response);
                  let finalMove =
                    response.moves.length > 0
                      ? response.moves[response.moves.length - 1]
                      : response.moves;
                  this.displayMoves = finalMove || [];
                  this.scrollToBottom();
                  setTimeout(() => {
                    this.getMovesLists();
                    setTimeout(() => {
                      this.scrollToBottom();
                    }, 500);
                  }, 1000);
                  if (response) {
                    this.httpGetAsync(
                      `${environment.urls.stockFishURL}/?level=${this.level}&fen=${this.currentFEN}`,
                      'POST',
                      (response) => {
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
                            'POST',
                            (response) => {
                              response = JSON.parse(response);
                              let finalMove =
                                response.moves.length > 0
                                  ? response.moves[response.moves.length - 1]
                                  : response.moves;
                              this.displayMoves = finalMove || [];
                              this.scrollToBottom();
                              setTimeout(() => {
                                this.getMovesLists();
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

  public newGameInit() {
    this.gameOverMsg = false
    this.isStepLast = true
    this.cookie.delete('gameOverMsg');
    this.cookie.delete('undoAfterGameOver');
    this.socket.emitMessage(
      'isStepLastUpdate',
      JSON.stringify(this.isStepLast)
    );

    this.httpGetAsync(
      `${environment.urls.middlewareURL}/meetings/newGameStoreMoves?gameId=${this.newGameId}`,
      'POST',
      (response) => {
        this.getMovesLists();
      }
    );
    // this.color = Math.random() > 0.5 ? 'white' : 'black';
    this.color = 'white';
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
        'POST',
        (response) => {
          if (response) {
            this.httpGetAsync(
              `${environment.urls.stockFishURL}/?level=${this.level}&fen=${this.currentFEN}`,
              'POST',
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
                    'POST',
                    (response) => {
                      response = JSON.parse(response);
                      let finalMove =
                        response.moves.length > 0
                          ? response.moves[response.moves.length - 1]
                          : response.moves;
                      this.displayMoves = finalMove || [];
                      this.scrollToBottom();
                      setTimeout(() => {
                        this.getMovesLists();
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
      'GET',
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
          setTimeout(() => {
            this.scrollToBottom();
          }, 500);
        }, 1000);

        (<HTMLFrameElement>document.getElementById('chessBd')).setAttribute(
          'src',
          frame
        );
      }
    );
  }
  public undoPrevMove() {
    var apiurl = "";
    let undoAfterGameOver = this.cookie.get('undoAfterGameOver');
    console.log("this.isStepLast", this.isStepLast)
    if (this.isStepLast == true && this.meetingId != undefined && this.meetingId != '' && undoAfterGameOver != "true") {
      apiurl = `${environment.urls.middlewareURL}/meetings/checkUndoPermission?meetingId=${this.meetingId}`;
      this.httpGetAsync(apiurl, 'POST', (response) => {
        if (response) {
          response = JSON.parse(response);
          if (response.permission == false) {
            apiurl = `${environment.urls.middlewareURL}/meetings/undoMeetingMoves?meetingId=${this.meetingId}`;
            this.httpGetAsync(apiurl, 'POST', (response) => {
              if (response) {
                response = JSON.parse(response);
                const getFEN = response.moves[response.moves.length - 1];
                const finalFEN = response.moves[response.moves.length - 1];
                const sliceFEN = finalFEN.splice(-2);
                let FEN = '';
                if (finalFEN.length > 0) {
                  FEN = finalFEN[finalFEN.length - 1].fen;
                  this.socket.emitMessage('undoMoves', JSON.stringify({
                    data: FEN,
                  }));
                } if (getFEN.length === 0) {
                  FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
                  this.socket.emitMessage('undoMoves', JSON.stringify({
                    data: FEN,
                  }));
                }
              }
            });
          }
          else {
            this.undoPermissionAlert()
          }
        }
      })
    } else {
      if (this.isStepLast == true && this.gameOverMsg == false) {
        apiurl = `${environment.urls.middlewareURL}/meetings/undoMoves?gameId=${this.newGameId}`;
        this.httpGetAsync(apiurl, 'POST', (response) => {
          if (response) {
            response = JSON.parse(response);
            console.log("response-----", response)
            this.getMovesLists();
            const getFEN = response.moves[response.moves.length - 1];
            const finalFEN = response.moves[response.moves.length - 1];
            const sliceFEN = finalFEN.splice(-2);
            let FEN = '';
            if (finalFEN.length > 0) {
              FEN = finalFEN[finalFEN.length - 1].fen;
            }
            if (getFEN.length === 0) {
              let chessBoard = (<HTMLFrameElement>(document.getElementById('chessBd'))).contentWindow;
              chessBoard.postMessage(JSON.stringify({
                boardState: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
              }), environment.urls.chessClientURL);
            } else {
              var chessBoard = (<HTMLFrameElement>(document.getElementById('chessBd'))).contentWindow;
              this.socket.emitMessage('mentor boardState', JSON.stringify({
                boardState: FEN,
                color: this.color,
              }),);
              chessBoard.postMessage(JSON.stringify({
                boardState: FEN,
                color: this.color,
              }), environment.urls.chessClientURL);
            }
          }
        });
      }
    }
  }
  private scrollToBottom(): void {
    this.scrollContainer = this.scrollFrame?.nativeElement;
    this.scrollContainer?.scroll({
      top: this.scrollContainer?.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
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
    this.socket.emitMessage(
      'isStepLastUpdate',
      this.isStepLast
    );
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
  getMovesLists = () => {
    var apiurl = "";
    if (this.meetingId != undefined && this.meetingId != '') {
      apiurl = `${environment.urls.middlewareURL}/meetings/getStoreMoves?meetingId=${this.meetingId}`;
      this.httpGetAsync(apiurl, 'GET', (response) => {
        response = JSON.parse(response);
        let finalMove =
          response.moves.length > 0
            ? response.moves[response.moves.length - 1]
            : response.moves;
        setTimeout(() => {
          this.displayMoves = finalMove || [];
          this.currentStep = finalMove.length > 0 ? finalMove.length - 1 : 0;
          setTimeout(() => {
            this.scrollToBottom();
          }, 500);
        }, 1000)
      }
      );
    } else {
      apiurl = `${environment.urls.middlewareURL}/meetings/getStoreMoves?gameId=${this.newGameId}`;
      this.httpGetAsync(apiurl, 'GET', (response) => {
        response = JSON.parse(response);
        let finalMove =
          response.moves.length > 0
            ? response.moves[response.moves.length - 1]
            : response.moves;
        setTimeout(() => {
          this.displayMoves = finalMove || [];
          this.currentStep = finalMove.length > 0 ? finalMove.length - 1 : 0;
          setTimeout(() => {
            this.scrollToBottom();
          }, 500);
        }, 500)
      }
      );
    }
    // this.httpGetAsync(apiurl, 'GET', (response) => {
    //   response = JSON.parse(response);
    //   let finalMove =
    //     response.moves.length > 0
    //       ? response.moves[response.moves.length - 1]
    //       : response.moves;
    //   setTimeout(() => {
    //     this.displayMoves = finalMove || [];
    //     this.currentStep = finalMove.length > 0 ? finalMove.length - 1 : 0;
    //   }, 1000)
    // }
    // );
  };
  getData() {
    var userContent: any;
    if (this.cookie.check('login')) {
      userContent = JSON.parse(atob(this.cookie.get('login').split('.')[1]));
      this.httpGetAsync(
        `${environment.urls.middlewareURL}/meetings/inMeeting`,
        'GET',
        (response) => {
          if (
            JSON.parse(response) ===
            'There are no current meetings with this user.'
          ) {
            return;
          }
          let responseText = JSON.parse(response)[0];
          this.meetingId = responseText.meetingId;
          this.cookie.set('this.meetingId', this.meetingId);
          if (this.meetingId) {
            this.cookie.delete('this.newGameId');
          }
        }
      );
      this.userName = userContent.username;
      this.newGameId = this.cookie.get('this.newGameId');
      if (!this.newGameId) {
        this.httpGetAsync(
          `${environment.urls.middlewareURL}/meetings/storeMoves?userId=${this.userName}`,
          'POST',
          (response) => {
            let result = JSON.parse(response);
            this.newGameId = result.gameId;
            this.cookie.set('this.newGameId', this.newGameId);
          }
        );
      }
    }
  }
  public gameOverAlert() {
    if (this.gameOverMsg == true) {
      Swal.fire('Game Over', 'Oops! You Lost the game', 'info');
    } else {
      Swal.fire('Game Over', 'Hurray! You Win the game', 'info');
    }
  }
  public undoPermissionAlert() {
    alert('You can not do undo!');
  }
  public endGame() {
    let userContent = JSON.parse(atob(this.cookie.get('login').split('.')[1]));
    this.socket.emitMessage(
      'endGame',
      JSON.stringify({ username: userContent.username })
    );
  }
}