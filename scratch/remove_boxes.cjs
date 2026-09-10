const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/content/blog/response-policy-zones-rpz-how-real-time-dns-blocking-actually-works.md');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');

const startIdx = lines.findIndex(line => line.includes('<div class="summary-box">'));
const endIdx = lines.findIndex((line, idx) => idx > startIdx && line.includes('<a href="/" class="cta-button">Explore the OllaDNS Platform</a>'));

if (startIdx !== -1 && endIdx !== -1) {
    // We want to remove up to the closing </div> of the cta-block, which is one line after endIdx
    lines.splice(startIdx, (endIdx + 1) - startIdx + 1);
    fs.writeFileSync(filePath, lines.join('\n'));
    console.log('Successfully removed the summary-box and cta-block.');
} else {
    console.log('Could not find the target lines.');
}
