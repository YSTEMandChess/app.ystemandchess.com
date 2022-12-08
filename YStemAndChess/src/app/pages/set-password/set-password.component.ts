import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss'],
})
export class SetPasswordComponent implements OnInit {
  public token: any;
  public loading: boolean;
  link: string = null;
  public confirm = false;
  public confirmError = '';
  public showData = false;
  constructor(
    private activatedroute: ActivatedRoute,
    private cookie: CookieService
  ) {}

  ngOnInit(): void {
    this.activatedroute.queryParams.subscribe((data) => {
      this.token = data;
    });
  }

  checkConfirmPassword() {
    var password = (<HTMLInputElement>document.getElementById('password'))
      .value;
    var confirmPassword = (<HTMLInputElement>(
      document.getElementById('cpassword')
    )).value;
    if (password === confirmPassword) {
      this.confirm = true;
      this.confirmError = '';
      this.verifyInDataBase();
      return true;
    } else {
      this.confirmError = 'Password and confirm password does not match';
      return false;
    }
  }
  verifyInDataBase() {
    var password = (<HTMLInputElement>document.getElementById('password'))
      .value;
    let url: string = '';
    url = `${environment.urls.middlewareURL}/user/resetPassword?password=${password}&token=${this.token.token}`;
    this.httpGetAsync(url, 'POST', (response) => {
      if (response.status === 200) {
        this.showData = true;
      } else {
        this.showData = false;
      }
    });
  }
  private httpGetAsync(theUrl: string, method: string = 'POST', callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      callback(xmlHttp);
    };
    xmlHttp.open(method, theUrl, true); // true for asynchronous
    xmlHttp.setRequestHeader(
      'Authorization',
      `Bearer ${this.cookie.get('login')}`
    );
    xmlHttp.send(null);
  }
}
