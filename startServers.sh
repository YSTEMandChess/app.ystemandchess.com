#!/bin/bash

echo "Welcome to the YStem and Chess Development Server Setup"
echo "-------------------------------------------------------"
echo ""

frontEnd() {
 echo "Starting frontend development server..."
 cd ./YStemAndChess/
 ng serve
 cd ..
}

echo ""
phpServer() {
 echo "Starting PHP Server..."
 cd ./middleware/
 php -S localhost:8000
 cd ..
}

echo ""
webSockets() {
 echo "Starting Web Sockets..."
 nodemon ./chessServer/index.js
 cd ..
}

echo ""
chessBoard() {
 echo "Starting Chess Client..."
 cd ./chessClient/
 sudo rm -rf /var/www/html/*
 sudo cp * /var/www/html/
}

frontEnd & phpServer & webSockets & chessBoard
echo "Done."
