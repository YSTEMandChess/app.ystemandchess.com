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

  existingResults: any;
  displayedResults: any;
  isNameFieldEmpty: boolean;
  listRoles: any;

  constructor() { 
    this.existingResults = [];
    this.displayedResults = [];
    this.isNameFieldEmpty = true;
    this.listRoles = ["","Student", "Parent", "Mentor", "Admin"]
  }

  ngOnInit(): void {
  }

  /** 
   * If the name field is empty, returns true and clears arrays of entries.
  */
  checkNameField() {
    if ((<HTMLInputElement>document.getElementById('name')).value == "") {
      this.isNameFieldEmpty = true;
      this.existingResults = [];
      this.displayedResults = [];
    } else {
      this.isNameFieldEmpty = false;
    }
    return this.isNameFieldEmpty
  }
  /**
   * Filters existing results and sets the displayed results according to the filter selected.
   */
  filterResults() {
    var selectedFilter = (<HTMLInputElement>document.getElementById('role')).value;
    var filteredList = [];
    // For each of the existing results
    for (let i= 0; i < this.existingResults.length; i++){
      // If the role of the user matches the filter
      if (this.existingResults[i][1] == selectedFilter.toLowerCase()) {
        // Push the user into the filtered list 
        filteredList.push(this.existingResults[i])
      }
    }
    // If there are no entries in the filtered list
    if (filteredList.length == 0) {
      // Display no users were found
      filteredList.push(["No users were found.",""]);
    }
    // Display the results of the filtered list
    this.displayedResults = filteredList;
  }
  /**
   * Returns and array containing [[username,role]].
   * If the role filter is selected, the results are filtered.
   */
  searchUsers() {
    // Retrieve name from input field
    var fullName = (<HTMLInputElement>document.getElementById('name')).value;
    let url = `${environment.urls.middlewareURL}/user/selectByName?name=${fullName}`;
    this.httpGetAsync(url, (response) => {
      if (response == 'No users were found.') {
        this.displayedResults = [["No users were found.",""]];
      } else {
        var responseArray = JSON.parse(response);
        // Set the response from the server as list data
        this.existingResults = responseArray;
        this.displayedResults = responseArray;
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
