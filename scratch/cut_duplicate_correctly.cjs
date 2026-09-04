const fs = require('fs');

let path = 'src/content/blog/what-is-protective-dns.md';
let content = fs.readFileSync(path, 'utf8');

let nextSection = content.indexOf('04\n\n## The Mechanics Behind the Curtain');
let endGrid = content.lastIndexOf('</div>\n', nextSection);

if (endGrid !== -1 && nextSection !== -1) {
    let startCut = endGrid + 7; // length of '</div>\n'
    let duplicateBlock = content.substring(startCut, nextSection);
    content = content.replace(duplicateBlock, '\n\n');
    fs.writeFileSync(path, content);
    console.log('Successfully cut the duplicate block.');
} else {
    console.log('Failed to find indices');
}
