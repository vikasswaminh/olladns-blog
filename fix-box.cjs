const fs = require('fs');
const file = 'src/content/blog/dns-security-automation-how-to-manage-dns-policies-as-code.md';
let content = fs.readFileSync(file, 'utf8');

// Remove the orphaned stack-layer divs that got left behind from the previous refactor.
// They sit after the emoji-header blocks and have a stray </div> that closes the content-card early.
content = content.replace(
  /  <div class="stack-layer">\s*Infrastructure as Code Provider\s*<span>.*?<\/span>\s*<\/div>\s*<div class="stack-layer">\s*Version Control Repository\s*<span>.*?<\/span>\s*<\/div>\s*<div class="stack-layer">\s*CI\/CD Pipeline\s*<span>.*?<\/span>\s*<\/div>\s*<div class="stack-layer">\s*Drift Detection\s*<span>.*?<\/span>\s*<\/div>\s*<div class="stack-layer">\s*Threat Intelligence & Identity\s*<span>.*?<\/span>\s*<\/div>\s*<\/div>/gs,
  ''
);

fs.writeFileSync(file, content);
console.log('Cleaned up orphaned stack-layer divs');

// Verify the result
content = fs.readFileSync(file, 'utf8');
const stackLayers = (content.match(/<div class="stack-layer">/g) || []).length;
console.log('Remaining stack-layer divs:', stackLayers);
