const fs = require('fs');
const path = require('path');

const originalFile = path.join(__dirname, '../src/content/blog/response-policy-zones-rpz-how-real-time-dns-blocking-actually-works.md');
const newBottomFile = path.join(__dirname, 'new_bottom.md');

const originalLines = fs.readFileSync(originalFile, 'utf8').split('\n');
const newBottomContent = fs.readFileSync(newBottomFile, 'utf8');

// Find the end of Key Takeaways. It's the </div> before '## The Mechanism Nobody Names'
let cutIndex = 0;
for (let i = 0; i < originalLines.length; i++) {
    if (originalLines[i].startsWith('## The Mechanism Nobody Names')) {
        cutIndex = i;
        break;
    }
}

// Keep the lines before the cut index
const topHalf = originalLines.slice(0, cutIndex).join('\n');

// Combine
const finalContent = topHalf + newBottomContent;

// Write back
fs.writeFileSync(originalFile, finalContent);
console.log('Successfully applied the redesign.');
