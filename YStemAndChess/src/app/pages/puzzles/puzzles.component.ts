import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PuzzlesService } from 'src/app/services/puzzles/puzzles.service';
import { Chess } from 'src/app/models/Chess';
import { environment } from 'src/environments/environment';
import { setPermissionLevel } from '../../globals';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-puzzles',
    templateUrl: './puzzles.component.html',
    styleUrls: ['./puzzles.component.scss'],
})
export class PuzzlesComponent implements OnInit{
    chess;
    chessSrc;
    info = "Welcome to puzzles"
    currentFen;
    public dbIndex=0;
    
    activeState = {
        theme: 'advantage fork long opening',
        fen: 'r2qkb1r/pQ3ppp/2p2n2/3b4/2BP4/8/PP3PPP/RNB1K2R b KQkq - 0 11',
        moves: 'd5c4 b7c6 f6d7 c6c4 a8c8 c4e2',
        rating: '1313',
	  	score: 0,
		time: 0 
    };

    constructor(private ps: PuzzlesService, private sanitization: DomSanitizer) { 
	    this.chessSrc = this.sanitization.bypassSecurityTrustResourceUrl(
            environment.urls.chessClientURL
          );
          this.chess = new Chess('chessBoard', true);
	//   this.loadLessons();
    }

    ngOnInit(): void {  
 
        this.setStateAsActive(this.ps.puzzleArray[0]);
        this.activeState = this.ps.puzzleArray[0];
	  const button = document.getElementById('newPuzzle') as HTMLElement;
        
	  button.addEventListener('click', () => { 
	  	this.dbIndex = this.dbIndex+1;
    	  	if (this.dbIndex==3){
			this.dbIndex=0;	
    	  	}
	  	this.setStateAsActive(this.ps.puzzleArray[this.dbIndex]);
    	  	this.activeState = this.ps.puzzleArray[this.dbIndex];
	 	});            
	  }
	

		openDialog() {
		const dialog = document.getElementById('myDialog') as HTMLDialogElement;
 			 dialog.showModal();
		}

		closeDialog() {
		const dialog = document.getElementById('myDialog') as HTMLDialogElement;
  			dialog.close();
		}  

    setStateAsActive(state) {
        console.log("click state---->", state)
        var firstObj = {
          'theme': state.theme,
          'fen': state.fen,
          'event':''
        };
        console.log("first obj---->", firstObj)

        setTimeout(() => {
          // this.chess.newGameInit(state.fen);
          this.activeState = state;
          this.startLesson(firstObj);
        }, 500);



        }

        // loadNextLesson(){
        //   this.lessonNumber = this.lessonNumber+1;
        //   this.loadLessons();
        // }

        // loadPrevLesson(){
        //   this.lessonNumber = this.lessonNumber-1;
        //   this.loadLessons();
        // }

        // loadLessons(){

        //   this.sections = this.ls.getLearnings(this.lessonNumber);
        // }

        refresh() {
          this.chess.newGameInit(this.currentFen);
        }


        // showSubSection(event): void {



        //   /* chaging the +  and -,
        //   to highlight the button that controls the panel */
        //   /* Toggle between hiding and showing the active panel */

        //   let elText = event.srcElement.textContent;
        //   let panel = event.srcElement.nextElementSibling;
        //   const index = elText.split('').indexOf('+');

        //   if (index > -1 && index < 4) {
        //     elText = `[-] ${elText.substring(4)}`;
        //     panel.style.display = 'block';
        //   } else {
        //     elText = `[+] ${elText.substring(4)}`;
        //     panel.style.display = 'none';
        //   }
        //   event.srcElement.textContent = elText;
        // }

        startLesson({ theme, fen,event }): void {
        console.log("start lesson call---->", theme)
          this.info = this.info;
          this.chess.newGameInit(fen);
          this.currentFen = fen;

        }
}