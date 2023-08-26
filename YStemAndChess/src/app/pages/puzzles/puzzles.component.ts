import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PuzzlesService } from 'src/app/services/puzzles/puzzles.service';
import { Chess } from 'src/app/models/Chess';
import { environment } from 'src/environments/environment';
import { setPermissionLevel } from '../../globals';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

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
    prevFen; // used to rollback on incorrect player moves
    moveList;
    themeList;
    playerColor;
    playerMove = []; // used to check player move against the correct move
    prevMove = []; // used to rollback highlights for the previous computer move
    public dbIndex=0;
    
    activeState = {
      "PuzzleId":"YzaYa",
      "FEN":"2kr3r/1pp2ppp/p1pb1n2/4q3/NPP1P3/P2P1P1P/5P2/R1BQ1RK1 w - - 1 16",
      "Moves":"d3d4 e5h2",
      "Rating":910,
      "RatingDeviation":76,
      "Popularity":96,
      "NbPlays":128,
      "Themes":"mate mateIn1 middlegame oneMove",
      "GameUrl":"https://lichess.org/nPeulvcd#31"
    };

    constructor(private ps: PuzzlesService, private sanitization: DomSanitizer) { 
	    this.chessSrc = this.sanitization.bypassSecurityTrustResourceUrl(
            environment.urls.chessClientURL
          );
          this.chess = new Chess('chessBoard', true);
	//   this.loadLessons();
    }

    ngOnInit(): void {
      this.shuffleArray(this.ps.puzzleArray);

      this.setStateAsActive(this.ps.puzzleArray[0]);
      this.activeState = this.ps.puzzleArray[0];
      // getting the move list and theme list of the puzzle when we start up
      this.moveList = this.activeState.Moves.split(" ");
      this.themeList = this.activeState.Themes.split(" ");
      this.updateInfoBox();

      // get elements
	    const newPuzzle = document.getElementById('newPuzzle') as HTMLElement;
      const openDialog = document.getElementById('openDialog') as HTMLElement;
      const closeDialog = document.getElementById('closeDialog') as HTMLElement;
      
      // add event listener to buttons
	    newPuzzle.addEventListener('click', () => { 
        this.dbIndex = this.dbIndex+1;
        // loop back to start if we reached the end of the array
        if (this.dbIndex==this.ps.puzzleArray.length){
          this.dbIndex=0;	
        }
        this.setStateAsActive(this.ps.puzzleArray[this.dbIndex]);
        this.activeState = this.ps.puzzleArray[this.dbIndex];
        // getting the move list and theme list of the puzzle whenever we update the active state
        this.moveList = this.activeState.Moves.split(" ");
        this.themeList = this.activeState.Themes.split(" ");
        this.updateInfoBox();
	 	  });

      openDialog.addEventListener('click', () => this.openDialog());
      closeDialog.addEventListener('click', () => this.closeDialog());


      // Listen to message from child window, originally from play-nolog.component.ts, adjusted
      var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
      var eventer = window[eventMethod];
      var messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';
      eventer(
        messageEvent,
        (e) => {
          // print out event e
          console.log('e: ', e);
          // store the data as info
          let info = e.data;

          if (info[0] === "{"){
            let jsonInfo = JSON.parse(info)

            // store the move info if it was a player move
            if ("from" in jsonInfo && "to" in jsonInfo){
              this.playerMove[0] = jsonInfo.from;
              this.playerMove[1] = jsonInfo.to;
            }
          }

          // if it exists and is not an object
          if (info && typeof info !== "object"){
            if (this.isFen(info)){
              this.prevFen = this.currentFen;
              // update the current FEN and color
              this.currentFen = info;
            
              // get the chessBoard
              var chessBoard = (<HTMLFrameElement>(
                document.getElementById('chessBoard')
              )).contentWindow;

              // post the new FEN and color so board is updated
              // note that we are posting the message to the chessClient
              chessBoard.postMessage(
                JSON.stringify({
                  boardState: this.currentFen
                }),
                environment.urls.chessClientURL
              );
            }

            // if the user have just moved, the computer should move
            // check if it is the computer's move
            var activeColor = this.currentFen.split(" ")[1];

            // make sure that activeColor actually exists (not undefined)
            // otherwise we would be incorrectly calling shift() on moveList
            if (activeColor && activeColor !== this.playerColor){
              
              // before the computer moves, first check if the user's move was correct
              var move = this.getMove();
              if (move[0] !== this.playerMove[0] || move[1] !== this.playerMove[1]){

                // if the move doesn't match, revert the move, add the move back to move list
                this.moveList.unshift(move[0] + move[1]);

                // reset the fen to previous fen and post message
                this.currentFen = this.prevFen;
                chessBoard.postMessage(
                  JSON.stringify({
                    boardState: this.currentFen
                  }),
                  environment.urls.chessClientURL
                );
                
                // since we reverted the board state, we also need to revert the highlight
                chessBoard.postMessage(
                  JSON.stringify({
                    highlightFrom: this.prevMove[0],
                    highlightTo: this.prevMove[1]
                  }),
                  environment.urls.chessClientURL
                );

              }
              else{
                // if the user move is valid
                // first check if we're at the end of puzzle
                if (this.moveList.length == 0){
                  // if we're at the end, send a pop up to notify user that puzzle is completed
                  setTimeout(() => {
                    Swal.fire('Puzzle completed', 'Good Job', 'success').then(                  
                      // clicking ok on the pop up will simulate a click on the "Get New Puzzle" button
                      function(){
                        const button = document.getElementById('newPuzzle') as HTMLElement;
                        button.click();
                      }
                    );
                  }, 200);
                }
                else{
                  // if we're not at the end, computer should move
                  // get the move and parse it into useable form
                  var move = this.getMove();
                  var moveFrom = move[0];
                  var moveTo = move[1];
                  
                  // the computer just moved, update prevMove
                  this.prevMove[0] = move[0];
                  this.prevMove[1] = move[1];
                  
                  setTimeout(() => {
                    chessBoard.postMessage(
                      JSON.stringify({
                        from: moveFrom,
                        to: moveTo
                      }),
                      environment.urls.chessClientURL
                    );
                  }, 500);
                }
              }
            }
          }
        }
      )
    }
	

    openDialog() {
      //console.log("open dialog clicked");
      //const dialog = document.getElementById('myDialog') as HTMLDialogElement;
      //dialog.open = true;
      // dialog.showModal();
      var hintText = document.getElementById('hint-text');
      if (hintText.style.display === "block") {
        document.getElementById('hint-text').style.display = "none";
      }
      else {
        document.getElementById('hint-text').style.display = "block";
      }
    }
  
    closeDialog() {
      const dialog = document.getElementById('myDialog') as HTMLDialogElement;
      dialog.close();
    } 

    setStateAsActive(state) {
        console.log("click state---->", state)
        this.playerColor = state.FEN.split(" ")[1];

        var firstObj = {
          'theme': state.Themes,
          'fen': state.FEN,
          'event':''
        };
        console.log("first obj---->", firstObj)

        setTimeout(() => {
          // this.chess.newGameInit(state.fen);
          this.activeState = state;
          this.startLesson(firstObj);
        }, 500);
    }

    refresh() {
      this.chess.newGameInit(this.currentFen);
    }

    startLesson({ theme, fen, event }): void {
      console.log("start lesson call---->", theme)
      this.info = this.info;

      var color;
      // this is backwards because the first move is the computer's
      // so if the active color is black, then player is white, and vice versa
      if (this.playerColor === "b"){
        this.playerColor = "w";
        color = "white";
      }
      else{
        this.playerColor = 'b';
        color = "black";
      }

      this.chess.newGameInit(fen, color);
      this.currentFen = fen;

      // testing: trying to get a piece to move by itself
      // get the chessBoard
      var chessBoard = (<HTMLFrameElement>(
        document.getElementById('chessBoard')
      )).contentWindow;
          
      // get the first move from the list
      var move = this.getMove();
      var firstMoveFrom = move[0];
      var firstMoveTo = move[1];

      // the computer just moved, update prevMove
      this.prevMove[0] = move[0];
      this.prevMove[1] = move[1];
          
      setTimeout(() => {
        chessBoard.postMessage(
          JSON.stringify({
            from: firstMoveFrom,
            to: firstMoveTo
          }),
          environment.urls.chessClientURL
        );
      }, 500)

    }

    getMove() {
      // get the first move from the list
      var move = this.moveList.shift();
      // from: first two characters of a move
      var moveFrom = move.slice(0,2);
      // to: last two characters of a move
      var moveTo = move.slice(2,4);

      return [moveFrom, moveTo];
    }

    updateInfoBox(){
      // this function only gets the info currently
      var hints = ""; 

      for (var i = 0; i < this.themeList.length; i++){
        hints += "<b>" + this.ps.themesName[this.themeList[i]] + "</b>" + ": \n" + this.ps.themesDescription[this.themeList[i]]
        if (i != this.themeList.length-1){
          hints += "\n\n"
        }
      }

      var hintText = document.getElementById("hint-text");
      hintText.style.display = "none"
      hintText.innerHTML = hints;

    }

    // basic check for if a string is a fen
    isFen(fen){
      return fen.split("/").length == 8;
    }

    // shuffle array function referenced from stack overflow
    // for randomizing the puzzle array at start up so you don't always get the same order of puzzles
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }
}
