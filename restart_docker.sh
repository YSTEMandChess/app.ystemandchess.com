#!/bin/bash

docker-compose down
bash tag_build_containers.sh
docker-compose up -d