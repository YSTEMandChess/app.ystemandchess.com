import { Component, OnInit,AfterViewInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { setPermissionLevel } from '../../globals';
import { environment } from '../../../environments/environment';
import { ViewSDKClient } from '../../view-sdk.service';
@Component({
  selector: 'app-mentor-profile',
  templateUrl: './mentor-profile.component.html',
  styleUrls: ['./mentor-profile.component.scss'],
})

export class MentorProfileComponent implements OnInit {
  link: string = null;
  numStudents = new Array();
  newStudentFlag: boolean = false;
  numNewStudents: number = 0;
 
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
  ystemPdf = [];
  public categoryName= '';
  public showPdfListView = false;
  recordingList = [];
  signedURL = '';
  constructor(private cookie: CookieService,private viewSDKClient: ViewSDKClient) {}
  
  async ngOnInit() {
    this.viewSDKClient.ready().then(() => {
      /* Invoke file preview */
      this.viewSDKClient.previewFile('../../../assets/pdf/mentor/Y_STEM_Chess_Training_Lessons.pdf','pdf-div', {
          /* Pass the embed mode option here */
          embedMode: 'SIZED_CONTAINER',
          dockPageControls:false,
      });
  });
    
    
    this.numStudents.push(0);
    this.numNewStudents++;
    let pLevel = 'nLogged';
    let uInfo = await setPermissionLevel(this.cookie);

    this.username = uInfo['username'];
    this.firstName = uInfo['firstName'];
    this.lastName = uInfo['lastName'];
    this.accountCreatedAt = uInfo['accountCreatedAt'];
    this.role = uInfo['role'];

    document.getElementById("defaultOpen").click();
    document.getElementById("student3").click();
    document.getElementById("defaultOpen2").click();
    
    
    document.getElementById("defaultOpenStudent").click();

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
      } else if (this.role === 'mentor') {
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
    
    
    this.categoryList = [
      {'id':'1','name':'Mantra'},
      {'id':'2','name':'Exercise'},
      {'id':'3','name':'One Personal Development Lesson'},
      {'id':'4','name':'Chess Lesson'},
      {'id':'5','name':'Game'},
      {'id':'6','name':'Puzzles'}];
    // this.categoryList = categoryList;

  }

  // createChart(){
  
  //   this.chart = new Chart("MyChart", {
  //     type: 'bar', //this denotes tha type of chart

  //     data: {// values on X-Axis
  //       labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
	// 							 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	//        datasets: [
  //         {
  //           label: "Sales",
  //           data: ['467','576', '572', '79', '92',
	// 							 '574', '573', '576'],
  //           backgroundColor: 'blue'
  //         },
  //         {
  //           label: "Profit",
  //           data: ['542', '542', '536', '327', '17',
	// 								 '0.00', '538', '541'],
  //           backgroundColor: 'limegreen'
  //         }  
  //       ]
  //     },
  //     options: {
  //       aspectRatio:2.5
  //     }
      
  //   });
  // }

  public openCity(evt, cityName) {
    console.log("cityname--->",evt)
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

  public openStudent(evt, cityName) {
    console.log("cityname--->",evt)
    var i, tabcontent, stablinks;
    tabcontent = document.getElementsByClassName("tabcontent1");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    stablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < stablinks.length; i++) {
      stablinks[i].className = stablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  public openStudentInfo(evt, cityName) {
    console.log("cityname--->",evt)
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent2");
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

  public studentDetails(event, studentName) {
    console.log("event---->", event)
   
    var i, mainTabcontent, tablinks;
    mainTabcontent = document.getElementsByClassName("mainTabcontent");
    for (i = 0; i < mainTabcontent.length; i++) {
      mainTabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(studentName).style.display = "block";
    event.currentTarget.className += " active";
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

  // public showSharedSlideShow(filePath)
  // {
  //   // var filePath = 'https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf';
    
  //   this.viewSDKClient.ready().then(() => {
  //     /* Invoke file preview */
  //     this.viewSDKClient.previewFile(filePath,'pdf-div', {
  //         /* Pass the embed mode option here */
  //         embedMode: 'SIZED_CONTAINER',
  //         dockPageControls:false,
  //     });
  // });
  // }
  
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