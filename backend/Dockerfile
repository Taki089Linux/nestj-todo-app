# Use Node.js Alpine for a smaller image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock before installing dependencies
COPY package.json yarn.lock ./

# Install dependencies with Yarn
RUN yarn install --frozen-lockfile

# Copy all source files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["yarn", "start:dev"]
