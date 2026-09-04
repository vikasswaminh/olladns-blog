const fs = require('fs');

let path = 'src/content/blog/what-is-protective-dns.md';
let content = fs.readFileSync(path, 'utf8');

let startIndex = content.indexOf('## What a Real Protective DNS Deployment Looks Like');
let endIndex = content.indexOf('08\n\n##');

if (startIndex !== -1 && endIndex !== -1) {
    let block = content.substring(startIndex, endIndex);

    // We have bullet points like:
    // *   01
    //     
    //     #### Start in Monitoring Mode
    //     
    //     The instinct...

    let itemRegex = /\*\s+0\d\s+#### (.*?)\s+([^]*?)(?=\*   0\d|$)/g;
    
    let match;
    let items = [];
    while ((match = itemRegex.exec(block)) !== null) {
        items.push({
            title: match[1].trim(),
            desc: match[2].trim()
        });
    }
    
    if (items.length > 0) {
        let newBlock = `## What a Real Protective DNS Deployment Looks Like
Understanding the theory is one thing. Rolling this out across a real organization, with real legacy systems and real people who get annoyed when something they rely on suddenly breaks, is another. A few things separate a smooth deployment from a painful one.

<div class="feature-grid">
`;
        items.forEach(item => {
            newBlock += `
  <div class="grid-feature-card">
    <h4 style="color: var(--accent); margin-top: 0;">${item.title}</h4>
    <p>${item.desc}</p>
  </div>`;
        });
        
        newBlock += `\n</div>\n\n\n`;

        content = content.replace(block, newBlock);
        fs.writeFileSync(path, content);
        console.log('Successfully rewrote section 7 to use the grid layout without numbers.');
    } else {
        console.log('Could not parse items with regex. Checking format manually.');
        console.log(block);
    }

} else {
    console.log('Could not find section 7 bounds.');
}
