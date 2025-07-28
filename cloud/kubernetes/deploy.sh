#!/bin/bash
set -ex

# Enable automatic export, source .env, then disable
set -a
source ../../.env
set +a

# Re-evaluate SHA_SHORT since it contains a command
export SHA_SHORT=$(git rev-parse --short HEAD)

# Apply the deployments
for f in ./*.yaml ; do
  if [[ $f == *"deployment.yaml" ]]; then
    cat $f | envsubst | kubectl apply -f -
  else
    cat $f | envsubst | kubectl apply -f -
  fi
done