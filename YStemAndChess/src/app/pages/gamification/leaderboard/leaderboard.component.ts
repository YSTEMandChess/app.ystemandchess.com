import { APP_ID, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { element } from 'protractor';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  rankCounter = 1;
  data = [];

  constructor() { }

  ngOnInit(): void {

    // send a get request to the middleware to retrieve the top 10 users
    this.httpGetAsync(
      `${environment.urls.middlewareURL}/leaderboard/top10`,
      'GET',
      (response) => {
        // parse the response and store it into the array
        var response = JSON.parse(response);
        var jsonData = [];
        for (var i = 0; i < response.length; i++) {
          jsonData.push(response[i]);
        }
        this.data = jsonData;

        // add rank number to each entries
        this.data.forEach(e => {
          e.rank = this.rankCounter;
          this.rankCounter++;
        });
      }
    );
    
  }

  // convert list of json object to list of html row for the leaderboard
  convertToRow(data, ranknum){

    for(let i = 0; i < data.length; i++){
      var row = document.createElement("div");
      row.className = "row";
      row.innerHTML = '<div class="rank">' + ranknum + '</div><div class="name">' 
                      + data[i].username + '</div><div class="school">' + data[i].school 
                      + '</div><div class="score">' + data[i].score + '</div>';
      ranknum++;
      data[i] = row;
    }
    
    return data;
  }

  private httpGetAsync(theUrl: string, method: string = 'POST', callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    };
    xmlHttp.open(method, theUrl, true); // true for asynchronous
    xmlHttp.send(null);
  }

}
