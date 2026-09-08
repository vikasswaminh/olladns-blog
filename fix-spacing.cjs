const fs = require('fs');
const file = 'src/content/blog/dns-security-automation-how-to-manage-dns-policies-as-code.md';
let content = fs.readFileSync(file, 'utf8');

// Collapse multiple newlines around the div transitions
content = content.replace(/\n{2,}<\/div>\n+<div class="content-card">\n+## /g, '\n</div>\n<div class="content-card">\n## ');

// Also collapse extra newlines in the file generally before </div>
content = content.replace(/\n{3,}<\/div>/g, '\n</div>');
content = content.replace(/<\/div>\n{3,}<div/g, '</div>\n<div');

fs.writeFileSync(file, content);
console.log('Fixed gaps successfully!');
