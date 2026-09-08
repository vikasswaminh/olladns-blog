const fs = require('fs');
const file = 'src/content/blog/dns-security-automation-how-to-manage-dns-policies-as-code.md';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/\n<\/div>\n\n<div class="content-card">\n\n## /g, '\n\n## ');

fs.writeFileSync(file, content);
console.log('Reverted section splits!');
