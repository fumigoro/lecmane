branch=$(git rev-parse --abbrev-ref @)
git checkout dev
git fetch origin
git reset --hard origin/main
git merge $branch
git log -n 2
git push -f origin dev
git checkout $branch
echo "Branch:$branch has been deployed to dev"
