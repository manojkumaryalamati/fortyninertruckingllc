const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'client/src/pages');

const files = [
  path.join(pagesDir, 'home.tsx'),
  path.join(pagesDir, 'about.tsx'),
  path.join(pagesDir, 'services.tsx'),
  path.join(pagesDir, 'fleet.tsx')
];

const replacements = [
  { 
    file: 'home.tsx',
    from: /className="relative min-h-\[400px\] h-\[calc\(100vh-72px\)\] w-full/g,
    to: 'className="relative min-h-[450px] h-[60vh] md:h-[calc(100vh-72px)] w-full'
  },
  {
    file: 'about.tsx',
    from: /className="relative h-\[70vh\] min-h-\[400px\] w-full/g,
    to: 'className="relative h-[55vh] md:h-[70vh] min-h-[400px] w-full'
  },
  {
    file: 'services.tsx',
    from: /className="relative h-\[70vh\] min-h-\[400px\] w-full/g,
    to: 'className="relative h-[55vh] md:h-[70vh] min-h-[400px] w-full'
  },
  {
    file: 'fleet.tsx',
    from: /className="relative min-h-\[85vh\] w-full/g,
    to: 'className="relative min-h-[60vh] md:min-h-[85vh] w-full'
  }
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;
    
    // Also improve image positioning for mobile to show the truck better
    // Most trucks are on the right/bottom or center.
    content = content.replace(/object-center md:object-\[center_25%\]/g, 'object-[75%_center] md:object-[center_25%]');
    content = content.replace(/object-center md:object-\[center_35%\]/g, 'object-[75%_center] md:object-[center_35%]');
    
    replacements.forEach(r => {
      if (file.endsWith(r.file)) {
        content = content.replace(r.from, r.to);
      }
    });
    
    if (content !== originalContent) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
});
