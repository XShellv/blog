 #!/bin/bash
DEPLOY_PATH=../
echo "Start deployment"
cd $DEPLOY_PATH
echo "pulling source code from blog repo..."
git fetch --all
git reset --hard origin/master
git pull


# ����dist�ű�
npm run build
echo "Finished."