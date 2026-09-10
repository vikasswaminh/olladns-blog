const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/content/blog/response-policy-zones-rpz-how-real-time-dns-blocking-actually-works.md');
let content = fs.readFileSync(filePath, 'utf8');

// The file currently has </div>\n\n<div class="content-card">\n\n##  patterns.
// We want to remove those so it all stays in one big <div class="content-card">, up until the FAQ section.

// Let's replace:
// </div>
// 
// <div class="content-card">
// 
// ## 
// with just:
// ## 

// Wait, the FAQ section might have its own card that we DO want to keep.
// The FAQ section is preceded by:
// </div>
// 
// <div class="content-card" id="frequently-asked-questions">
//
// And the "Bringing It All Together" section is:
// </div>
// 
// <div class="content-card">
// 
// ## Bringing It All Together
//
// So we ONLY want to replace the generic <div class="content-card"> block that wraps headings OTHER than "Bringing It All Together" and "Frequently Asked Questions".

const lines = content.split('\n');
const newLines = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line === '</div>' && lines[i+1] === '' && lines[i+2] === '<div class="content-card">' && lines[i+3] === '' && lines[i+4] && lines[i+4].startsWith('## ')) {
        // Check if the heading is Bringing It All Together
        if (!lines[i+4].includes('Bringing It All Together') && !lines[i+4].includes('Frequently Asked Questions')) {
            // Skip the </div>, empty line, <div...>, and empty line
            i += 3; // loop will increment by 1 more, so it lands on the ## heading line
            continue;
        }
    }
    
    newLines.push(line);
}

fs.writeFileSync(filePath, newLines.join('\n'));
console.log('Done reverting cards.');
