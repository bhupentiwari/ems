# Use a smaller base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install --production

# Bundle app source
COPY . .

# Expose port 3001 to the outside world
EXPOSE 3001

# Command to run your Node.js server
CMD [ "npm", "start" ]
