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
      //msg contains boardstate, find boardstate
      var parsedmsg = JSON.parse(msg);
      ongoingGames.forEach(element => {
        if (element.student.username == parsedmsg.username) {
          //pull json out of ongoing
          element.boardState = msg.boardState;
          io.to(element.mentor.id).emit("boardState", element.boardState);
        } else if (element.mentor.username == parsedmsg.username) { 
          element.boardState = msg.boardState;
          io.to(element.student.id).emit("boardState", element.boardState);
        }
      });
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
