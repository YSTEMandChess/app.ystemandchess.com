import { SocketService } from '../services/socket/socket.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, HostListener, OnInit } from '@angular/core';
import { setPermissionLevel } from '../globals';
import { allowedNodeEnvironmentFlags } from 'process';
import { ModalService } from '../_modal';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

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
  public playLink = 'play-nolog';
  public inMatch = false;
  public websiteTracker = 0;
  public webTracker;
  public websiteIdeal = 0;
  public webIdeal;
  public buttonClicked = false;
  constructor(
    private cookie: CookieService,
    private modalService: ModalService,
    private socket: SocketService,
    private router: Router
  ) { }

  redirectToURL() {
    this.router.navigateByUrl('/login');
  }
  async ngOnInit() {
    this.link = '/';
    this.checkSessionInfo();
    setInterval(async () => {
      let uInfo = await setPermissionLevel(this.cookie);
      if (uInfo.error == "User is not logged in" && (this.router.url == "/student" || this.router.url == "/mentor-profile" || this.router.url == "/play-mentor")) {
        this.redirectToURL();
      }
    }, 600000)
  }

  async checkSessionInfo() {
    let pLevel = 'nLogged';
    let uInfo = await setPermissionLevel(this.cookie);

    if (uInfo['error'] == undefined) {
      this.logged = true;
      pLevel = uInfo['role'];
      this.username = uInfo['username'];
      this.role = uInfo['role'];

      const eventId = this.cookie.get('eventId');
      const timerStatus = this.cookie.get('timerStatus');

      // Delete the cookie
      const currentDate = new Date();
      if (eventId && new Date(eventId) < currentDate) {
        this.cookie.delete('eventId');
      }
      if (eventId == '') {
        let url: string;
        url = `${environment.urls.middlewareURL}/timeTracking/start?username=${this.username}&eventType=${"website"}`;
        this.httpGetAsync(url, 'POST', (response) => {
          response = JSON.parse(response);
          this.cookie.set('eventId', response.eventId);

          let eventId = response.eventId;
          this.webTracker = setInterval(() => {
            this.cookie.set('timerStatus', "yes");
            this.websiteTracker = this.websiteTracker + 2;
            let totalTime = this.websiteTracker
            if (totalTime >= 20) {
              this.updateTrackingTime(eventId, totalTime);
            }
          }, 2000);
        });
      }
      else {
        if (timerStatus == 'yes') {
        } else {
          this.webTracker = setInterval(() => {
            this.cookie.set('timerStatus', "yes");
            this.websiteTracker = this.websiteTracker + 2;
            let totalTime = this.websiteTracker
            if (totalTime >= 20) {
              this.updateTrackingTime(eventId, totalTime);
            }
          }, 2000);
        }
      }

      if (this.role === 'student') {
        this.playLink = 'student';
      } else if (this.role === 'mentor') {
        this.playLink = 'play-mentor';
      }
    } else {
      console.log('No tracker started');
    }

    // if (this.role == 'student' || this.role == 'mentor') {
    //   setInterval(() => {
    //     let url = `${environment.urls.middlewareURL}/meetings/inMeeting`;
    //     //change rest
    //     this.httpGetAsync(url, 'GET', (response) => {
    //       if (
    //         JSON.parse(response) ===
    //         'There are no current meetings with this user.'
    //       ) {
    //         if (this.inMatch) {
    //           window.location.pathname = '/';
    //           this.cookie.delete('this.buttonClicked');
    //           this.cookie.delete('this.meetingId');
    //         }
    //         this.inMatch = false;
    //       }
    //     });
    //   }, 5000);
    // }

    if (this.role == 'student' || this.role == 'mentor') {
      setInterval(() => {
        let url = `${environment.urls.middlewareURL}/meetings/inMeeting`;
        //change rest
        this.httpGetAsync(url, 'GET', (response) => {
          let response1 = JSON.parse(response);
          if (response1[0].meetingId) {
            this.cookie.delete('this.newGameId');
            console.log("==================================", response1[0].meetingId)
          }
          if (
            JSON.parse(response) ===
            'There are no current meetings with this user.'
          ) {
            if (this.inMatch) {
              if (this.role == 'student') {
                window.location.pathname = '/student';
                this.cookie.delete('this.buttonClicked');
                this.cookie.delete('this.meetingId');
                this.cookie.delete('this.newGameId');
              } else {
                window.location.pathname = '/play-mentor';
                this.cookie.delete('this.buttonClicked');
                this.cookie.delete('this.meetingId');
                this.cookie.delete('this.newGameId');
              }
            }
            this.inMatch = false;
          }
        });
      }, 1000);
    }

    // Check to see if they are currently in a game, or not.
    let url = `${environment.urls.middlewareURL}/meetings/inMeeting`;

    this.httpGetAsync(url, 'GET', (response) => {
      // They are currently in a meeting. So set it up.
      if (
        JSON.parse(response) ==
        'There are no current meetings with this user.' ||
        pLevel == 'nLogged'
      ) {
        this.inMatch = false;
      } else {
        this.inMatch = true;
      }
    });
  }

  @HostListener('document:visibilitychange')
  appVisibility() {
    if (this.username != '') {
      if (document.hidden) {
        clearInterval(this.webTracker);
        this.cookie.set('timerStatus', "no");

        this.webIdeal = setInterval(() => {
          this.websiteIdeal = this.websiteIdeal + 2;
        }, 2000);
      } else {
        clearInterval(this.webIdeal);

        this.webTracker = setInterval(() => {
          this.websiteTracker = this.websiteTracker + 2;
        }, 2000);
      }
    }
  }
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  public removeFromWaiting() {
    let url = `${environment.urls.middlewareURL}/meetings/dequeue`;
    this.httpGetAsync(url, 'DELETE', (response) => { });
    this.endFlag = true;
  }

  public findGame() {
    let url = `${environment.urls.middlewareURL}/meetings/queue`;
    this.httpGetAsync(url, 'POST', (response) => {
      if (JSON.parse(response) === 'Person Added Successfully.') {
        this.cookie.delete('this.newGameId');
        this.cookie.delete('gameOverMsg');
        url = `${environment.urls.middlewareURL}/meetings/inMeeting`;
        let meeting = setInterval(() => {
          this.gameFound(url);
          if (this.foundFlag === true || this.endFlag === true) {
            this.endFlag = false;
            this.foundFlag = false;
            this.closeModal('find-game');
            // GAME FOUND.
            clearInterval(meeting);
            this.inMatch = true;
            this.redirect(this.role);
          }
        }, 200);
      }
    });
  }

  private createGame(url) {
    this.httpGetAsync(url, 'POST', (response) => {
      if (
        JSON.parse(response) !==
        'No one is available for matchmaking. Please wait for the next available person'
      ) {
        this.foundFlag = true;
      }
    });
  }

  private gameFound(url) {
    this.httpGetAsync(url, 'GET', (response) => {
      try {
        let parsedResponse = JSON.parse(response);
        if (
          parsedResponse === 'There are no current meetings with this user.'
        ) {
          let url = `${environment.urls.middlewareURL}/meetings/pairUp`;
          this.createGame(url);
        }
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

  private httpGetAsync(theUrl: string, method: string, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    };
    xmlHttp.open(method, theUrl, true); // true for asynchronous
    xmlHttp.setRequestHeader(
      'Authorization',
      `Bearer ${this.cookie.get('login')}`
    );
    xmlHttp.send(null);
  }

  public logout() {
    this.cookie.delete('login');
    this.cookie.delete('this.newGameId');
    this.cookie.delete('this.meetingId');
    window.location.reload();
  }

  public leaveMatch() {
    this.httpGetAsync(
      `${environment.urls.middlewareURL}/meetings/endMeeting`,
      'PUT',
      (response) => { }
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

  updateTrackingTime = (eventId: any, totalTime: any) => {
    let url: string = '';
    url = `${environment.urls.middlewareURL}/timeTracking/update?username=${this.username}&eventType=${"website"}&eventId=${eventId}&totalTime=${totalTime}`;
    this.httpGetAsync(url, 'PUT', (response) => {
      response = JSON.parse(response);
      this.websiteTracker = 0;
    }
    )
  };

  deleteNewGameCookie(): void {
    this.cookie.delete('this.newGameId');
  }
  handleFindGameButtonClick(): void {
    this.buttonClicked = true;
    this.cookie.set('this.buttonClicked', 'true');
  }
}
function redirectToURL() {
  throw new Error('Function not implemented.');
}

