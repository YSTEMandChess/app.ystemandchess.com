# Installation of the Development Environment 
To quick install the dev environment, use the script I have created called `setup.sh`. This should provide a good installation provided you type in your password a couple of time and are on ubuntu.

&nbsp; 

However if you want to do it the long way, follow along down below. (All commands are given for ubuntu/debian as this is the only development environment we use)

&nbsp; 

The first thing that you need to install is **node.js**.

to do this, run `sudo apt install nodejs`.

&nbsp; 

Now you need to install the **angular cli**.

to do this, run `sudo npm install -g @angular/cli`

and you will also need to install `sudo npm install -g @angular-devkit/build-angular`.


&nbsp; 


Now that you are done with that, you will need to install **php**.

If you don't already have it, run the command `sudo apt install php`.


&nbsp; 


Now we need to install **nodemon, express, and socket.io**.

To do this, run the command: `sudo npm install -g express nodemon socket.io` 


&nbsp; 


Finally, we need to install the **mongodb driver**.

to do this, run the command `sudo apt install -y php-pear php-dev`


then, you need to run the command `sudo pecl install mongodb`

then you need to add the line `extension=mongodb.so` to your php.ini file.

This can be found using the command `php -i | grep "Loaded Configuration File" | awk '{print $5}'`.

&nbsp; 


&nbsp;

Now go into the chessClient directory and run `npm i dotenv`

Repeat this step in chessServer as well

&nbsp;

Now you should be good to start developing!

# Running the Development Environment

Now, it is time to start running the dev environment. As a side note, all of the development environments (except for `chessClient`) refresh when you save a file.

&nbsp; 

The frontend code is stored in the `YStemAndChess` folder. Navigate inside of that folder.

Then, run the command `ng serve`. This will start the angular developer server. It can be found by going to `http://localhost:4200`.

If angular can't be found in /usr/, a possible solution is to cd into the YStemAndChess folder and install local modules with:   
`sudo npm install express nodemon socket.io`  
`sudo npm install @angular-devkit/build-angular`  

In the event of NGCC failing with an unhandled exception:  
In tsconfig.json, in angularCompilerOptions set ("enableIvy": false)
As per: https://stackoverflow.com/questions/61222467/angular-9-ngcc-fails-with-an-unhandled-exception


&nbsp; 

Now, we need to start the php server. It handles verification and communicates with the mongodb server. This is stored in the `middleware` folder. Navigate inside of it.

Now, run the command `php -S localhost:8000`. As you may have guessed, this creates a http server on the port 8000. While you most likely will not need to directly access the server, it can be found by going to `http://localhost:8000`.

&nbsp; 

Next is the chess server. This is in the directory `chessServer`. 

After navigating inside of that server, you need to run `nodemon index.js`. This will start the server on port 3000.

This is a websocket server though, so you cannot use a simple http request to access it.

&nbsp; 

Following the chess server, we need to run the stockfish server to allow players to play with an AI. This is done in the directory 'stockfishServer'.
After navigating inside the directory, you need to run 'nodemon index.js'. This will start the stockfish server. 

&nbsp;

The final piece of the puzzle is to add the chess client. This is in the directory `chessClient`. This can be run on any apache server however we currently look at port 80 for such server.

So, on ubuntu, in order to add such a thing, after navigating into the `chessClient` directory, run the command `sudo cp -r * /var/www/html/`. You will need to do this every time you make a change to the `chessClient` directory.

# Running Tests in YStemAndChess Directory

We use karma and jasmine to test front end functionality. To run tests simply run `ng test` inside of the YStemAndChess directory. Tests will automatically be re-run whenever you make a saved change to the source code. If tests do not work you may need to go into the `karma.conf.js` file in root and add your browser to the browsers array. 

&nbsp; 

# Adding New Lessons

Adding new lessons to the YStem app is farily simple. All one must do is under the "lessons" collection, select the piece you wish to add a lesson for. You need to add a lesson number, start FEN, end FEN, and end square so it can be highlighted on the board. If you do not want to highlight a square on the board simply leave that section blank. Below is an example of input for lessons being created.


`lessonNumber: 5`

`startFEN : "rnbqkbnr/pppppppp/8/8/8/8/PPP4P/RNBQKB1R w KQkq - 0 1"`

`endFEN: "rnbqkbnr/pppppppp/8/8/2P5/8/PP5P/RNBQKB1R b KQkq - 1 1"`

`endSquare: "e4"`


Once this is added to the database the lesson will be generated when a user reaches that lesson number. I like to use https://lichess.org/editor to create a starting lesson FEN. From there it is easiest to get the ending lesson FEN by going to that lesson number on the YStem app and moving to the desired end position. The current FEN will be output in the browser console. The reason the end FEN cannot be achieved in other editors is becuase they do not update color and turns completed. Plus you have to see which moves Stockfish makes when you move to the end square. Stockfish will always make the same move if you do, becuase stockfish will only make the optimal move.



