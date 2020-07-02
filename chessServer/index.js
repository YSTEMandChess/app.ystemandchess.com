var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var ongoingGames = [];

io.on('connection', (socket) => {
  console.log('a user connected');
  // On the connection of a new game being found.
  socket.on('newGame', (msg) => {
    newGame = true;
    var parsedmsg = JSON.parse(msg);
      ongoingGames.forEach(element => {
        if (element.student == parsedmsg.student || element.mentor == parsedmsg.mentor) {
          newGame = false;
          io.emit("boardState", element.boardState);
        }
      });

    if (newGame) {
      console.log(`Creating game between: ${parsedmsg.mentor} and ${parsedmsg.student}`);
      ongoingGames.push({ student: parsedmsg.student, mentor: parsedmsg.mentor, boardState: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR" });
      io.emit("boardState", "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    }

  });

  socket.on('newState', (msg) => {

  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
