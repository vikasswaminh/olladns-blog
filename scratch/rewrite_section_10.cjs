const fs = require('fs');

let path = 'src/content/blog/what-is-protective-dns.md';
let content = fs.readFileSync(path, 'utf8');

// First, fix the Section prefixes for 10, 11
content = content.replace(/^10\s*$/gm, '<span style="color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.95rem;">Section 10</span>');
content = content.replace(/^11\s*$/gm, '<span style="color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.95rem;">Section 11</span>');
// Just delete the bare '12' as it sits above the FAQ
content = content.replace(/^12\s*$/gm, '');

// Now rewrite Section 10 to use feature-grid
let startIndex = content.indexOf('## A Practical Checklist for Evaluating Protective DNS Providers');
let endIndex = content.indexOf('<span style="color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.95rem;">Section 11</span>');

if (startIndex !== -1 && endIndex !== -1) {
    let block = content.substring(startIndex, endIndex);

    // Matches `*   01\n    \n    #### Detection Speed\n    \n    Ask how fast...`
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
        let newBlock = `## A Practical Checklist for Evaluating Protective DNS Providers
If you're shopping for one of these, a few things separate the genuinely strong options from the merely adequate ones, and they're worth digging into directly rather than taking a sales deck's word for it.

<div class="feature-grid">
`;
        items.forEach(item => {
            newBlock += `
  <div class="grid-feature-card">
    <h4 style="color: var(--text-main); margin-top: 0;">${item.title}</h4>
    <p>${item.desc}</p>
  </div>`;
        });
        
        newBlock += `\n</div>\n\n\n`;

        content = content.replace(block, newBlock);
        console.log('Successfully rewrote section 10 to use the grid layout without numbers.');
    } else {
        console.log('Could not parse items in Section 10 with regex. Checking format manually.');
        console.log(block);
    }
} else {
    console.log('Could not find section 10 bounds.');
}

fs.writeFileSync(path, content);

