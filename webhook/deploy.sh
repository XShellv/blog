 #!/bin/bash

WEB_PATH='../'$1

echo "Start deployment"
cd $WEB_PATH
echo "pulling source code from blog repo..."
git pull
echo "Finished."