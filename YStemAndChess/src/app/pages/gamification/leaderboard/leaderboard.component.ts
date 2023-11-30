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
  sliceCounter = 1;
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
        // add rank number to each entries
        jsonData.forEach(e => {
          e.rank = this.rankCounter;
          this.rankCounter++;
        });

        this.data = this.data.concat(jsonData);
      }
    );
    
    // set up the load button
    const loadButton = document.getElementById('load') as HTMLElement;
    // add event listener
	  loadButton.addEventListener('click', () => {
      this.httpGetAsync(
        `${environment.urls.middlewareURL}/leaderboard/slice/?id=` + this.sliceCounter,
        'GET',
        (response) => {
          // parse the response and store it into the data array
          var response = JSON.parse(response);
          var jsonData = [];
          for (var i = 0; i < response.length; i++) {
            jsonData.push(response[i]);
          }
          // add rank number to each entries
          jsonData.forEach(e => {
            e.rank = this.rankCounter;
            this.rankCounter++;
          });

          // if we got data back, add it to the leaderboard
          // increase the slice counter
          if (jsonData.length != 0){
            this.data = this.data.concat(jsonData);
            this.sliceCounter++;
          }
          // if not, there's no data left, hide the load button
          // show "no more to load" text
          else {
            loadButton.style.display = 'none';
            const endText = document.getElementById('endText') as HTMLElement;
            endText.style.display = 'block';
          }
        }
      );
    });

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
