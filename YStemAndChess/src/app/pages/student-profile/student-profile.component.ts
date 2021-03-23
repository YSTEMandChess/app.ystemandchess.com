import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {

  constructor() { }

  public activeTab: string;

  ngOnInit(): void {
    this.activeTab = "activity";
  }

  public onTabClick(tabName: string) {
    this.activeTab = tabName;
  }

}
