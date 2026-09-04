const fs = require('fs');

let path = 'src/content/blog/what-is-protective-dns.md';
let content = fs.readFileSync(path, 'utf8');

// Replace the start of "Bringing It All Together" with a closing and opening div.
content = content.replace('## Bringing It All Together', '</div>\n\n<div class="content-card">\n\n## Bringing It All Together');

fs.writeFileSync(path, content);
console.log('Placed "Bringing It All Together" into a separate box.');
