const fs = require('fs');
const filePath = 'c:\\Users\\Dell\\Downloads\\olladns-blog\\src\\content\\blog\\dns-spoofing-and-cache-poisoning-explained.md';
let content = fs.readFileSync(filePath, 'utf8');

// Replace FAQ start
content = content.replace(
  '## Frequently Asked Questions',
  '</div>\n\n<div class="content-card">\n## Frequently Asked Questions'
);

// Replace Bringing It All Together start and shorten the text
const bringingItAllTogetherRegex = /(<span style="color: var\(--accent\); font-weight: 700; text-transform: uppercase; letter-spacing: 0\.05em; font-size: 0\.95rem;">Section 13<\/span>\n## Bringing It All Together)[\s\S]+?(?=\n\n<a href="https:\/\/olladns\.com")/;

const newBringingItAllTogether = `</div>\n\n<div class="content-card">\n$1\nDNS spoofing endures because the protocol was built for a more trusting internet. While modern patches—from source port randomization to DNSSEC—have raised the bar, the threat is not purely historical; new techniques like SAD DNS and rogue access points still bypass older defenses. To stay resilient, organizations must move beyond assuming this is a solved problem and instead adopt resolvers built with robust entropy, DNSSEC validation, active anomaly detection, and deep visibility. The lie only has to be told once, and your best defense is a resolver that’s actually paying attention.`;

content = content.replace(bringingItAllTogetherRegex, newBringingItAllTogether);

fs.writeFileSync(filePath, content);
console.log('Fixed conclusion and FAQ');
