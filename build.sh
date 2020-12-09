#! /bin/sh
rm frontend/src/version.js
cp version.js frontend/src/version.js
cat frontend/src/version.js
update-binfmts --enable
if [ "$CI_COMMIT_BRANCH" == "dev" ]; then
    export BRANCH_VERSION="dev-latest"
else
    export BRANCH_VERSION="test-latest"
fi
docker buildx build --push -t "$CI_IMAGE:${VERSION_PREFIX}$(cat VERSION.txt)" -t "$CI_IMAGE:${VERSION_PREFIX}$TAG_VERSION" \
                    --platform "$PLATFORM"
                    --cache-from $CI_IMAGE:ARM64-$(cat VERSION.txt) 
                    --build-arg BUILDKIT_INLINE_CACHE=1 .