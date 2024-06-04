# Use the official Node.js image for version 19.3.0
FROM node:19.3.0

# Set the working directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Bundle app source
COPY . .

# Copy .env file
COPY .env .env

# Expose the port the app runs on
EXPOSE 3000

# ENV NAME HyperByte_Careers-test-api
# CMD [ "node", "index.js" ]

# Command to run the development server
CMD [ "npm", "run", "dev" ]

