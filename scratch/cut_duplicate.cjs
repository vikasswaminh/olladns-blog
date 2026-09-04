const fs = require('fs');

let path = 'src/content/blog/what-is-protective-dns.md';
let content = fs.readFileSync(path, 'utf8');

// Find the end of the grid
let gridEnd = content.indexOf('</div>\n\n01\n\nPhishing Infrastructure');
if (gridEnd === -1) gridEnd = content.indexOf('</div>\n01\n\nPhishing Infrastructure');

let nextSection = content.indexOf('04\n\n## The Mechanics Behind the Curtain');

if (gridEnd !== -1 && nextSection !== -1) {
    // The duplicate block starts right after `</div>`
    let startCut = gridEnd + 6; // length of '</div>'
    let duplicateBlock = content.substring(startCut, nextSection);
    content = content.replace(duplicateBlock, '\n\n');
    fs.writeFileSync(path, content);
    console.log('Removed duplicate block using next section marker.');
} else {
    console.log('Could not find markers', {gridEnd: gridEnd !== -1, nextSection: nextSection !== -1});
}
