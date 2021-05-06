#Use the alpine linux nginx docker container.
#FROM nginx:alpine

# Copy the conf files into the container
#COPY default.conf /etc/nginx/conf.d/default.conf

#COPY /dist/YStemAndChess /usr/share/nginx/html/
#CMD echo $"RewriteEngine On\nRewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]\nRewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d\nRewriteRule ^ - [L]\nRewriteRule ^ /index.html" > /usr/local/apache2/htdocs/

#EXPOSE 80

FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g @angular/cli@9.1.8 @angular-devkit/build-angular && npm install

COPY . .

EXPOSE 80

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "80", "--disable-host-check", "--poll", "1"]
