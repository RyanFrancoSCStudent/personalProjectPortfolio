#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_REPO_DIR="$(cd -- "$SCRIPT_DIR/.." && pwd)"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-main}"
DEPLOY_REF="${DEPLOY_REF:-origin/$DEPLOY_BRANCH}"
RELEASES_DIR="${RELEASES_DIR:-/home/ryanfranco/personalProjectPortfolio-releases}"
CURRENT_LINK="${CURRENT_LINK:-/home/ryanfranco/personalProjectPortfolio-current}"
TARGET_DIR="${TARGET_DIR:-/var/www/ryanfranco-tech}"
BUILD_SUBDIR="${BUILD_SUBDIR:-dist/ryanfrancoportfolio/browser}"
KEEP_RELEASES="${KEEP_RELEASES:-5}"
NODE_BIN_DIR="${NODE_BIN_DIR:-/home/ryanfranco/.nvm/versions/node/v22.22.1/bin}"
SKIP_FETCH="${SKIP_FETCH:-0}"
PATH="$NODE_BIN_DIR:$PATH"

cleanup_old_releases() {
  mapfile -t release_paths < <(find "$RELEASES_DIR" -mindepth 1 -maxdepth 1 -type d | sort)
  local count="${#release_paths[@]}"

  if (( count <= KEEP_RELEASES )); then
    return 0
  fi

  local remove_count=$((count - KEEP_RELEASES))
  for ((i = 0; i < remove_count; i++)); do
    rm -rf "${release_paths[$i]}"
  done
}

ensure_npm_cache() {
  npm cache verify >/dev/null 2>&1 || rm -rf "$npm_config_cache"
  mkdir -p "$npm_config_cache"
}

run_with_optional_sudo() {
  if "$@"; then
    return 0
  fi

  sudo "$@"
}

echo "Deploying branch $DEPLOY_BRANCH from $SOURCE_REPO_DIR"

if [[ ! -d "$SOURCE_REPO_DIR/.git" ]]; then
  echo "Source repo not found at $SOURCE_REPO_DIR" >&2
  exit 1
fi

mkdir -p "$RELEASES_DIR"

cd "$SOURCE_REPO_DIR"

if [[ "$SKIP_FETCH" != "1" ]]; then
  git fetch origin "$DEPLOY_BRANCH"
fi

DEPLOY_COMMIT="$(git rev-parse "$DEPLOY_REF")"
SHORT_COMMIT="$(git rev-parse --short "$DEPLOY_COMMIT")"
TIMESTAMP="$(date -u +%Y%m%d-%H%M%S)"
RELEASE_DIR="$RELEASES_DIR/$TIMESTAMP-$SHORT_COMMIT"
BUILD_DIR="$RELEASE_DIR/$BUILD_SUBDIR"
NPM_CACHE_DIR="$RELEASE_DIR/.npm-cache"

echo "Preparing release $RELEASE_DIR for commit $DEPLOY_COMMIT"

mkdir -p "$RELEASE_DIR"
git archive "$DEPLOY_COMMIT" | tar -x -C "$RELEASE_DIR"

cd "$RELEASE_DIR"
export npm_config_cache="$NPM_CACHE_DIR"
ensure_npm_cache
npm ci --no-audit --no-fund
npm run build

if [[ ! -d "$BUILD_DIR" ]]; then
  echo "Build output not found: $BUILD_DIR" >&2
  exit 1
fi

ln -sfn "$RELEASE_DIR" "$CURRENT_LINK"
run_with_optional_sudo mkdir -p "$TARGET_DIR"
run_with_optional_sudo rsync -a --delete "$BUILD_DIR"/ "$TARGET_DIR"/

cleanup_old_releases

echo "Repo deploy complete."
