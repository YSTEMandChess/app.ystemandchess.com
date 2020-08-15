import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { setPermissionLevel } from "../../globals";

@Component({
  selector: 'app-student-recordings',
  templateUrl: './student-recordings.component.html',
  styleUrls: ['./student-recordings.component.scss']
})
export class StudentRecordingsComponent implements OnInit {

  public recordings = [];
  public recordingDates = [];
  public studentName: string = ""

  constructor(private cookie: CookieService) { }

  async ngOnInit() {
    let pLevel = "nLogged";
    let uInfo = await setPermissionLevel(this.cookie);
    if (uInfo['error'] == undefined) {
      pLevel = uInfo["role"];
      this.studentName = uInfo["username"];
    }
    if(this.cookie.check("student")) {
      this.studentName = this.cookie.get("student");
    } else {

    }
    this.getRecordings();
  }

  private getRecordings() {
    let url = `http://middleware/getRecordings.php/?jwt=${this.cookie.get("login")}&student=${this.studentName}`;
    this.httpGetAsync(url, (response) => {
      let data = JSON.parse(response);
      let key: any;
      for(key in data) {
        let video = data[key].video;
        let date = data[key].recordingDate;
        this.recordings.push(video);
        this.recordingDates.push(date);
      }
    });
  } 

  public verify(index) {
    console.log(index);
    let url = `http://middleware/awsGen.php/?filename=${this.recordings[index]}`;
    this.httpGetAsync(url, (response) => {
      let data = response;
      if(confirm("Download now?")) {
        window.open(data);
      }
    });
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
