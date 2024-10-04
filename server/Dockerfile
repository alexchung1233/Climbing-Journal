# Get the Node image
FROM node:22-alpine3.19

# Update packges
RUN apk update && apk upgrade 

WORKDIR /server

COPY package*.json /server/

RUN npm install

COPY . /server/

EXPOSE 5000

CMD ["node", "server.js"]