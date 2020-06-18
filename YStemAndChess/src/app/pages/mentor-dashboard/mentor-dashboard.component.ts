import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mentor-dashboard',
  templateUrl: './mentor-dashboard.component.html',
  styleUrls: ['./mentor-dashboard.component.scss']
})
export class MentorDashboardComponent implements OnInit {

  STUDENTS = [
    {id: 1, name:'Superman'},
    {id: 2, name:'Batman'},
    {id: 5, name:'BatGirl'},
    {id: 3, name:'Robin'},
    {id: 4, name:'Flash'}
];
  constructor() { }

  ngOnInit(): void {
  }

}
