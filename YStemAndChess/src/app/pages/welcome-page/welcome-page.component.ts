import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  public slides = [
    { src: "../../../assets/images/welcome-slides/Final YStem Slideshow-01.png"},
    { src: "../../../assets/images/welcome-slides/Final YStem Slideshow-02.png"},
    { src: "../../../assets/images/welcome-slides/Final YStem Slideshow-03.png"},
    { src: "../../../assets/images/welcome-slides/Final YStem Slideshow-04.png"},
    { src: "../../../assets/images/welcome-slides/Final YStem Slideshow-05.png"},
    { src: "../../../assets/images/welcome-slides/Final YStem Slideshow-06.png"},
    { src: "../../../assets/images/welcome-slides/Final YStem Slideshow-07.png"},
    { src: "../../../assets/images/welcome-slides/Final YStem Slideshow-08.png"},
    { src: "../../../assets/images/welcome-slides/Final YStem Slideshow-09.png"},
    { src: "../../../assets/images/welcome-slides/Final YStem Slideshow-10.png"},
    { src: "../../../assets/images/welcome-slides/Final YStem Slideshow-11.png"},
    { src: "../../../assets/images/welcome-slides/Final YStem Slideshow-12.png"},
    { src: "../../../assets/images/welcome-slides/Final YStem Slideshow-13.png"},
    { src: "../../../assets/images/welcome-slides/Final YStem Slideshow-14.png"}
  ]

  currentSlide = 0;

  constructor() { }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? 0 : previous;
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    //this.slides.length - 1 
    this.currentSlide = next === this.slides.length ? 13 : next;
  }

  ngAfterViewInit() {
    const autoscroll = setInterval(() => {
      if(this.currentSlide === this.slides.length-2){
        clearInterval(autoscroll);
      }
      this.onNextClick();
    }, 4000)
  }

  ngOnInit(): void {
    this.preloadImages();
  }
  preloadImages() {
    for(const slide of this.slides) {
      new Image().src = slide.src;
    }
  }
}
