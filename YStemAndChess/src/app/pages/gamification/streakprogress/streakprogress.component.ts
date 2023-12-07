import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/header';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-streakprogress',
  templateUrl: './streakprogress.component.html',
  styleUrls: ['./streakprogress.component.scss']
})
export class StreakprogressComponent implements OnInit {

  user = '';
  streakNum = 9;
  todayDate = '12/07';
  weeklyProgressImages = ['FilledPiece', 'FilledPiece', 'FilledPiece', 'FilledPiece', 'TodayPiece', 'EmptyPiece', 'EmptyPiece'];
  stemmyText = 'StemmyText1';

  // we import the header component because it contains user info
  constructor(private router: Router, private header: HeaderComponent) { }

  ngOnInit(): void {

    this.header.checkSessionInfo().then(res => {
      this.user = this.header.username;

      // give user an alert if they're not logged in
      if (this.user === ''){
        Swal.fire({
          title: "You need to log in to use this page",
          text: "Go to log in page?",
          showDenyButton: true,
          confirmButtonText: "Yes",
          denyButtonText: `No`,
          icon: 'error'
        }).then(
          (result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/login']);
            }
            else if (result.isDenied) {
              this.router.navigate(['/backpack']);
            }
          }
        );
      }  
    });

    // check today, if it is wednesday or later, change stemmy's text bubble
    let currentDate = new Date();
    if (currentDate.getDay() > 2 && currentDate.getDay() < 7){
      this.stemmyText = 'StemmyText2';
    }

    // update the date
    let month = currentDate.getMonth() + 1; // month starts at 0
    let date = currentDate.getDate();
    if (month < 10) {
      this.todayDate = "0" + month + "/";
    }
    else {
      this.todayDate = "" + month + "/";
    }
    if (date < 10) {
      this.todayDate += "0" + date;
    }
    else {
      this.todayDate += date;
    }
    

    // set up overlay button
    const overlay = document.getElementById('overlay') as HTMLElement;
    const stemmette = document.getElementById('stemmette') as HTMLElement;
    const text = document.getElementById('stemmette-text') as HTMLElement;
    stemmette.addEventListener('click', () => {
      overlay.style.display = 'flex';
      stemmette.style.display = 'none';
      text.style.display = 'none';
    });
    overlay.addEventListener('click', () => {
      overlay.style.display = 'none';
      stemmette.style.display = 'block';
      text.style.display = 'block';
    });

    // set up calendar button
    const viewCalendar = document.getElementById('viewCalendar');
    const calendar = document.getElementById('calendarBody');
    const container = document.getElementById('calendarDiv');
    viewCalendar.addEventListener('click', () => {
      if (calendar.style.display == 'none') {
        calendar.style.display = 'block';
        container.style.backgroundColor = '#ead94c';
        container.style.borderRadius = '5%';
      }
      else {
        calendar.style.display = 'none';
        container.style.backgroundColor = 'transparent';
        container.style.borderRadius = '0';
      }
    });

  }


}
