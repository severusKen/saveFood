FROM node:10.13.0

RUN adduser node root

COPY . /home/node/app
WORKDIR /home/node/app

RUN npm install

RUN npm install -g ionic
RUN npm install -g @angular/cli@latest
RUN ng build --prod --aot --output-hashing=none

EXPOSE 8100

CMD ionic serve -- --disable-host-check -- --disable-host-check