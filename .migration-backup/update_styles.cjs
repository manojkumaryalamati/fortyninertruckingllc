const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'client/src/pages');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) { 
      results.push(file);
    }
  });
  return results;
}

const files = walk(pagesDir);

const replacements = [
  // Typography
  { from: /text-3xl md:text-4xl lg:text-5xl/g, to: 'text-2xl md:text-3xl lg:text-4xl' },
  { from: /text-4xl md:text-5xl/g, to: 'text-3xl md:text-4xl' },
  { from: /text-3xl md:text-5xl/g, to: 'text-2xl md:text-4xl' },
  { from: /text-4xl font-black/g, to: 'text-3xl font-black' },
  { from: /text-3xl font-black/g, to: 'text-2xl font-black' },
  { from: /text-4xl font-bold/g, to: 'text-3xl font-bold' },
  { from: /text-3xl font-bold/g, to: 'text-2xl font-bold' },
  
  // Padding
  { from: /py-24/g, to: 'py-16' },
  { from: /py-16 md:py-24/g, to: 'py-12 md:py-16' },
  { from: /py-16/g, to: 'py-12' },
  { from: /py-20/g, to: 'py-16' },
  
  // Heights (but preserving min-height for structure)
  { from: /h-\[80vh\] min-h-\[600px\]/g, to: 'h-[70vh] min-h-[500px]' },
  { from: /h-\[85vh\] min-h-\[600px\]/g, to: 'h-[75vh] min-h-[500px]' },
  { from: /min-h-\[500px\]/g, to: 'min-h-[400px]' }
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  replacements.forEach(r => {
    content = content.replace(r.from, r.to);
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
