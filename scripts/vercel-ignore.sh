#!/bin/bash
# Vercel Ignored Build Step: exit 0 = skip the build, exit 1 = build.
# Skips (1) preview builds unless the branch starts with 'preview/', and
# (2) commits that only touch scripts/, supabase/, docs/, tests or *.md.
if [ "$VERCEL_ENV" != "production" ]; then
  case "$VERCEL_GIT_COMMIT_REF" in
    preview/*) ;;
    *) echo "skip: preview build on '$VERCEL_GIT_COMMIT_REF' (name it preview/... to build)"; exit 0 ;;
  esac
fi
files=$(git diff --name-only HEAD^ HEAD 2>/dev/null) || { echo "build: cannot diff"; exit 1; }
[ -z "$files" ] && { echo "build: empty diff"; exit 1; }
if echo "$files" | grep -qvE '^(scripts|supabase|docs|tests?|playwright|e2e)/|\.md$|\.(test|spec)\.[jt]sx?$'; then
  echo "build: commit touches deployable files"; exit 1
fi
echo "skip: commit only touches scripts/, supabase/, docs/, tests or *.md"; exit 0
