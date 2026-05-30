const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'client/src/pages');

const files = [
  path.join(pagesDir, 'home.tsx'),
  path.join(pagesDir, 'about.tsx'),
  path.join(pagesDir, 'services.tsx'),
  path.join(pagesDir, 'fleet.tsx')
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;
    
    // Adjust mobile object position to focus more on the left/center where the front usually is
    content = content.replace(/object-\[85%_center\]/g, 'object-[20%_center]');
    content = content.replace(/object-\[70%_center\]/g, 'object-[20%_center]');
    
    if (content !== originalContent) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
});
