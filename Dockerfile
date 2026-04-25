# syntax=docker/dockerfile:1
# ===== BUILD STAGE =====
FROM node:20-alpine AS builder

WORKDIR /app

# Optimized: copy package files first to leverage Docker layer caching
COPY package*.json ./
RUN npm ci --silent

# Copy source and build
COPY . .
RUN npm run build

# ===== PRODUCTION STAGE =====
# Optimized: nginx:alpine is ~23MB — minimal attack surface, fast startup
FROM nginx:stable-alpine AS production

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Custom nginx config: SPA routing support
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Cloud Run requires listening on port 8080
EXPOSE 8080

# Health check for Cloud Run
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
