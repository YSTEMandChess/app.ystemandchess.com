require('dotenv').config();
var http = require('http');
var stockfish = require("stockfish");
var chess = require("chess.js");

const querystring = require('querystring');
const url = require('url');

//create a server object:
http.createServer((req, res) => {


    res.setHeader("Access-Control-Allow-Origin", "*")
    if ((url.parse(req.url, true).search) != null) {


        var engine = stockfish();

        engine.onmessage = function (line) {
            if (line.substring(0, 4) == "best") {
                let params = querystring.parse((url.parse(req.url, true).search).substring(1))
                console.log(`Best move was found: ${line}`)
                const game = new chess.Chess(params.fen);
                game.move(line.split(" ")[1], { sloppy: true });
                res.write(game.fen());
                res.end();
            }
        };


        let params = querystring.parse((url.parse(req.url, true).search).substring(1))

        console.log(`Game notation found: ${params.fen}`);
        console.log(`Level found: ${params.level}`);

        engine.postMessage("uci");
        engine.postMessage(`position fen ${params.fen}`);
        engine.postMessage(`go depth ${params.level}`);
    }
    else {
        res.write("Please provide all parameters");
        res.end();
    }

}).listen(process.env.PORT); //the server object listens on port 8080
console.log("listening on *:" + process.env.PORT);