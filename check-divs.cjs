const fs = require('fs');
const content = fs.readFileSync('src/content/blog/dns-security-automation-how-to-manage-dns-policies-as-code.md', 'utf8');

const opens = (content.match(/class="content-card"/g) || []).length;
console.log('content-card opens:', opens);

const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('</div>') && i > 50 && i < 170) {
    console.log('Line', i + 1, ':', l.trim());
  }
});
