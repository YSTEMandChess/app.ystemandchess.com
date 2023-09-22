require("dotenv").config();
var http = require("http").createServer(); //Create nodejs server
var chess = require("chess.js");
var Stockfish = require("stockfish");
const querystring = require("querystring");
const url = require("url");
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");

//create a server object:
http.on("request", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //Set the header for stockfish
  res.setHeader("Content-Type", "application/json");

  const engine = Stockfish(); // Initialize stockfish server

  let params = querystring.parse(url.parse(req.url, true).search?.substring(1));
  console.log("params -> ",params)
  var maxLevel = 30;
  var lines = [];

  engine.onmessage = function (line) {
    console.log("line -> ",line)
    if (params.info) {
      lines.push(line);
      if (line.substring(0, 4) == "best") {
        console.log("lines -> ",lines)
        res.write(JSON.stringify(lines));
        res.end();
      }
    } else if (line.substring(0, 4) == "best") {
      console.log("paramsssss -> ",params)
      const game = new chess.Chess(params.fen);
      const result = game.move(line.split(" ")[1], { sloppy: true });
      console.log("result -> ",result)
      // check for the result exist or not
      if(result)
      {
        const color = result.color;
        const image = result.piece.toUpperCase();
        const move = color + image;
        const target = result.to;
        res.write(game.fen());
        res.write(` move:${move}`);
        res.write(`target:${target}`);
        res.end();
      }
      else
      {
        console.log("Else called");
        res.end();
      }
    }
  };

  //limit maximum dpeth
  if (params.level > maxLevel) {
    params.level = maxLevel;
  }
  console.log(`position fen ${params.fen} moves ${params.move}`);
  engine.postMessage(`position fen ${params.fen} moves ${params.move}`);
  engine.postMessage(`go depth ${params.level}`);
  // process.removeAllListeners();
});

//Listen on the requested port
http.listen(process.env.PORT, () => {
  console.log("listening on *:" + process.env.PORT);
});
