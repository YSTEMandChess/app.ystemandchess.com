# Installation of the Development Environment 
**NOTE: The install script does not yet work. It is still in development**
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

Now you should be good to start developing!

# Running the Development Environment

Now, it is time to start running the dev environment. As a side note, all of the development environments (except for `chessClient`) refresh when you save a file.

&nbsp; 

The frontend code is stored in the `YStemAndChess` folder. Navigate inside of that folder.

Then, run the command `ng serve`. This will start the angular developer server. It can be found by going to `http://localhost:4200`.

&nbsp; 

Now, we need to start the php server. It handles verification and communicates with the mongodb server. This is stored in the `middleware` folder. Navigate inside of it.

Now, run the command `php -S localhost:8000`. As you may have guessed, this creates a http server on the port 8000. While you most likely will not need to directly access the server, it can be found by going to `http://localhost:8000`.

&nbsp; 

Next is the chess server. This is in the directory `chessServer`. 

After navigating inside of that server, you need to run `nodemon index.js`. This will start the server on port 3000.

This is a websocket server though, so you cannot use a simple http request to access it.

&nbsp; 

The final piece of the puzzle is to add the chess client. This is in the directory `chessClient`. This can be run on any apache server however we currently look at port 80 for such server.

So, on ubuntu, in order to add such a thing, after navigating into the `chessClient` directory, run the command `sudo cp -r * /var/www/html/`. You will need to do this every time you make a change to the `chessClient` directory.

To quick run the development servers, use the command "sh startServers.sh" and type in your password when it asks for it. This will run all the current servers needed to use the development server.

***NOTE***
When using the startServers.sh script, you must kill the processes manually when you CTRL+C out of development mode. CTRL+C doesn't kill all the current processes as of right now and I am currently looking into fixing it. 
