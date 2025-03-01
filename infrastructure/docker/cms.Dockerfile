FROM node:20-alpine

WORKDIR /app

# Install Strapi CLI
RUN npm install -g @strapi/strapi@latest

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Install additional dependencies required by Strapi admin
RUN npm install react@18.2.0 react-dom@18.2.0 react-router-dom@5.3.4 styled-components@5.3.11

# Create uploads directory
RUN mkdir -p ./public/uploads

# Copy the application
COPY . .

# Expose port
EXPOSE 1337

# Make start script executable
COPY start.sh ./
RUN chmod +x start.sh

# Start the application in development mode
CMD ["./start.sh"]
