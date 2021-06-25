# Installation of the Development Environment
##### Linux

To do this, run `sudo apt install nodejs`.

##### Windows

To do this, go download [node.js](https://nodejs.org/en/download/).
&nbsp;
Now you need to install the **angular cli**.

##### Linux

To do this, run `sudo npm install -g @angular/cli`
and you will also need to install `sudo npm install -g @angular-devkit/build-angular`.

##### Windows

To do this, run `npm install -g @angular/cli` in **Git Bash**.
**_If somehow Git Bash isn't installed for you, you can download it [here](https://gitforwindows.org/)_**.

&nbsp;

##### Linux

Please install apache2 using the command `sudo apt update` followed with `sudo apt install apache2`.

##### Windows

Please install apache2 [here](https://httpd.apache.org/docs/2.4/platform/windows.html).
Once you are done downloading the .zip file, extract it to any location you want.
The first step, after extracting the .zip file, is to set the environment variable for it. Add the
location of the `<Insert Path Here>Apache24/bin` folder to the PATH environment variable.

&nbsp;

Now we need to install **nodemon, express, and socket.io**.

##### Linux

To do this, run the command: `sudo npm install -g express nodemon socket.io`

##### Windows

To do this, run the command: `npm install -g express nodemon socket.io`
**_If nothing shows up, continue waiting. It installs in the background and should let you know when it's complete._**
&nbsp;

Now go into the chessClient directory and run `npm i dotenv`
Repeat this step in chessServer as well
&nbsp;

## Adding Environment Variables

The last step is to add environment files to the app, which you will be given if working with us. To do this automatically you should have been given a `create_envs.sh` script. Run it from the scripts directory by typing `cd scripts` then `bash create_envs.sh`.

Below is a list of all the directories in root and where to place your env files for each directory if you want to do it manually.

###### THIS IS ONLY TESTED ON UBUNTU

**YStemAndChess**

Within the root of this directory type `cd src`

Within the src directory type `mkdir environments && cd environments`

Now you need to create the two environment files within this directory with this command `touch environment.ts && touch environment.prod.ts`

Now copy and paste the content given into these files.

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

**_This is a quick guide on how to develop with GitHub locally._**

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

&nbsp;

# Running the Development Environment

Now, it is time to start running the development environment. As a side note, all of the development environments (except for `chessClient`) refresh when you save a file.
&nbsp;

Another side note, please run `npm install` in the following folders before starting the environment: `YStemAndChess, chessServer, stockfishServer, middlewareNode`. You only need to run this command **ONCE** unless you add more packages/dependencies to project folders. Also, please use `sudo` when running the commands in an ***macOS or Linux*** environment!

&nbsp;

The frontend code is stored in the `YStemAndChess` folder. Navigate inside of that folder.  Then, run the command `ng serve`. This will start the angular developer server. It can be found by going to `http://localhost:4200`.
If angular can't be found in /usr/, a possible solution is to cd into the YStemAndChess folder and install local modules with:  
`npm install express nodemon socket.io`  
`npm install @angular-devkit/build-angular`  
In the event of NGCC failing with an unhandled exception:  
In tsconfig.json, in angularCompilerOptions set ("enableIvy": false)
As per: https://stackoverflow.com/questions/61222467/angular-9-ngcc-fails-with-an-unhandled-exception
&nbsp;

Now, we need to start the middleware server. It handles verification and communicates with the mongodb server. This is stored in the `middlewareNode` folder. Navigate inside of it.
Now, run the command `npm run server`. As you may have guessed, this creates a http server on the port 8000. While you most likely will not need to directly access the server, it can be found by going to `http://localhost:8000`.
&nbsp;

Next is the chess server. This is in the directory `chessServer`.
After navigating inside of that server, you need to run `nodemon index.js`. This will start the server on port 3000.
This is a websocket server though, so you cannot use a simple http request to access it.
&nbsp;

Following the chess server, we need to run the stockfish server to allow players to play with an AI. This is done in the directory 'stockfishServer'.
After navigating inside the directory, you need to run `nodemon index.js`. This will start the stockfish server.
&nbsp;

The final piece of the puzzle is to add the chess client. This is in the directory `chessClient`. This can be run on any apache server however we currently look at port 80 for such server.
So, on ubuntu, in order to add such a thing, after navigating into the `chessClient` directory, run the command `cp -r * /var/www/html/`. You will need to do this every time you make a change to the `chessClient` directory.

On Windows, it will be a little different. First, figure out where Apache was installed on your hard drive. It's usually found in `Program Files` folder. Once you found it, navigate into the folder and then enter the folder htdocs. Copy and paste all the files from chessClient into this folder. Afterwards, go into your terminal and run the command `httpd -k install` followed by `httpd -k start`. This will install apache as a windows service and then start the application. After this, you should be able to go to "http://localhost" and see the chessboard there. 
&nbsp;
More info can be found here: https://httpd.apache.org/docs/trunk/platform/windows.html

2. If you are trying to launch the project on "http://localhost/" , ensure that `npm i dotenv` is ran in the following fodlers inside the project.
   (chessClient, chessServer, stockfishServer)

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

# New Middleware Wiki

This is an API used to commmuncate data betweent the database and front end. The API is written on NodeJS.
