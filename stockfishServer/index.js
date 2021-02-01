require('dotenv').config();
var http = require('http').createServer(); //Create nodejs server
var stockfish = require("stockfish");
var chess = require("chess.js");

const querystring = require('querystring');
const url = require('url');

//create a server object:
http.on('request', (req, res) => {

   res.setHeader("Access-Control-Allow-Origin", "*"); //Set the header for stockfish
   res.setHeader("Content-Type", "text/plain");

   engine = stockfish(); // Initialize stockfish server

   let params = querystring.parse((url.parse(req.url, true).search).substring(1));

   var prev, curr;

   engine.onmessage = function (line) {
      if (params.info) {
         console.log(line);
         prev = curr;
         curr = line;
         if (line.substring(0, 4) == "best") {
            res.write(prev);
            res.end();
         } 
      } else
      if (line.substring(0, 4) == "best") {
         const game = new chess.Chess(params.fen);
         game.move(line.split(" ")[1], { sloppy: true });
         res.write(game.fen());
         res.end();
      }
   };

   engine.postMessage(`position fen ${params.fen}`);
   engine.postMessage(`go depth ${params.level}`);
   process.removeAllListeners();
});

//Listen on the requested port
http.listen(process.env.PORT, () => {
   console.log("listening on *:" + process.env.PORT);
});