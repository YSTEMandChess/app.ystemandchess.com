#!/bin/bash

echo "Welcome to the YStem and Chess Development Server Setup"
echo "-------------------------------------------------------"
echo ""

frontEnd() {
 echo "Starting frontend development server..."
 cd ./YStemAndChess/
 ng serve
}

echo ""
phpServer() {
 echo "Starting PHP Server..."
 cd ./middleware/
 php -S localhost:8000
}

echo ""
webSockets() {
 echo "Starting Web Sockets..."
 nodemon ./chessServer/index.js
}

echo ""
chessBoard() {
 echo "Starting Chess Client..."
 cd ./chessClient/
 sudo rm -rf /var/www/html/*
 sudo cp * /var/www/html/
 cd ~/etc/apache2/sites-available/
 sudo a2ensite 000-default.conf
}

frontEnd & phpServer & webSockets & chessBoard
echo "Done."
