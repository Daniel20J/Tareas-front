# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Build the Angular app
COPY . .
RUN npm run build -- --configuration production

# Production stage
FROM nginx:stable-alpine

# Copy built output to nginx html folder
COPY --from=build /app/dist/tareas-front /usr/share/nginx/html

# Use a custom nginx config to support Angular SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
