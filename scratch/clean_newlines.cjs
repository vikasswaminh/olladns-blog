const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/content/blog/response-policy-zones-rpz-how-real-time-dns-blocking-actually-works.md');
let content = fs.readFileSync(filePath, 'utf8');

// Replace 3 or more consecutive newlines with exactly 2 newlines
content = content.replace(/\n{3,}/g, '\n\n');

// Also specifically clean up the double closing div that might have a space between them if any
content = content.replace(/<\/div>\n\n<\/div>/g, '</div>\n</div>');

fs.writeFileSync(filePath, content);
console.log('Cleaned up unwanted spaces and empty lines.');
