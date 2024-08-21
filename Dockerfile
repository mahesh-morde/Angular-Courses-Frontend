# Use official Node.js image for build stage
FROM node:latest as build

# Set the working directory
WORKDIR /dist/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install project dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the Angular app
RUN ng build

# Use NGINX for serving the app
FROM nginx:latest

# Copy the built Angular app to NGINX
COPY --from=build /dist/src/app/dist/angular-courses /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
