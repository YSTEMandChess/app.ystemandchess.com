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
    prevFen;
    moveList;
    playerColor;
    playerMove = [];
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
      // getting the move list of the puzzle when we start up
      this.moveList = this.activeState.moves.split(" ");
	    const button = document.getElementById('newPuzzle') as HTMLElement;
      
	    button.addEventListener('click', () => { 
        this.dbIndex = this.dbIndex+1;
        if (this.dbIndex==3){
          this.dbIndex=0;	
        }
        this.setStateAsActive(this.ps.puzzleArray[this.dbIndex]);
        this.activeState = this.ps.puzzleArray[this.dbIndex];
        // getting the move list for the puzzle whenever we update the active state
        this.moveList = this.activeState.moves.split(" ");
	 	  });


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
                console.log(this.moveList); // debug
                
                // reset the fen to previous fen and post message
                this.currentFen = this.prevFen;
                chessBoard.postMessage(
                  JSON.stringify({
                    boardState: this.currentFen
                  }),
                  environment.urls.chessClientURL
                );
              }
              else{
                // debug: print move list
                console.log(this.moveList);
                
                if (this.moveList.length == 0){
                  setTimeout(() => {
                    Swal.fire('Puzzle completed', 'Good Job', 'success').then(function(){
                      const button = document.getElementById('newPuzzle') as HTMLElement;
                      button.click();
                    });
                  }, 200);
                }
                else{
                  // get the move and parse it into useable form
                  var move = this.getMove();
                  var moveFrom = move[0];
                  var moveTo = move[1];
                  
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
      const dialog = document.getElementById('myDialog') as HTMLDialogElement;
      //dialog.showModal();
    }
  
    closeDialog() {
      const dialog = document.getElementById('myDialog') as HTMLDialogElement;
      dialog.close();
    }
    
    setStateAsActive(state) {
        console.log("click state---->", state)
        this.playerColor = state.fen.split(" ")[1];
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

        var firstObj = {
          'theme': state.theme,
          'fen': state.fen,
          'color': color,
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
      this.chess.newGameInit(fen);
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

    // basic check for if a string is a fen
    isFen(fen){
      return fen.split("/").length == 8;
    }
}