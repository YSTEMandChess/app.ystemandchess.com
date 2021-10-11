FROM php:apache

RUN echo "Docker file version v0.1"

SHELL ["/bin/bash", "-c"]

RUN ln -s ../mods-available/{expires,headers,rewrite}.load /etc/apache2/mods-enabled/
RUN sed -e '/<Directory \/var\/www\/>/,/<\/Directory>/s/AllowOverride None/AllowOverride All/' -i /etc/apache2/apache2.conf
COPY php.ini /usr/local/etc/php/

# Install mongo extention
RUN apt-get update && apt-get install -y openssl libssl-dev libcurl4-openssl-dev
# Install and setup mongo
RUN pecl install mongodb
# This touch command may not be neccicary, but idk.

WORKDIR /var/www/html
COPY / ./

# Run the web server.
EXPOSE 8000
CMD [ "/usr/local/bin/php", "-S", "0.0.0.0:8000" ]
