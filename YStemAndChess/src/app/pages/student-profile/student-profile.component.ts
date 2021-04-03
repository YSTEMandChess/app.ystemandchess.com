import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { data } from './placeholderData';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {

  constructor() { }

  public activeTab: string;
  data: any[] = data;

  // options
  public showLabels: boolean = true;
  public animations: boolean = true;
  public xAxis: boolean = true;
  public  yAxis: boolean = true;
  public timeline: boolean = false;
  public yScaleMin: number = 1100;
  public yScaleMax: number = 1300;
  public xScaleMin: Date = new Date(2020, 1);


  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  
  ngOnInit(): void {
    this.activeTab = "activity";
    
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  public onTabClick(tabName: string) {
    this.activeTab = tabName;
  }

}
