const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/content/blog/response-policy-zones-rpz-how-real-time-dns-blocking-actually-works.md');
let content = fs.readFileSync(filePath, 'utf8');

// The file currently has a <div class="content-card"> right before ## The Mechanism Nobody Names
// Then it has a long list of ## headings until ## Frequently Asked Questions which starts a new card.
// We want to close the card before each new ## heading and start a new one.

// Let's split by lines and rebuild
const lines = content.split('\n');
const newLines = [];

let insideContentCard = false;
let pastFirstHeading = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('## Frequently Asked Questions')) {
        // We know FAQ and beyond are already correctly wrapped from our previous edits.
        // Wait, did we leave an unclosed card before FAQ?
        // Our previous replace was:
        // </div>
        // <div class="content-card" id="frequently-asked-questions">
        // <style>...
        // ## Frequently Asked Questions
        // This means there is a </div> right before FAQ's new card.
        // So we just output it as is.
        
        // Wait, if we are splitting BEFORE the </div> that precedes FAQ, we need to be careful.
    }

    if (line.startsWith('## ') && 
        !line.includes('Frequently Asked Questions') && 
        !line.includes('Bringing It All Together')) {
        
        if (line.includes('The Mechanism Nobody Names')) {
            // This is the first one. It already has <div class="content-card"> right above it.
            pastFirstHeading = true;
            newLines.push(line);
        } else if (pastFirstHeading) {
            // For subsequent headings before FAQ, we close the previous card and start a new one.
            newLines.push('</div>\n');
            newLines.push('<div class="content-card">\n');
            newLines.push(line);
        } else {
            newLines.push(line);
        }
    } else {
        newLines.push(line);
    }
}

fs.writeFileSync(filePath, newLines.join('\n'));
console.log('Done wrapping sections in cards.');
