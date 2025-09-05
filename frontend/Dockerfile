FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY src/ ./src/
COPY index.html ./
COPY vite.config.ts ./
COPY tsconfig*.json ./

# Copy shared types (mounted as volume)
RUN mkdir -p /app/types

# Expose port
EXPOSE 5174

# Start the development server
CMD ["npm", "run", "dev"]