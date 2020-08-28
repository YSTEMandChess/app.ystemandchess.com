import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-play-lesson',
  templateUrl: './play-lesson.component.html',
  styleUrls: ['./play-lesson.component.scss']
})
export class PlayLessonComponent implements OnInit {

  public chessLessonSrc;

  constructor(private sanitizer: DomSanitizer) { 
    this.chessLessonSrc = sanitizer.bypassSecurityTrustResourceUrl(environment.urls.chessClientURL)
  }

  ngOnInit(): void {
  }

}
