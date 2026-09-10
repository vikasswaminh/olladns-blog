const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/content/blog/response-policy-zones-rpz-how-real-time-dns-blocking-actually-works.md');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');

const startIndex = lines.findIndex(line => line.includes('/* Grid Cards */'));
const endIndex = lines.findIndex((line, idx) => idx > startIndex && line.includes('@media (max-width: 768px)')) + 2; // +2 to include the media query lines

if (startIndex !== -1 && endIndex > startIndex) {
    // Remove the lines
    lines.splice(startIndex, endIndex - startIndex + 1);
    fs.writeFileSync(filePath, lines.join('\n'));
    console.log('Successfully removed the CSS block.');
} else {
    console.log('Could not find the start or end index.');
}
