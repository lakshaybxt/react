#!/bin/zsh

if [ -z "$*" ]; then
  echo "❌ Please provide a commit message"
  echo "Usage: ./git.sh \"your commit message\""
  exit 1
fi

echo "Phase: Staging"
git add .

echo "Phase: Commiting"
git commit -m "$*"

echo "Phase: Push"
git push
