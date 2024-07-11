# Get the Node image
FROM node:22-alpine3.19

# Update packges
RUN sudo apt-get update && sudo apt-get upgrade 

RUN mkdir -P /usr/src/app/node_modules && chown -R usr:usr /usr/src/app/node_modules

WORKDIR /usr/src/app

COPY . .

COPY package*.json ./

USER usr

RUN npm install

COPY --chown=usr:usr . .

EXPOSE 8080

CMD ["node", "index.js"]