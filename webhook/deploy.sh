 #!/bin/bash

echo "Start deployment"
cd "../"
echo "pulling source code from blog repo..."
git fetch --all
git reset --hard origin/master
git pull

npm run build
echo "Finished."