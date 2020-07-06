# Installation of the Development Enviroment 
To quick install the dev enviromnet, use the script I have created called `setup.sh`. This should provide a good installation provided you type in your password a couple of time and are on ubuntu.

However if you want to do it the long way, follow along down below. (All commands are given for ubuntu/debian)

The first thing that you need to install is node.js.
to do this, run `sudo apt install nodejs`.

Now you need to install the angular cli.
to do this, run `sudo npm install -g @angular/cli`
and you will also need to install `sudo npm install -g @angular-devkit/build-angular`.

Now that you are done with that, you will need to install php.
If you don't already have it, run the command `sudo apt install php`.

Now we need to install nodemon, express, and socket.io.
To do this, run the command: `sudo npm install -g express nodemon socket.io` 

Finally, we need to install the mongodb driver.
to do this, run the command `sudo apt install -y php-pear php-dev`

then, you need to run the command `sudo pecl install mongodb`
then you need to add the line `extention=mongodb.so` to your php.ini file.
This can be found using the command `php -i | grep "Loaded Configuration File" | awk '{print $5}'`.

Now you should be good to start developing!

# Runing the Development Enviroment
