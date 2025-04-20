#!/bin/bash

# 更新系统并安装依赖
apt update
apt upgrade -y
apt install -y git nodejs npm nginx

# 安装更新版本的Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# 克隆仓库
mkdir -p /var/www
cd /var/www
rm -rf agicoin
git clone https://github.com/afsdfdf/agicoin.git
cd agicoin

# 安装依赖
npm install

# 构建项目
export CI=false
npm run build

# 配置nginx
cat > /etc/nginx/sites-available/agicoin << 'EOL'
server {
    listen 80;
    server_name _;

    root /var/www/agicoin/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /static/ {
        expires 1y;
        add_header Cache-Control "public";
    }
}
EOL

# 启用站点配置
ln -sf /etc/nginx/sites-available/agicoin /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# 测试配置并重启nginx
nginx -t && systemctl restart nginx

# 输出服务器信息和公网IP
echo "AGICOIN 已成功部署在 http://$(curl -s ifconfig.me)" 