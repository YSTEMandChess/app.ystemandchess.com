import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { setPermissionLevel } from '../../globals';
import { environment } from '../../../environments/environment';
import { ViewSDKClient } from '../../view-sdk.service';
import { Chart, ChartConfiguration, ChartItem, registerables} from 'node_modules/chart.js';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})

export class UserProfileComponent implements OnInit {
  link: string = null;
  numStudents = new Array();
  newStudentFlag: boolean = false;
  numNewStudents: number = 0;
 
  public iframeCheck = 'live'; //live or dev
  public iframeLink = '';
  public chart: any;
  public username = '';
  public firstName = '';
  public lastName = '';
  public accountCreatedAt;
  public role = '';
  public logged = false;
  private foundFlag = false;
  private endFlag = false;
  public playLink = 'play-nolog';
  public inMatch = false;
  categoryList = [];
  sharedPdfList =  [];
  public categoryName= '';
  public showPdfListView = false;
  recordingList = [];
  signedURL = '';
  constructor(private cookie: CookieService,private viewSDKClient: ViewSDKClient) {}


  public timeTrackingStat = {
    "username": "",
    "mentor": 0,
    "lesson": 0,
    "play": 0,
    "puzzle": 0,
    "website": 0
  }

  @ViewChild(BaseChartDirective)
  public userChart: BaseChartDirective;
  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: (1|1),

    scales: { 
      xAxes: [{
        gridLines: {
          display: false,
        }
      }], 
      yAxes: [{
        gridLines: {
          display: false,
        },
        ticks: {
          stepSize: 30,
          precision: 0,
          beginAtZero: true
        } 
      }] 
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
  public barChartType: ChartType = 'bar';

  public barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Website' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Lesson' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Puzzle' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Playing' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Mentoring' },
  ];
  public barChartColor: Color[] = [{backgroundColor: '#7fcc26'}, {backgroundColor: '#c8b4ff'}, {backgroundColor: '#0fdff2'}, {backgroundColor: '#f24598'}, {backgroundColor: '#fd8e4f'}]


  async ngOnInit() {    
    
    this.numStudents.push(0);
    this.numNewStudents++;
    let pLevel = 'nLogged';
    let uInfo = await setPermissionLevel(this.cookie);

    this.username = uInfo['username'];
    this.firstName = uInfo['firstName'];
    this.lastName = uInfo['lastName'];
    this.accountCreatedAt = uInfo['accountCreatedAt'];
    this.role = uInfo['role'];

    // document.getElementById("defaultOpen").click();

    const iframe = document.getElementById('profile-iframe') as HTMLIFrameElement;
      if (this.iframeCheck == "live"){   
        this.iframeLink = "http://www.ystemandchess.com/student";
      } else {
        this.iframeLink = "http://localhost:4200/student";
      }
      iframe.src = this.iframeLink
      document.body.addEventListener('click', () => {
        if (this.iframeCheck == "live"){ 
          this.iframeLink = "http://www.ystemandchess.com/student";
        } else {
          this.iframeLink = "http://localhost:4200/student";
        }
        iframe.src = this.iframeLink
        });


    if (uInfo['error'] == undefined) {
      pLevel = uInfo.role;
      this.username = uInfo.username;
    }

    // code for the recordings
    if (uInfo['error'] == undefined) {
      this.logged = true;
      pLevel = uInfo['role'];
      this.username = uInfo['username'];
      this.role = uInfo['role'];
      if (this.role === 'student') {
        this.playLink = 'student';
      } else if (this.role === 'm entor') {
        this.playLink = 'play-mentor';
      }
    }

    if (this.role == 'student' || this.role == 'mentor') {
      // setInterval(() => {
        let url = `${environment.urls.middlewareURL}/meetings/usersRecordings`;
        //change rest
        this.httpGetAsync(url, 'GET', (response) => { 
          this.recordingList = JSON.parse(response);
        });
      // }, 1500);
    }
    if (this.role == 'student'){
      await this.getTimeTrackingStat(this.username, new Date(1970, 0, 1), new Date(new Date().getFullYear(), 11, 31)).then((data) => {this.timeTrackingStat = data;});
      this.getTimeTrackingStatByMonth(this.username);
      // this.createStudentChart();
    }


    this.categoryList = [
      {'id':'1','name':'Mantra'},
      {'id':'2','name':'Exercise'},
      {'id':'3','name':'One Personal Development Lesson'},
      {'id':'4','name':'Chess Lesson'},
      {'id':'5','name':'Game'},
      {'id':'6','name':'Puzzles'}];
    // this.categoryList = categoryList;

  }
  
