const fs = require('fs');
const file = 'src/content/blog/dns-security-automation-how-to-manage-dns-policies-as-code.md';
let content = fs.readFileSync(file, 'utf8');

// Replace newlines followed by exactly 2 digits and another newline, just before an h2
// The pattern added was: \n\n01\n\n## Heading
content = content.replace(/\n\n\d{2}\n\n## /g, '\n\n## ');

fs.writeFileSync(file, content);
console.log('Removed numbers');
