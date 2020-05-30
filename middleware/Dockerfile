FROM php

# Make sure that we are in the correct directory
WORKDIR /code

# Install mongo extention
RUN apt-get update && apt-get install -y openssl libssl-dev libcurl4-openssl-dev
# Install and setup mongo
RUN pecl install mongodb
# This touch command may not be neccicary, but idk.
RUN touch /usr/local/etc/php/php.ini
RUN echo "extension=mongodb.so" >>  /usr/local/etc/php/php.ini

# Run the web server.
RUN [ "/usr/local/bin/php", "-S", "localhost:8000" ]
