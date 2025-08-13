# Use an official Node.js runtime as a base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app files
COPY . .

# Expose frontend port
EXPOSE 5173

# Run frontend
CMD ["npm", "run", "dev"]