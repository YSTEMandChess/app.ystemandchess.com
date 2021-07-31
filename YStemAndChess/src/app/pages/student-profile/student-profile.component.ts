import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { data } from './placeholderData';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})

export class StudentProfileComponent implements OnInit {

  constructor(private cookie: CookieService, private activatedRoute: ActivatedRoute) { }

  public studentObj;

  public fullName;
  public joinDate;
  
  public isLoaded: boolean = false;
  public activeTab: string;
  data: any[] = data;

  // options
  public showLabels: boolean = true;
  public animations: boolean = true;
  public xAxis: boolean = true;
  public yAxis: boolean = true;
  public yScaleMin: number = 1100;
  public yScaleMax: number = 1300;
  public xScaleMin: Date = new Date(2020, 1);


  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  
  ngOnInit(): void {
    this.activeTab = "activity";
    this.getUser();
  }

  async getUser() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    let response = await fetch(environment.urls.middlewareURL + '/user/' + id, {
      headers: {
        'Authorization': `Bearer ${this.cookie.get('login')}`
      }
    });
    let status = await response.status;
    let result = await response.json();
    console.log(result);
    
    this.studentObj = result[0];
    if(status == 200) {
      this.isLoaded = true;
    }

    this.setUserInfo();
  }

  private setUserInfo() {
    this.fullName = this.studentObj.firstName + " " + this.studentObj.lastName;
    this.joinDate = new Date(this.studentObj.accountCreatedAt * 1000).toLocaleDateString();    
  }

  // Chart event handlers

  onSelect(data): void {
  }

  onActivate(data): void {
  }

  onDeactivate(data): void {
  }

  public onTabClick(tabName: string) {
    this.activeTab = tabName;
  }

}
