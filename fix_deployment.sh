#!/bin/bash
#
# AGICOIN 部署修复脚本
# 此脚本用于诊断和修复AGICOIN的部署问题
#

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 项目配置
PROJECT_NAME="agicoin"
PROJECT_DIR="/var/www/$PROJECT_NAME"
REPO_URL="https://github.com/BitHighlander/bankless-portal.git" # 替换为实际的仓库URL
NGINX_CONFIG="/etc/nginx/sites-available/$PROJECT_NAME"
BUILD_DIR="$PROJECT_DIR/build"

# 打印彩色标题
echo -e "\n${BLUE}===== AGICOIN 部署修复 =====${NC}\n"

# 检查是否为root用户
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}错误: 此脚本必须以root用户运行${NC}" 
   echo -e "请使用 sudo 重新运行此脚本"
   exit 1
fi

# 步骤1: 检查Nginx状态
echo -e "${GREEN}1. 检查Nginx状态${NC}"
if systemctl is-active --quiet nginx; then
    echo -e "✓ Nginx 正在运行"
else
    echo -e "${YELLOW}! Nginx 未运行，正在启动...${NC}"
    systemctl start nginx
    if systemctl is-active --quiet nginx; then
        echo -e "${GREEN}✓ Nginx 已成功启动${NC}"
    else
        echo -e "${RED}✗ 无法启动 Nginx${NC}"
        echo -e "尝试安装 Nginx..."
        apt update && apt install -y nginx
        systemctl enable nginx
        systemctl start nginx
        if ! systemctl is-active --quiet nginx; then
            echo -e "${RED}✗ 无法安装或启动 Nginx，请手动检查问题${NC}"
            exit 1
        fi
    fi
fi

# 步骤2: 备份当前Nginx配置
echo -e "\n${GREEN}2. 备份当前Nginx配置${NC}"
if [ -f "$NGINX_CONFIG" ]; then
    BACKUP_FILE="${NGINX_CONFIG}.bak.$(date +%Y%m%d%H%M%S)"
    cp "$NGINX_CONFIG" "$BACKUP_FILE"
    echo -e "✓ 配置已备份至: $BACKUP_FILE"
else
    echo -e "${YELLOW}! 找不到Nginx配置，将创建新配置${NC}"
fi

# 步骤3: 创建项目目录
echo -e "\n${GREEN}3. 创建项目目录${NC}"
if [ ! -d "/var/www" ]; then
    mkdir -p /var/www
    echo -e "✓ 创建了 /var/www 目录"
fi

if [ -d "$PROJECT_DIR" ]; then
    echo -e "${YELLOW}! 项目目录已存在${NC}"
    read -p "是否重新部署项目? [y/N] " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "正在更新项目..."
        cd "$PROJECT_DIR"
        if [ -d ".git" ]; then
            git pull
            if [ $? -ne 0 ]; then
                echo -e "${RED}✗ Git pull 失败，尝试重新克隆${NC}"
                cd /var/www
                rm -rf "$PROJECT_DIR"
                git clone "$REPO_URL" "$PROJECT_NAME"
                if [ $? -ne 0 ]; then
                    echo -e "${RED}✗ 无法克隆仓库${NC}"
                    exit 1
                fi
                cd "$PROJECT_DIR"
            fi
        else
            echo -e "${YELLOW}! 目录存在但不是git仓库，正在重新克隆...${NC}"
            cd /var/www
            rm -rf "$PROJECT_DIR"
            git clone "$REPO_URL" "$PROJECT_NAME"
            if [ $? -ne 0 ]; then
                echo -e "${RED}✗ 无法克隆仓库${NC}"
                exit 1
            fi
            cd "$PROJECT_DIR"
        fi
    fi
else
    echo -e "正在克隆项目..."
    git clone "$REPO_URL" "$PROJECT_DIR"
    if [ $? -ne 0 ]; then
        echo -e "${RED}✗ 无法克隆仓库${NC}"
        exit 1
    fi
    cd "$PROJECT_DIR"
