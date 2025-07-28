# Docker Development Guide

This project includes a comprehensive Makefile for different use cases.

## Quick Start

### Using Make

```bash
# Show all available commands
make help

# Start development server with hot reload
make dev

# Build production image
make build

# Stop all services
make stop

# Clean up everything
make clean
```

### Using Docker Compose Directly

```bash
# Development
docker-compose up --build dev

# Stop
docker-compose down
```

## Available Services

- **dev**: Development server with hot reload (port 4321)

## Useful Commands

### Development
```bash
make dev                    # Start dev server
make logs SERVICE=dev       # Follow dev logs
make shell SERVICE=dev      # Open shell in dev container
```

### Maintenance
```bash
make clean                  # Remove containers and images
make clean-all              # Complete Docker cleanup
make pull                   # Update base images
```

### Advanced
```bash
make test                   # Run tests
make lint                   # Run linter
make format                 # Format code
```

## Environment Variables

You can set these in a `.env` file:

```env
NODE_ENV=development
ASTRO_HOST=0.0.0.0
ASTRO_PORT=4321
```

## Troubleshooting

### Port conflicts
```bash
# Check what's using the port
lsof -i :3000
lsof -i :4321

# Kill process using port
kill -9 $(lsof -t -i:3000)
```

### Container issues
```bash
# View container logs
make logs SERVICE=app

# Open shell for debugging
make shell SERVICE=app

# Restart services
make restart
```

### Clean slate
```bash
# Complete cleanup and restart
make clean-all
make dev
```

## Package Manager Detection

The Dockerfiles automatically detect your package manager:
- If `pnpm-lock.yaml` exists: uses pnpm
- If `package-lock.json` exists: uses npm  
- If `yarn.lock` exists: uses yarn
- Otherwise: defaults to npm

## Performance Tips

1. Use `.dockerignore` to exclude unnecessary files
2. Multi-stage builds reduce final image size
3. Use `make build` to pre-build images for faster startup
4. Use `make install` for local IDE support without containers
