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

The last step is to add environment files to the app, which you will be given if working with us, otherwise you will have to use your personal accounts. Below is a list of all the directories in root and where to place your env files for each directory.

**YStemAndChess**

Within the root of this directory type `cd src`

Within the src directory type `mdkir environments && cd environments`

Now you need to create the two environment files within this directory with this command `touch environment.ts && touch environment.prod.ts`

Now copy and paste the contents into these files with the env files given to you.

**chessClient**

Within this directory type `touch .env`

Then copy and paste the environment variables given for this component or use your own.

**chessServer**

Within this directory type `touch .env`

Then copy and paste the environment variables given for this component or use your own.

**stockfishServer**

Within this directory type `touch .env`

Then copy and paste the environment variables given for this component or use your own.

**middleware**

Within this directory type `touch environment.php`

Then copy and paste the environment variables given for this component or use your own.

Now you should be good to start developing!

# Quick GitHub Developer Guide

***This is a quick guide on how to develop with GitHub locally.***

**How to clone and have your own working branch locally:**
1. Create your own branch from the master branch on GitHub.
2. Clone the repo locally onto your computer, wherever you want it, using `git clone (https or ssh key)`.
3. Create that same branch locally using `git checkout -b (branch name created from step 1)`.
4. Begin developing!

**How to Push and Pull to your GitHub repo branch:**
1. Always pull from your branch on GitHub before working locally, using `git pull origin (branch name here)`.
2. Begin coding and developing what you want/tasked to do. 
3. When you are ready to push your changes to your GitHub branch, navigate to the home directory of the repo and use `git add .`. This will get all the files, in the current branch, ready for the push. This ignores all the files stated in the .gitignore.
4. Create a commit by using the command `git commit -m "(Insert commit message here. Usually the commit message is about what changes you made to the repository)"`.
5. Finish the push by using the command `git push origin (branch to push to here)`.
6. Go onto the GitHub repo on the web and create a pull request to merge your branch changes with the master branch. 
7. Merge the pull request into the master branch after consulting Alex, Benjamin, or Owen. 

Congrats! You have learned the basic commands and techniques to use GitHub!

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
After navigating inside the directory, you need to run `nodemon index.js`. This will start the stockfish server. 

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



