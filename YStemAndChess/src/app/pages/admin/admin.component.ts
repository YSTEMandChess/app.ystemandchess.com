import { Component, OnInit } from '@angular/core';
import { exit } from 'process';
import { environment } from 'src/environments/environment';
import { ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  searchStudent() {
    // Retrieve name from input field and split by space
    var fullName = (<HTMLInputElement>document.getElementById('name')).value;
    // Validates a non-empty name field, which was returning all users.
    if (fullName == ""){
      document.getElementById("studentProgressTable").innerHTML = 
      '<tr><th>Student</th><th>Progress</th><th></th></tr><tr><td>Name field must not be empty.</td><td></td><td></td></tr>';
      return false;
    };
    let url = `${environment.urls.middlewareURL}/user/selectByName?name=${fullName}`;
    this.httpGetAsync(url, (response) => {
      if (response == 'No users were found.') {
        document.getElementById("studentProgressTable").innerHTML = 
        '<tr><th>Student</th><th>Progress</th><th></th></tr><tr><td>No users were found.</td><td></td><td></td></tr>';
      } else {
        var responseArray = JSON.parse(response);
        // Build HTML string 
        let html = '';
        html += '<tr><th>Student</th><th>Progress</th><th></th></tr>';
        for (let i = 0; i < responseArray.length ; i++){
          html += '<tr>'
          html += '<td>'+responseArray[i]+'</td>'
          html += '<td>Placeholder</td>'
          html += '<td>Data</td>'
          html += '</tr>'
        }
    
        // Populate HTML with the html string built
        document.getElementById("studentProgressTable").innerHTML = html;

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
