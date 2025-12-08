# --- Stage 1: Dependency Installation & Building ---
# Using node:20-alpine as it is smaller and faster than the base image
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package files first to leverage Docker's build cache
# This means npm install only runs if package.json changes
COPY package.json package-lock.json ./

# Install project dependencies
# Use --omit=dev to skip devDependencies (like nodemon) in the final image
RUN npm install --omit=dev

# Copy all application source code
# Assuming your source code is in 'src' and script files are in 'scripts'
COPY . .

# --- Stage 2: Production Runtime ---
# Using the same base image for consistency and small size
FROM node:20-alpine

WORKDIR /app

# Copy only the necessary files from the build stage
# 1. Source code and utility files
COPY --from=build /app/src ./src
COPY --from=build /app/scripts ./scripts
COPY --from=build /app/package.json ./
# 2. Node modules (dependencies)
COPY --from=build /app/node_modules ./node_modules

# Ensure production environment is set
ENV NODE_ENV production

# Expose the port your Express app listens on (default is often 3000 or 5000)
# Check your src/app.js or config file for the exact port. Using 5000 as a placeholder.
EXPOSE 5000 

# Define the command to start your application (using the 'start' script from package.json)
# Using ['node', './src/app.js'] directly is cleaner than 'npm start' in Docker
CMD ["node", "./src/app.js"]