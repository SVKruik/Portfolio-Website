#!/bin/sh
export HOME=/home/SVKruik
export PATH=/root/.nvm/versions/node/v20.11.1/bin:$PATH

cd ..
git config --global --add safe.directory /home/SVKruik/Documents/GitHub/Portfolio-Website
git reset --hard
git pull
echo "Git setup complete"

cd frontend
npm install
npm run build
echo "Build complete"

if [ -d "dist" ]; then
    cd ../server
    npm install
    rm -rf dist
    mkdir -p dist
    mv ../frontend/dist/* dist/
    echo "Migration complete"

    cd ../frontend
    rm -rf dist
    echo "Cleanup complete"

    sudo systemctl restart bot-website.service
    echo "Deployment complete. Reloaded server."
else
    echo "Deployment failed. Dist directory missing."
    exit 1
fi
