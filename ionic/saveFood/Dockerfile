FROM node:10.13.0

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --save

RUN npm install -g ionic
RUN npm install -g @angular/cli@latest

COPY . ./

EXPOSE 8100

CMD ionic serve