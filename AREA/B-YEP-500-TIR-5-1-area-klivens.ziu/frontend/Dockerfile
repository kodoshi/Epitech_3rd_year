# pull the base image
FROM node:15.6.0

# set the working direction
WORKDIR /frontend

# add `/app/node_modules/.bin` to $PATH
ENV PATH /frontend/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./


RUN npm install

# add app
COPY . ./


CMD ["sh", "-c", "ln -sf /var/lib/apk/client.apk public/ && npm start"]