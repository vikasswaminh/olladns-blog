const fs = require('fs');
const filePath = 'c:\\Users\\Dell\\Downloads\\olladns-blog\\src\\content\\blog\\dns-spoofing-and-cache-poisoning-explained.md';
let content = fs.readFileSync(filePath, 'utf8');

// Replace 3 or more consecutive newlines with exactly 2 newlines
content = content.replace(/\n{3,}/g, '\n\n');

// Optional: also remove trailing spaces on lines
content = content.replace(/[ \t]+$/gm, '');

fs.writeFileSync(filePath, content);
console.log('Removed unwanted spaces');
