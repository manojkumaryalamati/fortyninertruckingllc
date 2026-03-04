const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'client/src/pages');

const files = {
  home: path.join(pagesDir, 'home.tsx'),
  about: path.join(pagesDir, 'about.tsx'),
  services: path.join(pagesDir, 'services.tsx'),
  fleet: path.join(pagesDir, 'fleet.tsx')
};

// Clean Home
if (fs.existsSync(files.home)) {
  let content = fs.readFileSync(files.home, 'utf8');
  // Remove text-shadow-sm, drop-shadow-md
  content = content.replace(/text-shadow-sm/g, '');
  content = content.replace(/drop-shadow-md/g, '');
  // Remove background gradient overlay
  content = content.replace(/<div className="absolute inset-0 bg-gradient-to-t from-white\/90 via-white\/20 to-transparent z-10" \/>/g, '');
  fs.writeFileSync(files.home, content, 'utf8');
}

// Clean About
if (fs.existsSync(files.about)) {
  let content = fs.readFileSync(files.about, 'utf8');
  // Remove bg-black/50 overlay
  content = content.replace(/<div className="absolute inset-0 bg-black\/50 z-10" \/>/g, '');
  fs.writeFileSync(files.about, content, 'utf8');
}

// Clean Services
if (fs.existsSync(files.services)) {
  let content = fs.readFileSync(files.services, 'utf8');
  // Remove style tags
  content = content.replace(/ style={{ textShadow: '0 2px [^}]+' }}/g, '');
  // Clean wrapper classes
  content = content.replace(/bg-black\/40 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-6 md:p-0 rounded-2xl md:rounded-none inline-block /g, '');
  fs.writeFileSync(files.services, content, 'utf8');
}

// Clean Fleet
if (fs.existsSync(files.fleet)) {
  let content = fs.readFileSync(files.fleet, 'utf8');
  // Clean badge background
  content = content.replace(/bg-black\/40 border border-white\/20 backdrop-blur-sm shadow-lg/g, '');
  // Clean bottom cards text shadow
  content = content.replace(/ style={{ textShadow: '0 2px [^}]+' }}/g, '');
  content = content.replace(/bg-black\/30 backdrop-blur-sm border border-white\/10/g, '');
  fs.writeFileSync(files.fleet, content, 'utf8');
}
console.log("Heroes cleaned");
