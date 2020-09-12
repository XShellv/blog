 #!/bin/bash

WEB_PATH='../'$1

echo "Start deployment"
cd $WEB_PATH
echo "pulling source code from blog repo..."
git fetch --all
git reset --hard origin/master
git pull
echo "Finished."