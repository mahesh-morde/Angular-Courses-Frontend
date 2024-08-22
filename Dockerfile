# Use official Node.js image for build stage
FROM node:latest AS build

# Set the working directory to the root of the Angular project
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install project dependencies
RUN npm install

# Copy the entire project   

COPY . .

# Build the Angular app
RUN ng build --output-path /app/dist/angular-courses/

# Use NGINX for serving the app
FROM nginx:latest

# Copy the built Angular app to NGINX
COPY --from=build /app/dist/angular-courses/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]