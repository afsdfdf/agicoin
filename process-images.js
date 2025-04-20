const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageMap = {
  '3D 渲染艺术创作 (14).png': 'agi-diamond.png',
  '3D 渲染艺术创作 (9).png': 'agi-gold.png',
  '3D 渲染艺术创作 (13).png': 'agi-silver.png',
  '3D 渲染艺术创作 (10).png': 'agi-copper.png',
  '3D 渲染艺术创作 (12).png': 'agi-iron.png'
};

// 确保目标目录存在
const targetDir = path.join(__dirname, 'public', 'images', 'nft');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 处理每张图片
Object.entries(imageMap).forEach(([oldName, newName]) => {
  const sourcePath = path.join(__dirname, oldName);
  const targetPath = path.join(targetDir, newName);

  // 检查源文件是否存在
  if (!fs.existsSync(sourcePath)) {
    console.error(`Source file not found: ${sourcePath}`);
    return;
  }

  // 使用 sharp 处理图片
  sharp(sourcePath)
    .resize(800, 800, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png({ quality: 80 })
    .toFile(targetPath)
    .then(() => {
      console.log(`Processed: ${oldName} -> ${newName}`);
      // 删除原文件
      fs.unlinkSync(sourcePath);
      console.log(`Deleted original file: ${oldName}`);
    })
    .catch(err => {
      console.error(`Error processing ${oldName}:`, err);
    });
}); 