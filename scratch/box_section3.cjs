const fs = require('fs');

let path = 'src/content/blog/what-is-protective-dns.md';
let content = fs.readFileSync(path, 'utf8');

// The section items are formatted as:
// \n01\n\n#### Phishing Infrastructure
// We want to replace them with:
// \n</div>\n<div class="content-card">\n\n01\n\n#### Phishing Infrastructure

let replacements = [
    { from: '\n01\n\n#### Phishing Infrastructure', to: '\n</div>\n<div class="content-card">\n\n01\n\n#### Phishing Infrastructure' },
    { from: '\n02\n\n#### Malware Command and Control', to: '\n</div>\n<div class="content-card">\n\n02\n\n#### Malware Command and Control' },
    { from: '\n03\n\n#### Domain Generation Algorithms (DGA)', to: '\n</div>\n<div class="content-card">\n\n03\n\n#### Domain Generation Algorithms (DGA)' },
    { from: '\n04\n\n#### DNS Tunneling and Data Exfiltration', to: '\n</div>\n<div class="content-card">\n\n04\n\n#### DNS Tunneling and Data Exfiltration' },
    { from: '\n05\n\n#### Lookalike and Typosquat Domains', to: '\n</div>\n<div class="content-card">\n\n05\n\n#### Lookalike and Typosquat Domains' },
    { from: '\n06\n\n#### Newly Registered and Parked Domains', to: '\n</div>\n<div class="content-card">\n\n06\n\n#### Newly Registered and Parked Domains' }
];

for (let r of replacements) {
    content = content.replace(r.from, r.to);
}

// Ensure the main flow restarts after these nested items with a new box for section 04
content = content.replace('\n04\n\n## The Mechanics Behind the Curtain', '\n</div>\n<div class="content-card" style="margin-top: 2rem;">\n\n04\n\n## The Mechanics Behind the Curtain');

fs.writeFileSync(path, content);
console.log('Added content cards to section 3 items.');
