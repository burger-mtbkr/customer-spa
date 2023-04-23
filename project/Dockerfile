# Use the official Node.js 16 image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package*.json yarn.lock ./

# Install the app's dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN yarn build

# Expose the container's port 3000
EXPOSE 3000

# Start the app when the container starts
CMD ["yarn", "start"]
