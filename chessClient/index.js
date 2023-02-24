let flag = false;
let lessonFlag = false;
let isLesson = false;
let lessonStarted = false;
let lessonBoard = "";
let lessonEnd = "";
let endSquare = "";
let previousEndSquare = "";
var squareClass = "square-55d63";
var $board = $("#myBoard");
var board = null;
var game = new Chess();
var whiteSquareGrey = '#eebe7bf7';
var blackSquareGrey = '#ae5716d6';

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

var playerColor;

let startFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

letParentKnow();

function removeGreySquares () {
  $('#myBoard .square-55d63').css('background', '');
  $('#myBoard .square-55d63').css('background-image', '');
  $('#myBoard .square-55d63').css('background-position', '');
}

function greySquare (square) {
  var $square = $('#myBoard .square-' + square)

  var background = whiteSquareGrey
  if ($square.hasClass('black-3c85d')) {
    background = blackSquareGrey
  }

  $square.css('background', background);
  $square.css('background-position', 'center');
  $square.css('background-image', "url('img/chesspieces/wikipedia/dot.png')");
}
// Listen to message from parent window
eventer(
  messageEvent,
  (e) => {
    let data = JSON.parse(e.data);
    lessonFlag = data.lessonFlag;
    if (lessonFlag == true) {
      isLesson = true;
    }

    if (isLesson == true) {
      endSquare = data.endSquare;
      lessonBoard = data.boardState;
      lessonEnd = data.endState;
      playerColor = data.color;
      previousEndSquare = data.previousEndSquare;

      if (previousEndSquare !== "") {
        $board.find(".square-" + previousEndSquare).removeClass("highlight");
      }

      if (lessonStarted == false) {
        var lessonConfig = {
          draggable: true,
          showNotation:true,
          position: lessonBoard,
          onDragStart: onDragStart,
          onDrop: onDrop,
          onMouseoutSquare: onMouseoutSquare,
          onMouseoverSquare: onMouseoverSquare,
          onSnapEnd: onSnapEnd,
        };
        board = Chessboard("myBoard", lessonConfig);
        var overlay = new ChessboardArrows('board_wrapper');
        lessonStarted = true;
        game.load(lessonBoard);
      } else {
        board.position(data.boardState);
        game.load(data.boardState);
        updateStatus();
      }

      $board.find(".square-" + endSquare).addClass("highlight");
    } else if (data.boardState == startFEN) {
      game = new Chess();
    }
    if (isLesson == false) {
      playerColor = data.color;
      board.orientation(playerColor);
      game.load(data.boardState);
      board.position(data.boardState);
      updateStatus();
    }
  },
  false
);

function flip() {
  board.flip();
}

function letParentKnow() {
  if (flag === false) {
    parent.postMessage("ReadyToRecieve", "*");
  }
  flag = true;
}

function onDragStart(source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (isLesson == false) {
    if (game.game_over()) {
      sendGameOver();
      return false;
    }
  }

  if (playerColor === "black") {
    if (piece.search(/^w/) !== -1) return false;
  } else if (playerColor === "white") {
    if (piece.search(/^b/) !== -1) return false;
  }

  // only pick up pieces for the side to move
  if (
    (game.turn() === "w" && piece.search(/^b/) !== -1) ||
    (game.turn() === "b" && piece.search(/^w/) !== -1)
  ) {
    return false;
  }
}

function onDrop(source, target, draggedPieceSource) {
  removeGreySquares();
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: "q", // NOTE: always promote to a queen for example simplicity
  });

  // illegal move
  if (move === null) return "snapback";

  if (isLesson == false) {
    if (game.game_over()) {
      sendGameOver();
    }
  }

  updateStatus();
  sendToParent(`piece-${draggedPieceSource}`);
  sendToParent(`target:${move.to}`);
  sendToParent(game.fen());
}
// To add possible move suggestion on chessboard
function onMouseoverSquare (square, piece) {
  // get list of possible moves for this square
  var moves = game.moves({
    square: square,
    verbose: true
  })

  // exit if there are no moves available for this square
  if (moves.length === 0) return

  // highlight the possible squares for this piece
  for (var i = 0; i < moves.length; i++) {
    greySquare(moves[i].to)
  }
}
// To remove possible move suggestion on chessboard
function onMouseoutSquare (square, piece) {
  removeGreySquares()
}


