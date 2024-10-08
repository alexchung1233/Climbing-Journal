# Installs the node image with an alias
FROM node:22-alpine3.19 as build

# Sets the work directory
WORKDIR /usr/src/app

# Copies the package.json file containing the dependencies
COPY package.json .

# Npm install 
RUN npm install

# Copies all the files from the directory (excluding .dockerignore)
COPY . .

# Builds the static files for serving
RUN npm run build

# Installs the nginx image
FROM nginx

# Copies from the multistage node image the static files to nginx
COPY --from=build /usr/src/app/src/dist /usr/share/nginx/html

# Exposes the port 80
EXPOSE 80
