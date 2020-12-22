#Use the alpine linux nginx docker container.
FROM nginx:alpine

# Copy the conf files into the container
COPY default.conf /etc/nginx/conf.d/default.conf

COPY /dist/YStemAndChess /usr/share/nginx/html/
#CMD echo $"RewriteEngine On\nRewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]\nRewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d\nRewriteRule ^ - [L]\nRewriteRule ^ /index.html" > /usr/local/apache2/htdocs/

EXPOSE 80