function sendToParent(fen) {
  parent.postMessage(fen, "*");
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd() {
  board.position(game.fen());
}

function updateStatus() {
  var status = "";

  var moveColor = "White";
  if (game.turn() === "b") {
    moveColor = "Black";
  }

  // checkmate?
  if (isLesson == false) {
    if (game.in_checkmate()) {
      status = "Game over, " + moveColor + " is in checkmate.";
      sendCheckmate();
    }

    // draw?
    else if (game.in_draw()) {
      status = "Game over, drawn position";
      sendDraw();
    }
  }

  // game still on
  else {
    status = moveColor + " to move";

    // check?
    if (game.in_check()) {
      status += ", " + moveColor + " is in check";
    }
  }
}

function sendGameOver() {
  parent.postMessage("gameOver", "*");
}

function sendDraw() {
  parent.postMessage("draw", "*");
}

function sendCheckmate() {
  parent.postMessage("checkmate", "*");
}

// chessboard arrows 
var ChessboardArrows = function (id, RES_FACTOR = 2, COLOUR = 'rgb(0, 128,0,1)') {

  const NUM_SQUARES = 8;
  var resFactor, colour, drawCanvas, drawContext, primaryCanvas, primaryContext, initialPoint, mouseDown
  
  resFactor = RES_FACTOR;
  colour = COLOUR; 
  
  // drawing canvas
  drawCanvas = document.getElementById('drawing_canvas');
  drawContext = changeResolution(drawCanvas, resFactor);
  setContextStyle(drawContext);
  
  // primary canvas
  primaryCanvas = document.getElementById('primary_canvas');
  primaryContext = changeResolution(primaryCanvas, resFactor);
  setContextStyle(primaryContext);
  
  // setup mouse event callbacks
  var board = document.getElementById(id);
  board.addEventListener("mousedown", function(event) { onMouseDown(event); });
  board.addEventListener("mouseup", function(event) { onMouseUp(event); });
  board.addEventListener("mousemove", function(event) { onMouseMove(event); });
  board.addEventListener('contextmenu', function (e) { e.preventDefault(); }, false);
  
  // initialise vars
  initialPoint = { x: null, y: null };
  finalPoint = { x: null, y: null };
  arrowWidth = 15;
  mouseDown = false;
  
  
  // source: https://stackoverflow.com/questions/808826/draw-arrow-on-canvas-tag
  function drawArrow(context, fromx, fromy, tox, toy, r) {
    var x_center = tox;
    var y_center = toy;
    var angle, x, y;
    
    context.beginPath();
    
    angle = Math.atan2(toy-fromy,tox-fromx)
    x = r*Math.cos(angle) + x_center;
    y = r*Math.sin(angle) + y_center;
  
    context.moveTo(x, y);
    
    angle += (1/3)*(2*Math.PI)
    x = r*Math.cos(angle) + x_center;
    y = r*Math.sin(angle) + y_center;
    
    context.lineTo(x, y);
    
    angle += (1/3)*(2*Math.PI)
    x = r*Math.cos(angle) + x_center;
    y = r*Math.sin(angle) + y_center;
    
    context.lineTo(x, y);
    context.closePath();
    context.fill();
  }
  
  function getMousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: Q(evt.clientX - rect.left),
        y: Q(evt.clientY - rect.top)
      };
  }
  
  function setContextStyle(context) {
      context.strokeStyle = context.fillStyle = colour;
      context.lineJoin = 'butt';
  }
  
  function onMouseDown(event) {
      if (event.which == 3) { // right click
          mouseDown = true;
          initialPoint = finalPoint = getMousePos(drawCanvas, event);
          drawCircle(drawContext, initialPoint.x, initialPoint.y, primaryCanvas.width/(resFactor*NUM_SQUARES*2) - 1);
      }
  }
  
  function onMouseUp(event) {
      if (event.which == 3) { // right click
          mouseDown = false;
          // if starting position == ending position, draw a circle to primary canvas
          if (initialPoint.x == finalPoint.x && initialPoint.y == finalPoint.y) {
              drawCircle(primaryContext, initialPoint.x, initialPoint.y, primaryCanvas.width/(resFactor*NUM_SQUARES*2) - 1); // reduce radius of square by 1px
          }
          // otherwise draw an arrow 
          else {
              drawArrowToCanvas(primaryContext);
          }
          drawContext.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
      }
      else if (event.which == 1) { // left click
          // clear canvases
          drawContext.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
          primaryContext.clearRect(0, 0, primaryCanvas.width, primaryCanvas.height);
      }
  }
  
  function onMouseMove(event) {
      finalPoint = getMousePos(drawCanvas, event);
  
      if (!mouseDown) return;
      if (initialPoint.x == finalPoint.x && initialPoint.y == finalPoint.y) return;
  
      drawContext.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
      drawArrowToCanvas(drawContext);
  }
  
  function drawArrowToCanvas(context) {
      // offset finalPoint so the arrow head hits the center of the square
      var xFactor, yFactor, offsetSize;
      if (finalPoint.x == initialPoint.x) {
          yFactor = Math.sign(finalPoint.y - initialPoint.y)*arrowWidth;
          xFactor = 0
      }
      else if (finalPoint.y == initialPoint.y) {
          xFactor = Math.sign(finalPoint.x - initialPoint.x)*arrowWidth;
          yFactor = 0;
      }
      else {
          // find delta x and delta y to achieve hypotenuse of arrowWidth
          slope_mag = Math.abs((finalPoint.y - initialPoint.y)/(finalPoint.x - initialPoint.x));
          xFactor = Math.sign(finalPoint.x - initialPoint.x)*arrowWidth/Math.sqrt(1 + Math.pow(slope_mag, 2));
          yFactor = Math.sign(finalPoint.y - initialPoint.y)*Math.abs(xFactor)*slope_mag;
      }
  
      // draw line
      context.beginPath();
      context.lineCap = "round";
      context.lineWidth = 8;
      context.moveTo(initialPoint.x, initialPoint.y);
      context.lineTo(finalPoint.x - xFactor, finalPoint.y - yFactor);
      context.stroke();
  
      // draw arrow head
      drawArrow(context, initialPoint.x, initialPoint.y, finalPoint.x - xFactor, finalPoint.y - yFactor, arrowWidth);
  }
  
  function Q(x, d) {  // mid-tread quantiser
      d = primaryCanvas.width/(resFactor*NUM_SQUARES);
      return d*(Math.floor(x/d) + 0.5);
  }
  
  function drawCircle(context, x, y, r) {
      context.beginPath();
      context.lineWidth = 4;
      context.arc(x, y, r, 0, 2 * Math.PI);
      context.stroke();
  }
  
  // source: https://stackoverflow.com/questions/14488849/higher-dpi-graphics-with-html5-canvas
  function changeResolution(canvas, scaleFactor) {
      // Set up CSS size.
      canvas.style.width = canvas.style.width || canvas.width + 'px';
      canvas.style.height = canvas.style.height || canvas.height + 'px';
  
      // Resize canvas and scale future draws.
      canvas.width = Math.ceil(canvas.width * scaleFactor);
      canvas.height = Math.ceil(canvas.height * scaleFactor);
      var ctx = canvas.getContext('2d');
      ctx.scale(scaleFactor, scaleFactor);
      return ctx;
  }
  
}
var config = {
  draggable: true,
  showNotation:true,
  position: "start",
  onDragStart: onDragStart,
  onDrop: onDrop,
  onMouseoutSquare: onMouseoutSquare,
  onMouseoverSquare: onMouseoverSquare,
  onSnapEnd: onSnapEnd,
};

if (isLesson == false) {
  board = Chessboard("myBoard", config);
  var overlay = new ChessboardArrows('board_wrapper');
}

$(window).resize(board.resize);

updateStatus();
