const fs = require('fs');
const filePath = 'c:\\Users\\Dell\\Downloads\\olladns-blog\\src\\content\\blog\\dns-spoofing-and-cache-poisoning-explained.md';
let content = fs.readFileSync(filePath, 'utf8');

// Replace the FAQ badge with a black heading
content = content.replace(
  '  <div class="premium-card-header">\n    <span class="card-badge">FAQ</span>\n  </div>',
  '<h2 style="color: black;">Frequently Asked Questions</h2>'
);

// Expand all FAQ items by adding the 'open' attribute
content = content.replace(/<details class="faq-item">/g, '<details class="faq-item" open>');

fs.writeFileSync(filePath, content);
console.log('FAQ expanded and heading changed');
