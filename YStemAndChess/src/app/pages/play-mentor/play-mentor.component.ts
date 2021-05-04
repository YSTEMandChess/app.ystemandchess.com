import { CookieService } from 'ngx-cookie-service';
import { SocketService } from '../../services/socket/socket.service';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { Chess } from 'src/app/models/Chess';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { AgoraService } from 'src/app/agora.service';

@Component({
  selector: 'app-play-mentor',
  templateUrl: './play-mentor.component.html',
  styleUrls: ['./play-mentor.component.scss'],
})
export class PlayMentorComponent implements OnInit {
  mentorId: any;
  studentId: any;
  userContent: any;
  startTheGame: boolean = false;
  chess: Chess;
  chessSrc;

  constructor(
    private socket: SocketService,
    private cookie: CookieService,
    private sanitization: DomSanitizer
  ) {
    this.userContent = JSON.parse(atob(this.cookie.get('login').split('.')[1]));

    this.mentorId = this.userContent.username;

    socket.listen('studentId').subscribe((data) => {
      this.studentId = data;
      if (!this.startTheGame) this.getColors();
      this.startTheGame = true;
    });

    socket.listen('ivoMakeAMove').subscribe((data: any) => {
      console.log('ivoMake a move from socket MENTOR', { data });
      if (
        data.studentid === this.studentId &&
        data.mentorid === this.mentorId
      ) {
        const fen = data.board ? data.board : false;
        this.chess.newGameInit(fen);
      }
    });

    socket.listen('ivoAssingColors').subscribe((data: any) => {
      if (
        data.studentId === this.studentId &&
        data.mentorId === this.mentorId
      ) {
        this.newGame(data.studentColor);
      }
    });
  }

  async ngOnInit() {
    const interval = setInterval(() => {
      this.sendUserData();
      if (this.startTheGame) clearInterval(interval);
    }, 1000);
  }

  private async newGame(color) {
    this.chessSrc = await this.sanitization.bypassSecurityTrustResourceUrl(
      environment.urls.chessClientURL
    );

    console.log('a new game has been created', this.studentId, this.mentorId);

    this.chess = new Chess(
      'chessBd',
      false,
      true,
      this.studentId,
      this.mentorId,
      this.socket,
      color
    );
  }

  private getColors() {
    this.socket.emitMessage('ivoGetColors', {
      studentId: this.studentId,
      mentorId: this.mentorId,
    });
  }

  public sendUserData() {
    console.log(this.mentorId);
    console.log('sending data mentor', this.userContent);

    this.socket.emitMessage('ivoNewGame', JSON.stringify(this.userContent));
  }

  /*
  ngOnInit(): void {
    this.socket
      .listen('createNewGame')
      .subscribe((data) => console.log({ data }, 'wprlz'));
  }

  public flipBoard() {
    let userContent = JSON.parse(atob(this.cookie.get('login').split('.')[1]));
    this.socket.emitMessage(
      'flipBoard',
      JSON.stringify({ username: userContent.username })
    );
  }

  public newGame() {
    let userContent = JSON.parse(atob(this.cookie.get('login').split('.')[1]));
    this.socket.emitMessage(
      'boardState',
      JSON.stringify({ boardState: '8/8/8/8/8/8/8/7Q w - - 0 1' })
    );
  }
  */
}
