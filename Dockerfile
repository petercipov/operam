FROM node:12.8.0-alpine
WORKDIR /usr/src/app

COPY ./backend ./backend
COPY ./web ./web

RUN cd ./backend && npm install \
 && cd ../web && npm install && npm run build

EXPOSE 4000
WORKDIR /usr/src/app/backend
CMD [ "node", "index.js" ]