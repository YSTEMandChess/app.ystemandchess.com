import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play-editor',
  templateUrl: './play-editor.component.html',
  styleUrls: ['./play-editor.component.scss']
})
export class PlayEditorComponent implements OnInit {

  public chessSrc;

  constructor() { }

  ngOnInit(): void {
  }

}
