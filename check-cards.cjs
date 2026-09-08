const fs = require('fs');
const content = fs.readFileSync('src/content/blog/dns-security-automation-how-to-manage-dns-policies-as-code.md', 'utf8');
const lines = content.split('\n');

// Track which lines have content-card open/close
lines.forEach((l, i) => {
  if (l.includes('content-card') || (l.trim() === '</div>' && i > 440)) {
    console.log('Line', i + 1, ':', l.trim().substring(0, 80));
  }
});
