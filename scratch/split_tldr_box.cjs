const fs = require('fs');

let path = 'src/content/blog/what-is-protective-dns.md';
let content = fs.readFileSync(path, 'utf8');

// The file currently has:
// <div class="content-card">
// 
// ## TL;DR
// ...
// ## Key Takeaways
// ...
// </div>

// Replace the area between TL;DR and Key Takeaways
content = content.replace('## Key Takeaways', '</div>\n\n<div class="content-card">\n\n## Key Takeaways');

fs.writeFileSync(path, content);
console.log('Separated TL;DR and Key Takeaways into two distinct boxes.');
