# 定义SSH连接参数
$server = "45.138.70.77"
$port = "50009"
$user = "root"
$password = "changcheng1A"

# 创建部署命令
$deployCommand = @'
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
git clone https://github.com/afsdfdf/agicoin.git
cd agicoin

# 安装依赖
npm install

# 构建项目
CI=false npm run build

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
'@

# 创建临时部署脚本
$deployScript = "deploy_agicoin.sh"
$deployCommand | Out-File -FilePath $deployScript -Encoding ascii

Write-Host "正在使用以下命令连接到服务器："
Write-Host "ssh -p $port $user@$server"
Write-Host "连接成功后，将执行自动部署脚本..."

# 使用plink执行远程命令
Write-Host "请确保你的系统已安装plink (PuTTY命令行工具)"
Write-Host "首次连接时可能需要手动确认服务器指纹"

# 打印手动执行命令（如果自动执行失败）
Write-Host "`n如果自动执行失败，请手动执行以下步骤："
Write-Host "1. 使用SSH客户端连接到服务器: ssh -p $port $user@$server"
Write-Host "2. 复制以下命令到服务器终端中执行:"
Write-Host $deployCommand 