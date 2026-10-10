const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  content = content.replace(/2025-08-19/g, '2025-08-19');
  content = content.replace(/"08-19"/g, '"08-19"');
  content = content.replace(/'08-19'/g, "'08-19'");
  content = content.replace(/placeholder="08-19"/g, 'placeholder="08-19"');
  content = content.replace(/placeholder=\\"08-10\\"/g, 'placeholder=\\"08-19\\"');
  content = content.replace(/19 August 2025/g, '19 August 2025');
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log('Updated', filePath);
  }
}

const walkSync = function(dir, filelist) {
  files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        filelist = walkSync(path.join(dir, file), filelist);
      }
    }
    else {
      if (file.endsWith('.js') || file.endsWith('.html') || file.endsWith('.json')) {
        filelist.push(path.join(dir, file));
      }
    }
  });
  return filelist;
};

const allFiles = walkSync('.');
allFiles.forEach(replaceInFile);
