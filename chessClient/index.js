// const $ = require('jquery');
import * as $ from 'jquery'
const {
  letParentKnow,
  updateStatus,
  flip,
  onDragStart,
  onDrop,
  onSnapEnd
} = require('./js/methods.js')
// const $ = require('jquery')
require('chess960.js')


let flag = false
let lessonFlag = false
let isLesson = false
let lessonStarted = false
let lessonBoard = ''
let lessonEnd = ''
let endSquare = ''
let previousEndSquare = ''
var squareClass = 'square-55d63'
var $board = $('#myBoard')
var board = null
var game = new Chess()

//var $status = $('#status')
//var $fen = $('#fen')
//var $pgn = $('#pgn')

var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent'
var eventer = window[eventMethod]
var messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message'

var playerColor

let startFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'

letParentKnow()

// Listen to message from parent window
eventer(
  messageEvent,
  (e) => {
    let data = JSON.parse(e.data)
    lessonFlag = data.lessonFlag
    if (lessonFlag == true) {
      isLesson = true
    }

    if (isLesson == true) {
      endSquare = data.endSquare
      lessonBoard = data.boardState
      lessonEnd = data.endState
      playerColor = data.color
      previousEndSquare = data.previousEndSquare

      if (previousEndSquare !== '') {
        $board.find('.square-' + previousEndSquare).removeClass('highlight')
      }

      if (lessonStarted == false) {
        var lessonConfig = {
          draggable: true,
          position: lessonBoard,
          onDragStart: onDragStart,
          onDrop: onDrop,
          onSnapEnd: onSnapEnd,
        }
        board = Chessboard('myBoard', lessonConfig)
        lessonStarted = true
        game.load(lessonBoard)
      } else {
        board.position(data.boardState)
        game.load(data.boardState)
        updateStatus()
      }

      $board.find('.square-' + endSquare).addClass('highlight')
    } else if (data.boardState == startFEN) {
      game = new Chess()
    }
    if (isLesson == false) {
      playerColor = data.color
      board.orientation(playerColor)
      game.load(data.boardState)
      board.position(data.boardState)
      updateStatus()
    }
  },
  false
)

var config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd,
}

if (isLesson == false) {
  board = Chessboard('myBoard', config)
}

$(window).resize(board.resize)

updateStatus()