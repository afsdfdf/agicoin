# PowerShell脚本 - 部署AGICOIN项目
# 此脚本将从GitHub克隆项目并部署到服务器

# 服务器连接信息
$Server = "45.138.70.77"
$Port = "22"
$User = "root"
$Password = "changcheng1A"
$RepoUrl = "https://github.com/afsdfdf/agicoin.git"
$ProjectDir = "/var/www/app.agicoin.my"

Write-Host "`n============== AGICOIN 项目部署 ==============" -ForegroundColor Cyan

# 创建临时脚本文件
$DeployScript = @"
#!/bin/bash
echo "开始部署AGICOIN项目..."

# 1. 安装必要的软件包
echo "1. 安装必要的软件包..."
apt-get update
apt-get install -y git nodejs npm nginx certbot python3-certbot-nginx

# 2. 安装Node.js 18.x
echo "2. 安装Node.js 18.x..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# 3. 创建项目目录
echo "3. 创建项目目录..."
mkdir -p $ProjectDir

# 4. 克隆项目
echo "4. 克隆项目..."
cd $ProjectDir
if [ -d ".git" ]; then
    echo "项目已存在，更新代码..."
    git pull
else
    echo "克隆新项目..."
    git clone $RepoUrl .
fi

# 5. 安装依赖
echo "5. 安装依赖..."
npm install

# 6. 构建项目
echo "6. 构建项目..."
CI=false npm run build

# 7. 配置Nginx
echo "7. 配置Nginx..."
cat > /etc/nginx/conf.d/app.agicoin.my.conf << 'EOL'
server {
    listen 80;
    server_name app.agicoin.my;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl;
    server_name app.agicoin.my;

    ssl_certificate /etc/letsencrypt/live/app.agicoin.my/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/app.agicoin.my/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    root $ProjectDir/build;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
        add_header Access-Control-Allow-Origin *;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        
        # CORS headers
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE' always;
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization' always;
        add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range' always;
        
        if (\$request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE';
            add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization';
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            add_header 'Content-Length' 0;
            return 204;
        }
    }

    # 安全相关配置
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
}
EOL

# 8. 申请SSL证书
echo "8. 申请SSL证书..."
certbot --nginx -d app.agicoin.my --non-interactive --agree-tos --email admin@agicoin.my

# 9. 配置防火墙
echo "9. 配置防火墙..."
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 22/tcp
ufw allow 50009/tcp
ufw --force enable

# 10. 重启Nginx
echo "10. 重启Nginx..."
systemctl restart nginx

# 11. 测试Nginx配置
echo "11. 测试Nginx配置..."
nginx -t

echo "AGICOIN项目部署完成！"
"@

# 将部署脚本保存到临时文件，使用Unix格式的换行符
$DeployScript = $DeployScript.Replace("`r`n", "`n")
[System.IO.File]::WriteAllText("deploy_agicoin.sh", $DeployScript)

# 上传并执行脚本
Write-Host "`n[1] 上传部署脚本..." -ForegroundColor Green
scp -P $Port deploy_agicoin.sh ${User}@${Server}:/root/

Write-Host "`n[2] 执行部署脚本..." -ForegroundColor Green
ssh -p $Port ${User}@${Server} "chmod +x /root/deploy_agicoin.sh && /root/deploy_agicoin.sh"

# 清理临时文件
Remove-Item -Path "deploy_agicoin.sh"

Write-Host "`nAGICOIN项目部署完成!" -ForegroundColor Green
Write-Host "请等待几分钟让SSL证书和DNS解析生效。" -ForegroundColor Yellow
Write-Host "您可以通过以下地址访问网站：" -ForegroundColor Cyan
Write-Host "https://app.agicoin.my" -ForegroundColor Yellow

Write-Host "`n============== 部署完成 ==============" -ForegroundColor Cyan 