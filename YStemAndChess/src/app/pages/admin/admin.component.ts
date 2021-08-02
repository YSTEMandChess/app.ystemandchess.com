import { Component, OnInit } from '@angular/core';
import { exit } from 'process';
import { environment } from 'src/environments/environment';
import { ViewEncapsulation } from '@angular/core';
import { FileDetector } from 'selenium-webdriver';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {

  listResults: any;
  isNameFieldEmpty: boolean;
  listRoles: any;

  constructor() { 
    this.listResults = [];
    this.isNameFieldEmpty = true;
    this.listRoles = ["","Student", "Parent", "Mentor", "Admin"]
  }

  ngOnInit(): void {
  }

  checkNameField() {
    if ((<HTMLInputElement>document.getElementById('name')).value == "") {
      this.isNameFieldEmpty = true;
      this.listResults = [];
    } else {
      this.isNameFieldEmpty = false;
    }
    return this.isNameFieldEmpty
  }

  filterResults() {
    var selectedFilter = (<HTMLInputElement>document.getElementById('role')).value;
    var filteredList = [];
    for (let i= 0; i < this.listResults.length; i++){
      if (this.listResults[i][1] == selectedFilter.toLowerCase()) {
        filteredList.push(this.listResults[i])
      }
    }
    if (filteredList.length == 0) {
      filteredList.push(["No users were found.",""]);
    }
    this.listResults = filteredList;
  }

  searchUsers() {
    // Retrieve name from input field
    var fullName = (<HTMLInputElement>document.getElementById('name')).value;
    let url = `${environment.urls.middlewareURL}/user/selectByName?name=${fullName}`;
    this.httpGetAsync(url, (response) => {
      if (response == 'No users were found.') {
        this.listResults = [["No users were found.",""]];
      } else {
        var responseArray = JSON.parse(response);
        // Set the response from the server as list data
        this.listResults = responseArray;
        }
      if ( (<HTMLInputElement>document.getElementById('role')).value != ""){
        this.filterResults();
      }
    })
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

}
