#!/bin/sh
export HOME=/home/SVKruik
export PATH=/root/.nvm/versions/node/v20.15.1/bin:$PATH

# Git
cd ..
git config --global --add safe.directory /home/SVKruik/Documents/GitHub/Portfolio-Website
git reset --hard
git pull
echo "Git setup complete"

# Hosting - stefankruik.com
cd frontend
npm install
npm run build
echo "Build complete"

if [ -d "dist" ]; then
    cd ../server
    npm install
    npm run build
    rm -rf frontendDist
    mkdir -p frontendDist
    mv ../frontend/dist/* frontendDist/
    echo "Migration complete"

    cd ../frontend
    rm -rf dist
    echo "Cleanup complete"

    echo "Deployment complete. Reloading server."
    sudo systemctl restart portfolio-website.service
else
    echo "Deployment failed. Dist directory missing."
    exit 1
fi
