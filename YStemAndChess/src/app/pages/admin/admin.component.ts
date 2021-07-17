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
      alert('Name field must not be empty.');
      return false;
    };
    var nameArray = fullName.split(" ");
    // Assert only first name has been entered
    if (nameArray.length == 1) {
      // First name is the first and only entry in the nameArray
      let firstName = nameArray[0];
      // Note the route findUsers takes only the first name
      let url = `${environment.urls.middlewareURL}/user/selectByFirstName?first=${firstName}`;
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
      });
    }
    // Assert first and last name have been entered
    else {
      // First name is the first entry and last name the second entry in the nameArray
      let firstName = nameArray[0];
      let lastName = nameArray[1];
      // Note the route findUser takes both first and last name
      let url = `${environment.urls.middlewareURL}/user/selectByFullName?first=${firstName}&last=${lastName}`;
      this.httpGetAsync(url, (response) => {
        if (response == 'No users were found.') {
          document.getElementById("studentProgressTable").innerHTML = 
          '<tr><th>Student</th><th>Progress</th><th></th></tr><tr><td>No users were found.</td><td></td><td></td></tr>';
        } else {
          var responseArray = JSON.parse(response);
          // Build HTML string 
          let html = '';
          for (let i = 0; i < responseArray.length() ; i++){
            html += '<tr>'
              html += '<td>'+responseArray[i]+'</td>'
              html += '<td>Placeholder</td>'
              html += '<td>Data</td>'
            html += '</tr>'
          }
      
          // Populate HTML with the html string built
          document.getElementById("studentProgressTable").innerHTML = html;

        }
      });
    }
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
