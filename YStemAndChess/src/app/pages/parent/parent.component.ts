import { Component, OnInit } from '@angular/core';
import { setPermissionLevel } from "../../globals";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  username: string;
  private logged: boolean;
  students :string[] = [];

  constructor(private cookie: CookieService) { }

  ngOnInit() {
    this.getUsername();
    this.getStudents();
  }

  getStudents() {
    let url = `http://127.0.0.1:8000/getInfo.php/?jwt=${this.cookie.get("login")}`;
    this.httpGetAsync(url,(response) => {
      if (response == "This username has been taken. Please choose another.") {
        alert("username has been taken")
      }
      let data = JSON.parse(response);
      let key: any;
      for(key in data) {
        let student = data[key].username;
        this.students.push(student);
      }
    });
  }

  private async getUsername() {
    let pLevel = "nLogged";
    let uInfo = await setPermissionLevel(this.cookie);
    if (uInfo['error'] == undefined) {
      this.logged = true;
      pLevel = uInfo["role"];
      this.username = uInfo["username"];
    }
  }

  private httpGetAsync(theUrl: string, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    }
    xmlHttp.open("POST", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
  }

}
