#! /bin/sh
docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
docker buildx create --driver docker-container --use
docker buildx inspect --bootstrap