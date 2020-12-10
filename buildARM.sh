#!/bin/sh
rm frontend/src/version.js
cp version.js frontend/src/version.js
cat frontend/src/version.js
update-binfmts --enable
echo "Image will be tagged with $CI_COMMIT_BRANCH"
if [ "$CI_COMMIT_BRANCH" = "dev" ]; then
    export BRANCH_VERSION="dev-latest"
else
    export BRANCH_VERSION="test-latest"
fi
echo "First tag is:  $CI_IMAGE:${VERSION_PREFIX}$(cat VERSION.txt)"
echo "Second tag is:  $CI_IMAGE:${VERSION_PREFIX}$TAG_VERSION"
export DOCKER_CLI_EXPERIMENTAL=enabled
docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
docker buildx create --driver docker-container --use
docker buildx inspect --bootstrap
update-binfmts --enable
docker buildx build --push -t "$CI_IMAGE:${VERSION_PREFIX}$(cat VERSION.txt)" -t "$CI_IMAGE:${VERSION_PREFIX}$TAG_VERSION" \
                    --platform "$PLATFORM" \
                    --cache-from $CI_IMAGE:${VERSION_PREFIX}latest \
                    --build-arg BUILDKIT_INLINE_CACHE=1 .