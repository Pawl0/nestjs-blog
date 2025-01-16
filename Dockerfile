# Start from a base image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install -g pnpm nest typescript
RUN pnpm install

# Copy the rest of the application
COPY . .

RUN pnpm db:generate
RUN pnpm build

# Expose the port your application will run on
EXPOSE 3000

# Start the application
CMD [ "pnpm", "start:prod" ]