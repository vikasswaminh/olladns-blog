const fs = require('fs');

let path = 'src/content/blog/what-is-protective-dns.md';
let content = fs.readFileSync(path, 'utf8');

// Move `<div class="content-card">\n\n## TL;DR` to just `\n## TL;DR`
content = content.replace('<div class="content-card">\n\n## TL;DR', '## TL;DR');

// Insert `<div class="content-card">` right before `01\n\n## So, What Exactly Is Protective DNS?`
let targetStr = '01\n\n## So, What Exactly Is Protective DNS?';
let newStr = '<div class="content-card">\n\n' + targetStr;
content = content.replace(targetStr, newStr);

fs.writeFileSync(path, content);
console.log('Moved content-card start point to Section 01');
