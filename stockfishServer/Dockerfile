FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm ci --only=production

COPY . .

EXPOSE 8080
<<<<<<< HEAD
CMD [ "node", "index.js" ]
=======

CMD [ "node", "index.js" ]

>>>>>>> 3c6495f7e80dba30e99548a7cfdfdc8f2efbcb41
