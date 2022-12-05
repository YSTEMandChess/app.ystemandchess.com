#!/bin/bash
#version=$1;
#echo $version > ./currentVersion.txt
#sudo echo "TAG="$version > ../compose/.env

services=(YStemAndChess chessClient chessServer middlewareNode stockfishServer)

cd ..

for service in "${services[@]}"
do

    echo "Starting to build image for - $service"

    cd $service
    imagename=`echo "$service" | awk '{ print tolower($0) }'`

    echo 'Image name to be used -' $imagename

    docker build -t $imagename .

    cd ..

done
