const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'client/src/pages/fleet.tsx');

if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/bg-black\/40 border border-white\/20 backdrop-blur-sm shadow-lg/g, '');
  content = content.replace(/bg-black\/30 backdrop-blur-sm p-4 rounded-xl border border-white\/10 /g, 'p-4 ');
  fs.writeFileSync(file, content, 'utf8');
}
