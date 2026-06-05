const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'src', 'data');

function resetFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 移除节点的 plainLanguageDescription
  content = content.replace(/, plainLanguageDescription: "[^"]*"/g, '');
  
  // 移除股票的 description
  content = content.replace(/, description: "[^"]*"/g, '');
  
  fs.writeFileSync(filePath, content);
  console.log(`Reset ${path.basename(filePath)}`);
}

resetFile(path.join(dataDir, 'semiconductor.ts'));
resetFile(path.join(dataDir, 'power.ts'));
resetFile(path.join(dataDir, 'gridEquipment.ts'));
console.log('Done reset!');
