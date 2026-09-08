const fs = require('fs');
const file = 'src/content/blog/dns-security-automation-how-to-manage-dns-policies-as-code.md';
let content = fs.readFileSync(file, 'utf8');

// 1. Fix the missing closing div for the Key Takeaways content-card
content = content.replace('  </div>\n</div>\n<div class="content-card">\n\n## The Console Nobody Trusts Anymore', '  </div>\n</div>\n</div>\n\n<div class="content-card">\n\n## The Console Nobody Trusts Anymore');

// 2. Add proper markdown spacing around the section transitions
content = content.replace(/<\/div>\n<div class="content-card">\n## /g, '</div>\n\n<div class="content-card">\n\n## ');

fs.writeFileSync(file, content);
console.log('Fixed nesting and spacing');
