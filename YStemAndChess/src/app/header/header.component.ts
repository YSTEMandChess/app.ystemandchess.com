import { SocketService } from '../services/socket/socket.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { setPermissionLevel } from '../globals';
import { allowedNodeEnvironmentFlags } from 'process';
import { ModalService } from '../_modal';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public username = '';
  public role = '';
  public link = '';
  public logged = false;
  private foundFlag = false;
  private endFlag = false;
  public playLink = '/play-nolog';
  public inMatch = false;

  constructor(
    private cookie: CookieService,
    private modalService: ModalService,
    private socket: SocketService
  ) {}

  async ngOnInit() {
    let pLevel = 'nLogged';
    let uInfo = await setPermissionLevel(this.cookie);
    if (uInfo['error'] == undefined) {
      this.logged = true;
      pLevel = uInfo['role'];
      this.username = uInfo['username'];
      this.role = uInfo['role'];
    }
    if (this.role == 'student' || this.role == 'mentor') {
      setInterval(() => {
        let url = `${
          environment.urls.middlewareURL
        }/isInMeeting.php/?jwt=${this.cookie.get('login')}`;
        //change rest
        this.httpGetAsync(url, (response) => {
          if (response == 'There are no current meetings with this user.') {
            if (this.inMatch) {
              window.location.pathname = '/';
            }
            this.inMatch = false;
          }
        });
      }, 600);
    }

    // Check to see if they are currently in a game, or not.
    let url = `${
      environment.urls.middlewareURL
    }/isInMeeting.php/?jwt=${this.cookie.get('login')}`;
    this.httpGetAsync(url, (response) => {
      // They are currently in a meeting. So set it up.
      if (
        response == 'There are no current meetings with this user.' ||
        pLevel == 'nLogged'
      ) {
        this.inMatch = false;
      } else {
        this.inMatch = true;
      }
    });
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  public removeFromWaiting() {
    let url = `${
      environment.urls.middlewareURL
    }/endSearch.php/?jwt=${this.cookie.get('login')}`;
    this.httpGetAsync(url, (response) => {});
    this.endFlag = true;
  }

  public findGame() {
    let url = `${
      environment.urls.middlewareURL
    }/newGame.php/?jwt=${this.cookie.get('login')}`;
    this.httpGetAsync(url, (response) => {
      if (response === 'Person Added Sucessfully.') {
        url = `${
          environment.urls.middlewareURL
        }/isInMeeting.php/?jwt=${this.cookie.get('login')}`;
        let meeting = setInterval(() => {
          this.gameFound(url);
          if (this.foundFlag === true || this.endFlag === true) {
            this.endFlag = false;
            this.foundFlag = false;
            this.closeModal('find-game');
            // GAME FOUND.
            clearInterval(meeting);
            this.redirect(this.role);
            this.inMatch = true;
          }
        }, 200);
      }
    });
  }

  private async createGame(url) {
    await this.httpGetAsync(url, (reply) => {});
  }

  private async gameFound(url) {
    await this.httpGetAsync(url, (response) => {
      if (response === 'There are no current meetings with this user.') {
        let url = `${
          environment.urls.middlewareURL
        }/pairUp.php/?jwt=${this.cookie.get('login')}`;
        this.createGame(url);
      }

      try {
        let s = JSON.parse(response);
        this.foundFlag = true;
      } catch (Error) {
        console.error(Error.message);
      }
    });
  }

  private redirect(role) {
    if (role === 'student') {
      window.location.pathname = '/student';
    } else if (role == 'mentor') {
      window.location.pathname = '/play-mentor';
    }
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

  public logout() {
    this.cookie.delete('login');
    window.location.reload();
  }

  public leaveMatch() {
    this.httpGetAsync(
      `${environment.urls.middlewareURL}/endMeeting.php/?jwt=${this.cookie.get(
        'login'
      )}`,
      (response) => {}
    );
    this.endGame();
  }

  public endGame() {
    let userContent = JSON.parse(atob(this.cookie.get('login').split('.')[1]));
    this.socket.emitMessage(
      'endGame',
      JSON.stringify({ username: userContent.username })
    );
  }
}
