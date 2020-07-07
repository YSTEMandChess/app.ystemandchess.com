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
}

echo ""
chessBoard() {
 echo "Starting Chess Client..."
 cd ./chessClient/
 sudo a2ensite /etc/apache2/sites-available/ystemandchess.conf
}

frontEnd & phpServer & webSockets & chessBoard
echo "Done."
