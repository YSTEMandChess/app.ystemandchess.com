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

  // we import the header component because it contains user info
  constructor(private router: Router, private header: HeaderComponent) { }

  ngOnInit(): void {
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
  }


}
