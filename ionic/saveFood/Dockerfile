FROM node:10.13.0

COPY . /home/node/app
WORKDIR /home/node/app

RUN npm install

RUN npm install -g ionic
RUN npm install -g @angular/cli@latest

EXPOSE 8100

CMD ionic serve --address 0.0.0.0 --disableHostCheck true