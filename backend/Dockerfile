FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY src/ ./src/
COPY tsconfig.json ./

# Copy shared types (mounted as volume)
RUN mkdir -p /app/types

# Build the application
RUN npm run build

# Expose port
EXPOSE 4001

# Start the application
CMD ["npm", "start"]