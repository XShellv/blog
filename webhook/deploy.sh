 #!/bin/bash
DEPLOY_PATH=C:/xxw/blog
echo "Start deployment"
cd $DEPLOY_PATH
echo "pulling source code from blog repo..."
git reset --hard origin/master
git clean -f
git pull
git checkout master

# 构建dist脚本!
npm run build
echo "Finished."

