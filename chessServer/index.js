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
      if (element.student.username == parsedmsg.student || element.mentor.username == parsedmsg.mentor) {
        newGame = false;
        // Set the new client id for student or mentor.
        if (parsedmsg.role == 'student') {
          element.student.id = socket.id;
        } else if (parsedmsg.role == 'mentor') {
          element.mentor.id = socket.id;
        }

        io.emit("boardState", element.boardState);
      }
    });

    if (newGame) {
      console.log(`Creating game between: ${parsedmsg.mentor} and ${parsedmsg.student}`);
      if (parsedmsg.role == 'student') {
        ongoingGames.push({ student: { username: parsedmsg.student, id: socket.id }, mentor: { username: parsedmsg.mentor, id: "" }, boardState: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR" });
      } else if (parsedmsg.role == 'mentor') {
        ongoingGames.push({ student: { username: parsedmsg.student, id: "" }, mentor: { username: parsedmsg.mentor, id: socket.id }, boardState: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR" });
      }
      io.emit("boardState", "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
      // Set client ids,
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
    // update the board state and send to the other person.
    // {boardState: sdlfkjsk, username: sfjdslk}

  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
