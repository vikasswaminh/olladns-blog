const fs = require('fs');

let path = 'src/content/blog/what-is-protective-dns.md';
let content = fs.readFileSync(path, 'utf8');

// The content already has `<div class="content-card">` at the start of the main content.
// We want to close it and open a new one before every `## ` heading.
// Except we need to be careful not to create empty divs.

// Split by '## '
let parts = content.split('\n## ');

if (parts.length > 1) {
    // The first part contains the frontmatter, tldr, takeaways, and the intro paragraph
    // which is inside the first <div class="content-card">.
    // So for every subsequent part, we prepend `</div>\n\n<div class="content-card">\n\n## `
    
    let newContent = parts[0];
    for (let i = 1; i < parts.length; i++) {
        newContent += '\n</div>\n\n<div class="content-card">\n\n## ' + parts[i];
    }
    
    fs.writeFileSync(path, newContent);
    console.log('Successfully made premium!');
} else {
    console.log('No ## headings found to split on.');
}
