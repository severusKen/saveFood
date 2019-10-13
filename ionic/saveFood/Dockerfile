FROM node:10.13.0

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY . ./
RUN npm install -g @angular/cli@7.1.4
RUN npm install http-server -g

RUN npm install
RUN ng build --prod --aot --output-hashing=none

CMD http-server ./www