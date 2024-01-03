# Use an official Node.js runtime as a base image
FROM node

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 2400
EXPOSE 2480

# Define the command to run your application
CMD ["node", "index.js"]
