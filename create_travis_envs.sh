#!/bin/bash

printf "Creating environment files and variables\n\n"

#Creating environment files and variables for YStemAndChess
printf "Creating environment files for YStemAndChess\n"
cd YStemAndChess/src && mkdir environments
cd environments

#Creating and adding environment.ts file and variables
touch environment.ts
printf "export const environment = {\n" >> environment.ts
printf "    production: false,\n" >> environment.ts
printf "      agora: {\n" >> environment.ts
printf "     appId: ' ',\n" >> environment.ts
printf "    },\n" >> environment.ts
printf "    urls: {\n" >> environment.ts
printf "      middlewareURL: 'http://127.0.0.1:8000',\n" >> environment.ts
printf "      chessClientURL: 'http://localhost',\n" >> environment.ts
printf "      stockFishURL : 'http://127.0.0.1:8080',\n" >> environment.ts
printf "      chessServerURL : 'http://127.0.0.1:3000'\n" >> environment.ts
printf "    }\n" >> environment.ts
printf "  };\n" >> environment.ts

#Creating and adding environment.prod.ts file and environment variables
touch environment.prod.ts
printf "export const environment = {\n" >> environment.prod.ts
printf "    production: false,\n" >> environment.prod.ts
printf "      agora: {\n" >> environment.prod.ts
printf "     appId: ' ',\n" >> environment.prod.ts
printf "    },\n" >> environment.prod.ts
printf "    urls: {\n" >> environment.prod.ts
printf "      middlewareURL: 'http://127.0.0.1:8000',\n" >> environment.prod.ts
printf "      chessClientURL: 'http://localhost',\n" >> environment.prod.ts
printf "      stockFishURL : 'http://127.0.0.1:8080',\n" >> environment.prod.ts
printf "      chessServerURL : 'http://127.0.0.1:3000'\n" >> environment.prod.ts
printf "    }\n" >> environment.prod.ts
printf "  };\n" >> environment.prod.ts

printf "YStemAndChess env files completed!\n\n"

#Back to root
cd ../../..

#Creating environment files and variables for middleware
printf "Creating environment file and variables for middleware\n"

cd middleware

touch environment.php
printf "<?php\n" >> environment.php
printf "    \$_ENV[\"indexKey\"]=\" \";\n" >> environment.php
printf "    \$_ENV[\"key\"]=\" \";\n" >> environment.php
printf "    \$_ENV[\"secret\"]=' ';\n" >> environment.php
printf "    \$_ENV[\"mongoCredentials\"]=' ';\n" >> environment.php
printf "    \$_ENV[\"appID\"]=' ';\n" >> environment.php
printf "    \$_ENV[\"auth\"]=' ';\n" >> environment.php
printf "    \$_ENV[\"channel\"]=\"10000\";\n" >> environment.php
printf "    \$_ENV[\"uid\"]=\" \";\n" >> environment.php
printf "    \$_ENV[\"awsAccessKey\"]=\" \";\n" >> environment.php
printf "    \$_ENV[\"awsSecretKey\"]=\" \";\n" >> environment.php
printf " ?>\n" >> environment.php

printf "middleware environment file complete\n\n"

#Back to root
cd ..

#Create environment file for chessServer
printf "Creating environment files for chessServer\n"

cd chessServer

touch .env

printf "PORT=3000\n" >> .env

printf "chessServer environment files complete\n\n"

#Back to root
cd ..

#Creating environment files for chessClient
printf "Creating environment files for chessClient\n"

cd chessClient

touch .env

printf "PARENT = *\n" >> .env

printf "chessClient environment files complete\n\n"

#Back to root
cd ..

#Create environment files for stockfishServer
printf "Create environment files for stockfishServer\n\n"

cd stockfishServer

touch .env

printf "PORT=8080\n" >> .env

printf "stockfishServer environment files complete\n\n"

#Back to root
cd ..

printf "Environment files complete"