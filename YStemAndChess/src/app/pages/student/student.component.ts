import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket/socket.service';
import { CookieService } from 'ngx-cookie-service';
import { DomSanitizer } from '@angular/platform-browser';
import { Chess } from 'src/app/models/Chess';
import { environment } from 'src/environments/environment';
import { interval } from 'rxjs';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
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
    this.studentId = this.userContent.username;

    socket.listen('mentorId').subscribe((data) => {
      this.mentorId = data;
      if (!this.startTheGame) this.getColors();
      this.startTheGame = true;
    });

    socket.listen('ivoMakeAMove').subscribe((data: any) => {
      console.log('ivoMake a move from socket Student', { data });

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
        this.newGame(data.mentorColor);
      }
    });
  }

  private getColors() {
    this.socket.emitMessage('ivoGetColors', {
      studentId: this.studentId,
      mentorId: this.mentorId,
    });
  }

  async ngOnInit() {
    const intetval = setInterval(() => {
      this.sendUserData();
      if (this.startTheGame) clearInterval(intetval);
    }, 1000);
  }

  public newGame(color) {
    this.chessSrc = this.sanitization.bypassSecurityTrustResourceUrl(
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

  public sendUserData() {
    console.log(this.studentId);
    console.log('sending Data ', this.userContent);
    this.socket.emitMessage('ivoNewGame', JSON.stringify(this.userContent));
  }
}
