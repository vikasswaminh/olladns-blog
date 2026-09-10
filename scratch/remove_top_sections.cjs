const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/content/blog/response-policy-zones-rpz-how-real-time-dns-blocking-actually-works.md');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');

// Lines 9 to 76 are index 8 to 75.
// Let's verify by checking the content.
if (lines[8].includes('<div class="content-card">') && lines[75] === '</div>') {
    // Remove 68 lines starting from index 8
    lines.splice(8, 68);
    fs.writeFileSync(filePath, lines.join('\n'));
    console.log('Successfully removed TL;DR and Key Takeaways sections.');
} else {
    console.log('Line numbers do not match expected structure. Aborting.');
}
