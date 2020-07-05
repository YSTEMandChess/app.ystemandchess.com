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
        let color;
        if (parsedmsg.role == 'student') {
          element.student.id = socket.id;
          color = element.student.color;
        } else if (parsedmsg.role == 'mentor') {
          element.mentor.id = socket.id;
          color = element.mentor.color;
        }

        io.to(socket.id).emit("boardState", JSON.stringify({ boardState: element.boardState, color: color }));
      }
    });

    if (newGame) {
      console.log(`Creating game between: ${parsedmsg.mentor} and ${parsedmsg.student}`);
      let colors = [];
      if (Math.random() > 0.5) {
        colors = ["black", "white"];
      } else {
        colors = ["white", "black"];
      }


      if (parsedmsg.role == 'student') {
        ongoingGames.push({ student: { username: parsedmsg.student, id: socket.id, color: colors[0] }, mentor: { username: parsedmsg.mentor, id: "", color: colors[1] }, boardState: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR" });
        io.emit("boardState", JSON.stringify({ boardState: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR", color: colors[0] }));
      } else if (parsedmsg.role == 'mentor') {
        ongoingGames.push({ student: { username: parsedmsg.student, id: "", color: colors[0] }, mentor: { username: parsedmsg.mentor, id: socket.id, color: colors[1] }, boardState: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR" });
        io.emit("boardState", JSON.stringify({ boardState: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR", color: colors[1] }));
      }
      // Set client ids,
    }

  });

  socket.on('newState', (msg) => {
    //msg contains boardstate, find boardstate
    console.log("There is a new state found. Telling the other player");
    var parsedmsg = JSON.parse(msg);
    console.log(`The board state is: ${parsedmsg.boardState}`);
    console.log(parsedmsg);
    ongoingGames.forEach(element => {
      if (element.student.username == parsedmsg.username) {
        //pull json out of ongoing
        element.boardState = parsedmsg.boardState;
        console.log(`student emit to mentor ${element.boardState}`)
        io.to(element.mentor.id).emit("boardState", JSON.stringify({ boardState: element.boardState, color: element.mentor.color }));

      } else if (element.mentor.username == parsedmsg.username) {
        console.log(`mentor emit to student ${element.boardState}`)
        element.boardState = parsedmsg.boardState;
        io.to(element.student.id).emit("boardState", JSON.stringify({ boardState: element.boardState, color: element.student.color }))
      }
    });
    // update the board state and send to the other person.
    // {boardState: sdlfkjsk, username: sfjdslk}

  });

  socket.on('createNewGame', (msg) => {
    //msg contains boardstate, find boardstate
    let colors;
    if (Math.random() > 0.5) {
      colors = ["black", "white"];
    } else {
      colors = ["white", "black"];
    }

    var parsedmsg = JSON.parse(msg);
    ongoingGames.forEach(element => {
      if (element.student.username == parsedmsg.username) {

        element.boardState = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
        element.student.color = colors[0];
        element.mentor.color = colors[1];
        console.log(`student emit to mentor ${element.boardState}`)

        io.to(element.student.id).emit("boardState", JSON.stringify({ boardState: element.boardState, color: element.student.color }));
        io.to(element.mentor.id).emit("boardState", JSON.stringify({ boardState: element.boardState, color: element.mentor.color }));

      } else if (element.mentor.username == parsedmsg.username) {

        element.student.color = colors[0];
        element.mentor.color = colors[1];
        element.boardState = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

        io.to(element.mentor.id).emit("boardState", JSON.stringify({ boardState: element.boardState, color: element.mentor.color }));
        io.to(element.student.id).emit("boardState", JSON.stringify({ boardState: element.boardState, color: element.student.color }))
      }
    });
    // update the board state and send to the other person.
    // {boardState: sdlfkjsk, username: sfjdslk}
  });

  socket.on('flipBoard', (msg) => {
    var parsedmsg = JSON.parse(msg);
    ongoingGames.forEach(element => {
      if (element.student.username == parsedmsg.username || element.mentor.username == parsedmsg.username) {
        element.student.color = (element.student.color == "black") ? "white" : "black";
        element.mentor.color = (element.mentor.color == "black") ? "white" : "black";
        io.to(element.student.id).emit("boardState", JSON.stringify({ boardState: element.boardState, color: element.student.color }))
        io.to(element.mentor.id).emit("boardState", JSON.stringify({ boardState: element.boardState, color: element.mentor.color }))
      }
    });
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
