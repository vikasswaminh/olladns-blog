const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/content/blog/response-policy-zones-rpz-how-real-time-dns-blocking-actually-works.md');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');

const startIdx = lines.findIndex(line => line.includes('## Related Articles'));
const endIdx = lines.findIndex((line, idx) => idx > startIdx && line.includes('</div>') && lines[idx-1] && lines[idx-1].includes('</a>'));

if (startIdx !== -1 && endIdx !== -1) {
    // Remove from startIdx to endIdx
    lines.splice(startIdx, endIdx - startIdx + 1);
    fs.writeFileSync(filePath, lines.join('\n'));
    console.log('Successfully removed the Related Articles section.');
} else {
    console.log('Could not find the target lines.', { startIdx, endIdx });
}
