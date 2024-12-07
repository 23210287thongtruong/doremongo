FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only the package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose the application port
EXPOSE 3000

# Default command to run the application in development mode
CMD ["npm", "run", "dev"]