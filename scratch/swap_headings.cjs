const fs = require('fs');

let content = fs.readFileSync('src/content/blog/dnssec-explained-what-it-is-how-it-works-and-why-it-matters.md', 'utf-8');

// The pattern is typically:
// <span class="section-badge">SECTION X</span>
// 
// ## Some Heading

// We can use a regex to match the span and the heading that follows it (with optional newlines)
// and swap their positions.

const regex = /(<span class="section-badge">.*?<\/span>)\s*\n+(##\s+.*?)\n/g;

content = content.replace(regex, '$2\n\n$1\n\n');

fs.writeFileSync('src/content/blog/dnssec-explained-what-it-is-how-it-works-and-why-it-matters.md', content);
console.log('Swapped badges and headings.');
