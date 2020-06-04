FROM php

# Make sure that we are in the correct directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY / .

# Install mongo extention
RUN apt-get update && apt-get install -y openssl libssl-dev libcurl4-openssl-dev php-mongodb
# Install and setup mongo
RUN pecl install mongodb
# This touch command may not be neccicary, but idk.
RUN touch /usr/local/etc/php/php.ini
RUN echo "extension=mongodb.so" >>  /usr/local/etc/php/php.ini

# Run the web server.
EXPOSE 8000
CMD [ "/usr/local/bin/php", "-S", "0.0.0.0:8000" ]
