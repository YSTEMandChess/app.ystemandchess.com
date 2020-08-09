import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-student-recordings',
  templateUrl: './student-recordings.component.html',
  styleUrls: ['./student-recordings.component.scss']
})
export class StudentRecordingsComponent implements OnInit {

  public recordings = [];
  public recordingDates = [];

  constructor(private cookie: CookieService) { }

  ngOnInit(): void {
    this.getRecordings();
  }

  private getRecordings() {
    let url = `http://127.0.0.1:8000/getRecordings.php/?jwt=${this.cookie.get("login")}`;
    this.httpGetAsync(url, (response) => {
      let data = JSON.parse(response);
      let key: any;
      for(key in data) {
        let video = data[key];
        //let date = data[key].date;
        this.recordings.push(video);
        // this.recordingDates.push(date);
      }
    });
  } 

  public verify(index) {
    if(confirm("Please click yes to download")) {
      let url = `http://127.0.0.1:8000/awsGen.php/?filename=${this.recordings[index]}`
    } else {
      console.log("download not wanted");
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
