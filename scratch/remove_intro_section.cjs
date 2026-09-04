const fs = require('fs');

let path = 'src/content/blog/what-is-protective-dns.md';
let content = fs.readFileSync(path, 'utf8');

// Find the start of the section to remove
let startIndex = content.indexOf('## The One Thing Every Attack Has in Common');

if (startIndex !== -1) {
    // Find the start of the next section, which is the main content card
    let endIndex = content.indexOf('<div class="content-card">', startIndex);
    
    if (endIndex !== -1) {
        // Extract the block to remove
        let blockToRemove = content.substring(startIndex, endIndex);
        
        // Remove it
        content = content.replace(blockToRemove, '');
        fs.writeFileSync(path, content);
        console.log('Removed "The One Thing Every Attack Has in Common" section.');
    } else {
        console.log('Could not find the end of the section.');
    }
} else {
    console.log('Could not find the start of the section.');
}
