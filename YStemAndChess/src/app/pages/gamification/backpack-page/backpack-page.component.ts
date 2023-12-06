import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/header';

@Component({
  selector: 'app-backpack-page',
  templateUrl: './backpack-page.component.html',
  styleUrls: ['./backpack-page.component.scss']
})
export class BackpackPageComponent implements OnInit {

  user = ''

  constructor(private header: HeaderComponent) { }

  ngOnInit(): void {

    // check if user is logged in and update the page if necessary
    this.header.checkSessionInfo().then(res => {
      this.user = this.header.username;
          
      if (this.user === '') {
        this.user = 'User';
      }
    });

  }

}
