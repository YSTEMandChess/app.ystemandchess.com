var http = require('http');
const jsChess = require('js-chess-engine');
const querystring = require('querystring');
const url = require('url');


//create a server object:
http.createServer(function (req, res) {

    if ((url.parse(req.url, true).search) != null) {
        let params = querystring.parse((url.parse(req.url, true).search).substring(1))

        console.log(`Game notation found: ${params.fen}`);
        console.log(`Level found: ${params.level}`);

        const game = new jsChess.Game(params.fen);

        // get best ai move - level 2
        game.aiMove(params.level);

        let fen = game.exportFEN();
        res.write(fen);
    }
    else {
        res.write("Please provide all parameters");
    }
    res.end();
}).listen(8080); //the server object listens on port 8080