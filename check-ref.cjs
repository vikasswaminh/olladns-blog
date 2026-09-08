const fs = require('fs');
const html = fs.readFileSync('C:/Users/Dell/.gemini/antigravity-ide/brain/56c2369a-a55b-406d-baaa-2f724c2dd9ee/.system_generated/steps/605/content.md', 'utf8');

// Find the TOC sidebar HTML structure
const idx = html.indexOf('post-toc"');
console.log('TOC div HTML:', html.substring(idx, idx + 2000));

// Find any aside or left nav
const aside = html.indexOf('<aside');
console.log('\n\nASIDE HTML:', html.substring(aside, aside + 1000));
