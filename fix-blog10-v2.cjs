const fs = require('fs');
const file = 'src/content/blog/dns-security-automation-how-to-manage-dns-policies-as-code.md';
let content = fs.readFileSync(file, 'utf8');

// 1. Fix the Key Takeaways
const takeawaysRegex = /<ul class="grid-list">([\s\S]*?)<\/ul>/;
const match = content.match(takeawaysRegex);

if (match) {
  const lis = match[1].split('<li><span>');
  let newHtml = '<div class="feature-grid">\n';
  let counter = 1;
  const titles = [
    "Manual Management Fails at Scale",
    "Source of Truth is Code",
    "Disciplined Pipeline",
    "Continuous Drift Detection",
    "Start Small, Automate Deliberately"
  ];
  for (let i = 1; i < lis.length; i++) {
    const text = lis[i].replace('</span></li>', '').trim();
    const num = '0' + counter;
    const title = titles[counter-1];
    newHtml += `  <div class="grid-feature-card">
    <div class="grid-feature-card-header">
      <span class="feature-num">${num}</span>
      <h4>${title}</h4>
    </div>
    <p>${text}</p>
  </div>\n`;
    counter++;
  }
  newHtml += '</div>';
  content = content.replace(match[0], newHtml);
}

// 2. Put sections into separate boxes
// We want to find all occurrences of "\n\n## " that are not the first one, not FAQ, and not Bringing It All Together.
// Let's split by "\n## "
const parts = content.split('\n## ');
let finalContent = parts[0];

for (let i = 1; i < parts.length; i++) {
  const part = parts[i];
  // If it's the first heading ("The Console Nobody Trusts Anymore"), it already has <div class="content-card"> above it.
  if (part.startsWith('The Console Nobody Trusts Anymore')) {
    finalContent += '\n## ' + part;
  } else if (part.startsWith('Frequently Asked Questions') || part.startsWith('Bringing It All Together')) {
    // These were already handled in previous steps, so do not add new divs.
    finalContent += '\n## ' + part;
  } else {
    // Insert a closing div and a new content card div before the heading
    finalContent += '\n</div>\n\n<div class="content-card">\n\n## ' + part;
  }
}

fs.writeFileSync(file, finalContent);
console.log('Done!');
