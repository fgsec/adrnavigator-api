FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install nodemon -g --save
RUN npm install sqlite3 --save

USER node

RUN npm install
RUN npm audit fix

COPY --chown=node:node . .

EXPOSE 9898

CMD ["npm","run","start"]
