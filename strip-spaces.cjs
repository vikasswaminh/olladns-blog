const fs = require('fs');
const file = 'src/content/blog/dns-security-automation-how-to-manage-dns-policies-as-code.md';
let content = fs.readFileSync(file, 'utf8');

// Replace 3+ consecutive blank lines with a single blank line
content = content.replace(/\n{4,}/g, '\n\n');

fs.writeFileSync(file, content);

// Count remaining double-newlines
const doubles = (content.match(/\n{3}/g) || []).length;
console.log('Done. Remaining triple newlines:', doubles);
