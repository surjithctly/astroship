#!/bin/bash
set -ex

# Enable automatic export, source .env, then disable
set -a
source ../../.env
set +a

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Building Astro.js application...${NC}"

# Get the current git SHA
export SHA_SHORT=$(git rev-parse --short HEAD)
echo -e "${YELLOW}Building with SHA: ${SHA_SHORT}${NC}"


# Build the Docker image
echo -e "${YELLOW}Building Docker image...${NC}"
docker buildx build --platform linux/amd64,linux/arm64 -t "${GCP_REGISTRY}/${GCLOUD_PROJECT}/${REPOSITORY}/${PACKAGE}:${SHA_SHORT}" ../..

# Tag as latest
docker tag "${GCP_REGISTRY}/${GCLOUD_PROJECT}/${REPOSITORY}/${PACKAGE}:${SHA_SHORT}" \
           "${GCP_REGISTRY}/${GCLOUD_PROJECT}/${REPOSITORY}/${PACKAGE}:latest"

echo -e "${GREEN}Docker image built successfully!${NC}"

# Push to registry
if [ "$1" = "--push" ]; then
    echo -e "${YELLOW}Pushing to registry...${NC}"
    gcloud auth configure-docker ${GCP_REGISTRY}
    docker push "${GCP_REGISTRY}/${GCLOUD_PROJECT}/${REPOSITORY}/${PACKAGE}:${SHA_SHORT}"
    docker push "${GCP_REGISTRY}/${GCLOUD_PROJECT}/${REPOSITORY}/${PACKAGE}:latest"
    echo -e "${GREEN}Image pushed successfully!${NC}"
fi

echo -e "${GREEN}Build completed successfully!${NC}"
