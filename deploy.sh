#!/bin/bash

# Exit on error
set -e

# Configuration
SERVER="45.138.70.77"
PORT="22"
USER="root"
PROJECT_DIR="/var/www/app.agicoin.my"
DOMAIN="app.agicoin.my"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Log function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

# Check if we're in the project directory
if [ ! -f "package.json" ]; then
    error "Please run this script from the project root directory"
fi

# Build the project
log "Building project..."
npm run build || error "Build failed"

# Create deployment package
log "Creating deployment package..."
tar -czf deploy.tar.gz build/ package.json package-lock.json

# Upload to server
log "Uploading to server..."
scp -P $PORT deploy.tar.gz $USER@$SERVER:/tmp/ || error "Upload failed"

# Execute deployment on server
log "Deploying on server..."
ssh -p $PORT $USER@$SERVER "
    # Create project directory if it doesn't exist
    mkdir -p $PROJECT_DIR

    # Extract deployment package
    tar -xzf /tmp/deploy.tar.gz -C $PROJECT_DIR

    # Install dependencies
    cd $PROJECT_DIR
    npm install --production

    # Configure Nginx
    cat > /etc/nginx/conf.d/$DOMAIN.conf << 'EOL'
server {
    listen 80;
    server_name $DOMAIN;
    root $PROJECT_DIR/build;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL

    # Set permissions
    chown -R www-data:www-data $PROJECT_DIR
    chmod -R 755 $PROJECT_DIR

    # Restart Nginx
    systemctl restart nginx

    # Clean up
    rm /tmp/deploy.tar.gz
" || error "Deployment failed"

# Clean up local files
rm deploy.tar.gz

log "Deployment completed successfully!"
log "Please wait a few minutes for DNS propagation"
log "You can access your site at: https://$DOMAIN" 