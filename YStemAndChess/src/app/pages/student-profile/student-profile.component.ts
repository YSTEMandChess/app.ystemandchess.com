import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {

  constructor(private cookie: CookieService) { }

  ngOnInit(): void {
   let userContent;
   if (this.cookie.check('login')){
    userContent = JSON.parse(atob(this.cookie.get('login').split('.')[1]));
    this.httpGetAsync(
    `GET`,
    `${environment.urls.middlewareURL}/timeTracking/statistics?username={zteststudent}&startDate=\${2023-03-01T00:00:00}&endDate={2023-04-01T00:00:00.000Z}`,
      (response) => {
        if (
          JSON.parse(response) ===
          'There are no current meetings with this user.'
        ) {
          return;
        }
        let responseText = JSON.parse(response)[0];
      }
    );
   } 
  }

}
