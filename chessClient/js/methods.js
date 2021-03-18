
function flip() {
    board.flip()
}

function letParentKnow() {
    if (flag === false) {
        parent.postMessage('ReadyToRecieve', '*')
        //parent.postMessage("ReadyToRecieve", "http://localhost:4200");
    }
    flag = true
}


function onDragStart(source, piece, position, orientation) {
    // do not pick up pieces if the game is over
    if (isLesson == false) {
        if (game.game_over()) {
            sendGameOver()
            return false
        }
    }

    if (playerColor === 'black') {
        if (piece.search(/^w/) !== -1) return false
    } else if (playerColor === 'white') {
        if (piece.search(/^b/) !== -1) return false
    }

    // only pick up pieces for the side to move
    if (
        (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)
    ) {
        return false
    }
}

function onDrop(source, target) {
    // see if the move is legal
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q', // NOTE: always promote to a queen for example simplicity
    })

    // illegal move
    if (move === null) return 'snapback'

    if (isLesson == false) {
        if (game.game_over()) {
            sendGameOver()
        }
    }

    updateStatus()
    sendToParent(game.fen())
}


function sendToParent(fen) {
    parent.postMessage(fen, '*')
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd() {
    board.position(game.fen())
}

function updateStatus() {
    var status = ''

    var moveColor = 'White'
    if (game.turn() === 'b') {
        moveColor = 'Black'
    }

    // checkmate?
    if (isLesson == false) {
        if (game.in_checkmate()) {
            status = 'Game over, ' + moveColor + ' is in checkmate.'
            sendCheckmate()
        }

        // draw?
        else if (game.in_draw()) {
            status = 'Game over, drawn position'
            sendDraw()
        }
    }

    // game still on
    else {
        status = moveColor + ' to move'

        // check?
        if (game.in_check()) {
            status += ', ' + moveColor + ' is in check'
        }
    }
}

function sendGameOver() {
    parent.postMessage('gameOver', '*')
}

function sendDraw() {
    parent.postMessage('draw', '*')
}

function sendCheckmate() {
    parent.postMessage('checkmate', '*')
}

module.exports = {
    letParentKnow,
    updateStatus,
    flip,
    onDragStart,
    onDrop,
    onSnapEnd,
    
}
