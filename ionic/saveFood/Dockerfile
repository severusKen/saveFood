FROM node:10.13.0

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g @angular/cli@7.1.4

COPY . /usr/src/app

CMD ng serve --host 0.0.0.0 --port 4200