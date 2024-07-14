# Get the Node image
FROM node:22-alpine3.19

# Update packges
RUN sudo apt-get update && sudo apt-get upgrade 

WORKDIR /usr/src/server

COPY package*.json .

RUN npm install

COPY . .

RUN npm install

EXPOSE 5000

CMD ["node", "index.js"]