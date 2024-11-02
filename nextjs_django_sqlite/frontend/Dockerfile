# frontend/Dockerfile
# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose the frontend port
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "dev"]

