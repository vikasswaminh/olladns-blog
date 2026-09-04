const fs = require('fs');

let path = 'src/content/blog/what-is-protective-dns.md';
let content = fs.readFileSync(path, 'utf8');

// The file has duplicate text below the grid. The grid ends with `</div>` right before the duplicate text starts.
let duplicateStart = content.indexOf('\n01\n\nPhishing Infrastructure');
if(duplicateStart === -1) {
    duplicateStart = content.indexOf('\n01\n\n#### Phishing Infrastructure');
}

if (duplicateStart !== -1) {
    let duplicateEndStr = 'access a website that was registered yesterday.';
    let duplicateEnd = content.indexOf(duplicateEndStr, duplicateStart);
    if (duplicateEnd !== -1) {
        duplicateEnd += duplicateEndStr.length;
        
        let duplicateBlock = content.substring(duplicateStart, duplicateEnd);
        content = content.replace(duplicateBlock, '');
        fs.writeFileSync(path, content);
        console.log('Removed duplicate text below the grid.');
    } else {
        console.log('Could not find end of duplicate block.');
    }
} else {
    console.log('Could not find duplicate block start.');
}
