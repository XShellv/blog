 #!/bin/bash

WEB_PATH='/root/tools/'$1

echo "Start deployment"
cd $WEB_PATH
echo "pulling source code from blog repo..."
git reset --hard origin/master
git clean -f
git pull
echo "Finished."