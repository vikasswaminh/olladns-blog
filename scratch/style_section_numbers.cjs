const fs = require('fs');

let path = 'src/content/blog/what-is-protective-dns.md';
let content = fs.readFileSync(path, 'utf8');

// The text is currently just "Section 01" on a line by itself.
// We'll replace it with a styled span.

let regex = /^Section (0\d)$/gm;
content = content.replace(regex, '<span style="color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.95rem;">Section $1</span>');

fs.writeFileSync(path, content);
console.log('Styled section numbers with color and premium font weights.');
