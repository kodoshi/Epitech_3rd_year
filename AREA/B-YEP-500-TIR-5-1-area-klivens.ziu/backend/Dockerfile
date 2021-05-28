FROM node:15.6.0

WORKDIR /backend

ENV PATH /backend/node_modules/.bin:$PATH

COPY package*.json ./

COPY . .

RUN npm install

CMD [ "npm", "start" ]