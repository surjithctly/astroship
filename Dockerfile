# Base stage with common dependencies
FROM node:18-alpine AS base
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

FROM base AS dev
# Copy package files for dependency installation
COPY ./package.json ./pnpm-lock.yaml ./

# Install all dependencies (including devDependencies)
RUN --mount=type=cache,target=/app/.pnpm-store \
    pnpm config set store-dir /app/.pnpm-store && \
    pnpm install --frozen-lockfile

# Expose the dev server port
EXPOSE 4321

# Start the development server
CMD ["pnpm", "run", "dev", "--host", "0.0.0.0"]

# Production stage
FROM dev AS production
# Install only production dependencies
RUN --mount=type=cache,target=/app/.pnpm-store \
    pnpm config set store-dir /app/.pnpm-store && \
    pnpm install --frozen-lockfile --prod

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Remove development dependencies and clean cache
RUN pnpm prune --prod && \
    pnpm store prune && \
    rm -rf /app/.pnpm-store

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S astro -u 1001

# Change ownership of app directory
RUN chown -R astro:nodejs /app
USER astro

EXPOSE 4321
CMD ["pnpm", "run", "start", "--host", "0.0.0.0"]