const fs = require('fs');
const filePath = 'c:\\Users\\Dell\\Downloads\\olladns-blog\\src\\content\\blog\\dns-spoofing-and-cache-poisoning-explained.md';
let content = fs.readFileSync(filePath, 'utf8');

// Remove the stray Section 01 from the takeaway card
content = content.replace(
  /\n\n\n\n\n<span style="color: var\(--accent\); font-weight: 700; text-transform: uppercase; letter-spacing: 0\.05em; font-size: 0\.95rem;">Section 01<\/span><\/span>/g,
  '</span>'
);

// We want to renumber Section 02 to Section 01, Section 03 to Section 02, etc.
// The easiest way is to find all instances of `<span style="color: var(--accent); ...>Section XX</span>` and replace them sequentially starting from 01.
let sectionCounter = 1;
content = content.replace(
  /<span style="color: var\(--accent\); font-weight: 700; text-transform: uppercase; letter-spacing: 0\.05em; font-size: 0\.95rem;">Section \d+<\/span>/g,
  (match) => {
    const newText = `<span style="color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.95rem;">Section ${sectionCounter.toString().padStart(2, '0')}</span>`;
    sectionCounter++;
    return newText;
  }
);

fs.writeFileSync(filePath, content);
console.log('Fixed sections');
