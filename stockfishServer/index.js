require('dotenv').config();
var http = require('http').createServer(); //Create nodejs server
var stockfish = require("stockfish");
var chess = require("chess.js");

const querystring = require('querystring');
const url = require('url');
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');

//create a server object:
http.on('request', (req, res) => {

   res.setHeader("Access-Control-Allow-Origin", "*"); //Set the header for stockfish
   res.setHeader("Content-Type", "application/json");

   engine = stockfish(); // Initialize stockfish server

   let params = querystring.parse((url.parse(req.url, true).search).substring(1));

   var lines = [];

   engine.onmessage = function (line) {
      console.log(line);
      if (params.info) {
         lines.push(line);
         if (line.substring(0, 4) == "best") {
            res.write(JSON.stringify(lines));
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

   //console.log(`position fen ${params.fen} moves ${params.move}`);
   engine.postMessage(`position fen ${params.fen} moves ${params.move}`);
   engine.postMessage(`go depth ${params.level}`);
   process.removeAllListeners();
});

//Listen on the requested port
http.listen(process.env.PORT, () => {
   console.log("listening on *:" + process.env.PORT);
});