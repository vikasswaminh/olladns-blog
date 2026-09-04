const fs = require('fs');

let path = 'src/content/blog/what-is-protective-dns.md';
let content = fs.readFileSync(path, 'utf8');

// Remove the `</div>\n\n<div class="content-card">` dividers so everything is inside one big box again,
// but leave the `01`, `02` numbers and other markdown formatting untouched!
content = content.replace(/\n<\/div>\n\n<div class="content-card">/g, '');

fs.writeFileSync(path, content);
console.log('Removed multiple content cards, returning to a single box while preserving premium numbers.');
