# Makefile for Astro.js Docker Compose Management

# Export Docker BuildKit
export DOCKER_BUILDKIT=1

# Colors for output
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[1;33m
BLUE := \033[0;34m
NC := \033[0m # No Color

# Default target
.DEFAULT_GOAL := help

# Check if docker-compose is available
DOCKER_COMPOSE := $(shell command -v docker-compose 2> /dev/null)
DOCKER_COMPOSE_V2 := $(shell command -v docker 2> /dev/null && docker compose version 2> /dev/null)

# Use docker compose (v2) if available, otherwise fall back to docker-compose
ifdef DOCKER_COMPOSE_V2
	COMPOSE_CMD := docker compose
else ifdef DOCKER_COMPOSE
	COMPOSE_CMD := docker-compose
else
	$(error "Neither 'docker compose' nor 'docker-compose' is available, install it first.")
endif

.PHONY: env-setup
env-setup: ## Create .env file from example
	@if [ ! -f .env ]; then \
		echo "$(YELLOW)Creating .env file from .env.example...$(NC)"; \
		cp .env.dist .env; \
		echo "$(GREEN)✅ .env file created. Please review and update as needed.$(NC)"; \
	else \
		echo "$(BLUE)ℹ️  .env file already exists$(NC)"; \
	fi

.PHONY: help dev build stop restart logs clean shell health test
## Show this help message
help:
	@echo "$(BLUE)Astro.js Docker Compose Makefile$(NC)"
	@echo ""
	@echo "$(YELLOW)Usage:$(NC)"
	@echo "  make [target]"
	@echo ""
	@echo "$(YELLOW)Targets:$(NC)"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  $(BLUE)%-12s$(NC) %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo ""
	@echo "$(YELLOW)Examples:$(NC)"
	@echo "  make dev               # Start development server"
	@echo "  make logs SERVICE=dev  # Show logs for dev service"
	@echo "  make shell SERVICE=dev # Open shell in dev container"

## Start development server with hot reload
dev:
	@echo "$(BLUE)[INFO]$(NC) Starting development environment..."
	@$(COMPOSE_CMD) up --build -d dev
	@echo "$(GREEN)[SUCCESS]$(NC) Development server started at http://localhost:4321"
	@echo "$(BLUE)[INFO]$(NC) Use 'make logs SERVICE=dev' to follow logs"

## Build the production image
build:
	@echo "$(BLUE)[INFO]$(NC) Building image..."
	@$(COMPOSE_CMD) build dev
	@echo "$(GREEN)[SUCCESS]$(NC) image built successfully"

## Stop all services
stop:
	@echo "$(BLUE)[INFO]$(NC) Stopping all services..."
	@$(COMPOSE_CMD) down
	@echo "$(GREEN)[SUCCESS]$(NC) All services stopped"

## Restart all services
restart:
	@echo "$(BLUE)[INFO]$(NC) Restarting services..."
	@$(COMPOSE_CMD) restart
	@echo "$(GREEN)[SUCCESS]$(NC) Services restarted"

## Show logs (use SERVICE=name to specify service)
logs:
ifdef SERVICE
	@$(COMPOSE_CMD) logs -f $(SERVICE)
else
	@$(COMPOSE_CMD) logs -f
endif

## Clean up containers and images
clean:
	@echo "$(BLUE)[INFO]$(NC) Cleaning up containers and images..."
	@$(COMPOSE_CMD) down --rmi all --volumes --remove-orphans
	@echo "$(GREEN)[SUCCESS]$(NC) Cleanup completed"

## Force clean (remove all Docker data)
clean-all: clean clean-cache
	@echo "$(YELLOW)[WARNING]$(NC) Removing all Docker containers, images, and volumes..."
	@docker system prune -af --volumes
	@echo "$(GREEN)[SUCCESS]$(NC) Complete cleanup finished"

## Open shell in running container (use SERVICE=name to specify service)
shell:
ifdef SERVICE
	@$(COMPOSE_CMD) exec $(SERVICE) sh
else
	@$(COMPOSE_CMD) exec dev sh
endif

## Check health status
health:
	@echo "$(BLUE)[INFO]$(NC) Checking health status..."
	@$(COMPOSE_CMD) ps
	@echo ""
	@if $(COMPOSE_CMD) exec dev wget --no-verbose --tries=1 --spider http://localhost:80/health 2>/dev/null; then \
		echo "$(GREEN)[SUCCESS]$(NC) Application is healthy"; \
	else \
		echo "$(RED)[ERROR]$(NC) Application health check failed"; \
	fi

## Run tests in container
test:
	@echo "$(BLUE)[INFO]$(NC) Running tests..."
	@$(COMPOSE_CMD) exec dev npm test

## Show container status
ps:
	@$(COMPOSE_CMD) ps

## Pull latest images
pull:
	@echo "$(BLUE)[INFO]$(NC) Pulling latest images..."
	@$(COMPOSE_CMD) pull
	@echo "$(GREEN)[SUCCESS]$(NC) Images updated"

## Show Docker and Docker Compose versions
version:
	@echo "$(BLUE)[INFO]$(NC) Docker version:"
	@docker --version
	@echo "$(BLUE)[INFO]$(NC) Docker Compose version:"
	@$(COMPOSE_CMD) --version

## Install dependencies locally (useful for IDE support)
install:
	@echo "$(BLUE)[INFO]$(NC) Installing dependencies locally..."
	@$(COMPOSE_CMD) run nodejs sh -c \
	"if [ -f pnpm-lock.yaml ]; \
	then pnpm install; elif [ -f package-lock.json ]; \
	then npm install; \
	elif [ -f yarn.lock ]; then yarn install; else npm install; fi"
	@echo "$(GREEN)[SUCCESS]$(NC) Dependencies installed"

## Run linting
lint:
	@echo "$(BLUE)[INFO]$(NC) Running linter..."
	@$(COMPOSE_CMD) exec dev npm run lint || echo "$(YELLOW)[WARNING]$(NC) No lint script found"

## Run code formatting
format:
	@echo "$(BLUE)[INFO]$(NC) Formatting code..."
	@$(COMPOSE_CMD) exec dev npm run format || echo "$(YELLOW)[WARNING]$(NC) No format script found"


## Production deployment (build + dev)
deploy: build dev
