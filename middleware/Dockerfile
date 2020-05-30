FROM php
WORKDIR /code

RUN apt-get update && apt-get install -y openssl libssl-dev libcurl4-openssl-dev
# Install ands setup mongo
RUN pecl install mongodb
RUN touch /usr/local/etc/php/php.ini
RUN echo "extension=mongodb.so" >>  /usr/local/etc/php/php.ini

# Run in the directory.
RUN [ "/usr/local/bin/php", "-S", "localhost:8000" ]
