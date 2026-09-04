const fs = require('fs');

let path = 'src/content/blog/what-is-protective-dns.md';
let content = fs.readFileSync(path, 'utf8');

// Revert the split
content = content.replace(/\n<\/div>\n\n<div class="content-card">\n\n## /g, '\n\n## ');

// Let's add some premium formatting:
// Convert some key sentences to blockquotes for premium look
content = content.replace(
    'Every single one of those actions starts with a DNS lookup. Not sometimes. Not usually. Every time, without exception, because that\'s how the internet\'s addressing system works.',
    '> **Every single one of those actions starts with a DNS lookup. Not sometimes. Not usually. Every time, without exception.**'
);

content = content.replace(
    '100%\n\nof internet connections start with a DNS lookup',
    '<div style="text-align: center; margin: 2rem 0;">\n  <span style="font-size: 3rem; font-weight: 800; color: var(--accent); line-height: 1;">100%</span><br>\n  <span style="font-size: 1.1rem; color: var(--muted);">of internet connections start with a DNS lookup</span>\n</div>'
); // I don't think this specific string is in the new blog, but let's check.

// Highlight a powerful statement
content = content.replace(
    'The internet asks the same question billions of times a second: where is this domain? For most organizations, that question goes unwatched. Protective DNS is simply the decision to start paying attention to the answer, before it\'s too late to matter.',
    '> The internet asks the same question billions of times a second: where is this domain? For most organizations, that question goes unwatched. **Protective DNS is simply the decision to start paying attention to the answer, before it\'s too late to matter.**'
);

fs.writeFileSync(path, content);
console.log('Reverted to a single content card and added premium blockquotes.');
