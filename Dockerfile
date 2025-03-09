# Use the official Node.js image as the base image
FROM node:22.14

# Set the working directory inside the container
WORKDIR /usr/src/app

COPY prisma ./

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

RUN apt-get update && apt-get install --only-upgrade wget

# Install the application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]