fi

# 步骤4: 安装依赖并构建项目
echo -e "\n${GREEN}4. 安装依赖${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}! Node.js未安装，正在安装...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt install -y nodejs
    echo -e "✓ Node.js已安装: $(node -v)"
fi

if ! command -v npm &> /dev/null; then
    echo -e "${YELLOW}! npm未安装，正在安装...${NC}"
    apt install -y npm
fi

echo -e "正在安装项目依赖..."
npm install
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}! npm install 失败，尝试修复...${NC}"
    npm cache clean --force
    rm -rf node_modules package-lock.json
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}✗ 无法安装依赖${NC}"
        exit 1
    fi
fi

echo -e "\n${GREEN}5. 构建项目${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ 构建失败${NC}"
    exit 1
fi

# 步骤5: 验证构建输出
echo -e "\n${GREEN}6. 验证构建输出${NC}"
if [ -f "$BUILD_DIR/index.html" ]; then
    echo -e "✓ 构建成功，找到 index.html"
else
    echo -e "${RED}✗ 构建似乎失败，找不到 index.html${NC}"
    echo -e "检查构建目录内容:"
    ls -la "$PROJECT_DIR"
    echo -e "尝试寻找构建输出..."
    
    # 尝试寻找其他可能的构建目录
    POSSIBLE_BUILD_DIRS=("build" "dist" "public" "out")
    for dir in "${POSSIBLE_BUILD_DIRS[@]}"; do
        if [ -d "$PROJECT_DIR/$dir" ] && [ -f "$PROJECT_DIR/$dir/index.html" ]; then
            BUILD_DIR="$PROJECT_DIR/$dir"
            echo -e "${YELLOW}! 找到可能的构建目录: $BUILD_DIR${NC}"
            break
        fi
    done
    
    if [ ! -f "$BUILD_DIR/index.html" ]; then
        echo -e "${RED}✗ 无法找到有效的构建输出${NC}"
        exit 1
    fi
fi

# 步骤6: 更新Nginx配置
echo -e "\n${GREEN}7. 更新Nginx配置${NC}"
cat > "$NGINX_CONFIG" << EOF
server {
    listen 80;
    server_name _;
    
    root $BUILD_DIR;
    index index.html;
    
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires max;
        log_not_found off;
    }
    
    error_log /var/log/nginx/$PROJECT_NAME-error.log;
    access_log /var/log/nginx/$PROJECT_NAME-access.log;
}
EOF

# 启用站点配置并关闭默认站点
if [ -f /etc/nginx/sites-enabled/default ]; then
    rm -f /etc/nginx/sites-enabled/default
    echo -e "✓ 已禁用默认站点"
fi

if [ ! -L "/etc/nginx/sites-enabled/$PROJECT_NAME" ]; then
    ln -s "$NGINX_CONFIG" "/etc/nginx/sites-enabled/"
    echo -e "✓ 已启用 $PROJECT_NAME 站点"
fi

# 步骤7: 测试Nginx配置
echo -e "\n${GREEN}8. 测试Nginx配置${NC}"
nginx -t
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Nginx配置测试失败${NC}"
    exit 1
else
    echo -e "✓ Nginx配置有效"
fi

# 步骤8: 重启Nginx
echo -e "\n${GREEN}9. 重启Nginx${NC}"
systemctl restart nginx
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ 无法重启Nginx${NC}"
    exit 1
else
    echo -e "✓ Nginx已重启"
fi

# 步骤9: 验证部署
echo -e "\n${GREEN}10. 验证部署${NC}"
SERVER_IP=$(hostname -I | awk '{print $1}')
echo -e "服务器IP: $SERVER_IP"
echo -e "${GREEN}✓ 部署修复完成!${NC}"
echo -e "请在浏览器中访问: http://$SERVER_IP"
echo -e "\n${BLUE}===== 部署修复完成 =====${NC}\n" 