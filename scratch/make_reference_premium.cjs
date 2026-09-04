const fs = require('fs');

let path = 'src/content/blog/what-is-protective-dns.md';
let content = fs.readFileSync(path, 'utf8');

// The file currently has a single `<div class="content-card">` after the Key Takeaways and before the intro.
// And it ends with `</div>\n</div>` (or something similar with the footer).
// First, let's remove any existing `</div>\n\n<div class="content-card">` if they exist to start fresh
content = content.replace(/\n<\/div>\n\n<div class="content-card">\n\n## /g, '\n\n## ');

// Let's add numbers and content-cards to `## ` headings
let h2Counter = 1;
content = content.replace(/\n## (.*)/g, (match, title) => {
    let numStr = String(h2Counter).padStart(2, '0');
    h2Counter++;
    // The very first ## is "So, What Exactly Is Protective DNS?". We need to close the first intro content-card.
    // Wait, the intro text is already inside the first content-card.
    return `\n</div>\n\n<div class="content-card">\n\n${numStr}\n\n## ${title}`;
});

// Let's add numbers to `### ` headings and convert them to `#### `
let h3Counter = 1;
content = content.replace(/\n### (.*)/g, (match, title) => {
    // We want to reset h3Counter if it belongs to a new section, but just incrementing is fine too (or reset when we see ##)
    let numStr = String(h3Counter).padStart(2, '0');
    h3Counter++;
    return `\n${numStr}\n\n#### ${title}`;
});

// Let's add a few more blockquotes to look premium
if (!content.includes("> **Every single one")) {
     content = content.replace(
        'Every single one of those actions starts with a DNS lookup. Not sometimes. Not usually. Every time, without exception.',
        '> **Every single one of those actions starts with a DNS lookup. Not sometimes. Not usually. Every time, without exception.**'
    );
}

fs.writeFileSync(path, content);
console.log('Premium reference formatting applied.');
