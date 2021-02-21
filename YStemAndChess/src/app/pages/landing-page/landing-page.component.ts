import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  donation_answer_display: boolean = false;
  sponsor_answer_display: boolean = false;
  contact_answer_display: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public answerClicked(p_id) {
    if(p_id === "donation-answer") {

      if(this.donation_answer_display) { this.hideAnswer(p_id); }
      else {  this.showAnswer(p_id); }
      this.donation_answer_display = !this.donation_answer_display;

    } else if(p_id === "sponsor-answer") {

      if(this.sponsor_answer_display) { this.hideAnswer(p_id); }
      else { this.showAnswer(p_id); }
      this.sponsor_answer_display = !this.sponsor_answer_display;

    } else if(p_id === "contact-answer") {

      if(this.contact_answer_display) { this.hideAnswer(p_id); }
      else { this.showAnswer(p_id); }
      this.contact_answer_display = !this.contact_answer_display;

    }
  }

  public hideAnswer(p_id) {
    document.getElementById(p_id).style.display = "none";
  } 

  public showAnswer(p_id) {
    document.getElementById(p_id).style.display = "block";
  }

}