  public async getTimeTrackingStat(username, startDate, endDate){
    let url = `${environment.urls.middlewareURL}/timeTracking/statistics?username=${username}&startDate=${startDate}&endDate=${endDate}`;
    let authToken = this.cookie.get('login');
    const headers = new Headers ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    })
    const response = await fetch(url, { method: 'GET', headers: headers });
    return await response.json();

    // return fetch(url, { method: 'GET', headers: headers }).then((response) => {
    //   return response.json();
    // });
  }


  public getTimeTrackingStatByMonth(username){
    let promiseList = [];
    for (let i = 0; i < 12; i++){
      const promiseThisMonth = this.getTimeTrackingStat(username, new Date(new Date().getFullYear(), i, 1), new Date(new Date().getFullYear(), i+1, 1))
      promiseList.push(promiseThisMonth);
    }
    Promise.all(promiseList).then(data=>{
      for (const key in data){
        for (const d of this.barChartData){
          d.data[key] = data[key][d.label.toLowerCase().replace('ing','')];
        }
      }
      this.userChart.chart.update();
    })
  }


  public openCity(evt, cityName) {
    console.log("cityname--->", cityName)
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  
  // Get the element with id="defaultOpen" and click on it
  

  private httpGetAsync(theUrl: string, method: string, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    };
    xmlHttp.open(method, theUrl, true); // true for asynchronous
    xmlHttp.setRequestHeader(
      'Authorization',
      `Bearer ${this.cookie.get('login')}`
    );
    xmlHttp.send(null);
  }

  public getPresignURL(sid,meetingid)
  {
    let filename = sid+'_'+meetingid+'_0.mp4';
    console.log(filename);
    // singleRecording
    let url = `${environment.urls.middlewareURL}/meetings/singleRecording?filename=`+filename;
    //change rest
    this.httpGetAsync(url, 'GET', (response) => { 
      this.signedURL = JSON.parse(response);
    });

    if(this.signedURL !='')
    {
      window.open(this.signedURL);
    }   
  }
  public showSharedSlideShowPdfList(catId,catName)
  {
    this.showPdfListView = true;
    if(catId == '1')
    {
      this.sharedPdfList = [
        {'id':'1','FileName':'Mantra 1','FilePath':'https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf'},
        {'id':'2','FileName':'Mantra 2','FilePath':'https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf'},
        {'id':'3','FileName':'Mantra 3','FilePath':'https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf'},
        {'id':'4','FileName':'Mantra 4','FilePath':'https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf'},
        {'id':'5','FileName':'Mantra 5','FilePath':'https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf'},
        {'id':'6','FileName':'Mantra 6','FilePath':'https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf'}];
    }
    else if(catId == 2)
    {
      this.sharedPdfList = [
        {'id':'1','FileName':'Exercise 1','FilePath':'https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf'},
        {'id':'2','FileName':'Exercise 2','FilePath':'https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf'},
        {'id':'3','FileName':'Exercise 3','FilePath':'https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf'},
        {'id':'4','FileName':'Exercise 4','FilePath':'https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf'},
        {'id':'5','FileName':'Exercise 5','FilePath':'https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf'}];
    }
    else if(catId == 3)
    {
      this.sharedPdfList = [
        {'id':'1','FileName':'One Personal Development Lesson 1','FilePath':'https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf'},
        {'id':'2','FileName':'One Personal Development Lesson 2','FilePath':'https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf'},
        {'id':'3','FileName':'One Personal Development Lesson 3','FilePath':'https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf'},
        {'id':'4','FileName':'One Personal Development Lesson 4','FilePath':'https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf'}];
    }
    else if(catId == 4)
    {
      this.sharedPdfList = [
        {'id':'1','FileName':'Chess Lesson 1','FilePath':'https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf'},
        {'id':'2','FileName':'Chess Lesson 2','FilePath':'https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf'},
        {'id':'3','FileName':'Chess Lesson 3','FilePath':'https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf'}];
    }
    else if(catId == 5)
    {
      this.sharedPdfList = [
        {'id':'1','FileName':'Game 1','FilePath':'https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf'},
        {'id':'2','FileName':'Game 2','FilePath':'https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf'}];
    }
    else if(catId == 6)
    {
      this.sharedPdfList = [
        {'id':'1','FileName':'Puzzles 1','FilePath':'https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf'}];
    }
    else
    {
      this.sharedPdfList = [
        {'id':'1','FileName':'demo 1','FilePath':'https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf'}];
    }
    this.categoryName = catName;




  }

  public showSharedSlideShow(filePath)
  {
    // var filePath = 'https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf';
    
    this.viewSDKClient.ready().then(() => {
      /* Invoke file preview */
      this.viewSDKClient.previewFile(filePath,'pdf-div', {
          /* Pass the embed mode option here */
          embedMode: 'SIZED_CONTAINER',
          dockPageControls:false,
      });
  });
  }
  
}



// export class SizedContainerComponent implements AfterViewInit {
//   constructor(private viewSDKClient: ViewSDKClient) { }

//   ngAfterViewInit() {
//       this.viewSDKClient.ready().then(() => {
//           /* Invoke file preview */
//           this.viewSDKClient.previewFile('pdf-div', {
//               /* Pass the embed mode option here */
//               embedMode: 'SIZED_CONTAINER'
//           });
//       });
//   }
// }

export interface Student {
  first: string;
  last: string;
  username: string;
  password: string;
}