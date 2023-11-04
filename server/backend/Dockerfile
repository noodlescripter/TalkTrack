# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR .

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port on which your application runs
EXPOSE 2000

# Set any necessary environment variables
ENV NODE_ENV=production

# Start your Node.js application
CMD [ "npm", "start" ]
