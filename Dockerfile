FROM node:latest
MAINTAINER Olivier Cartier <cestoliv@chevro.fr>

WORKDIR /app
COPY package.json /app
RUN npm install

COPY server.js /app
COPY jokes.js /app

EXPOSE 80
CMD [ "npm", "start" ]