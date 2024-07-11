FROM node:22-alpine3.19 as build

# Sets the work directory
WORKDIR /usr/src/app

# Copies the package.json file containing the dependencies
COPY package.json .

# Npm install 
RUN npm install

#
COPY . .

RUN npm run build

FROM nginx

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80
