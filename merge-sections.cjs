const fs = require('fs');
const file = 'src/content/blog/dns-security-automation-how-to-manage-dns-policies-as-code.md';
let content = fs.readFileSync(file, 'utf8');

// We want to merge all consecutive content-cards for the main headings into one.
// Specifically, any `</div>\n\n<div class="content-card">\n\n## ` should become `\n\n## `
// EXCEPT we want to keep the Key Takeaways in its own card, which means the transition from Key Takeaways to the first section (`## The Console Nobody Trusts Anymore`) should REMAIN as a separation.
// Actually, earlier I had a split before "The Console Nobody Trusts Anymore". Let's check how it looks.

const headingsToMerge = [
  "## What \"DNS Policy as Code\" Actually Means",
  "## Why Manual DNS Policy Management Breaks Down at Scale",
  "## The Building Blocks of DNS Security Automation",
  "## Declarative Policy: Describing What You Want, Not What to Click",
  "## Version Control: Treating Policy Changes Like Code Changes",
  "## Drift Detection: Catching When Reality Diverges from Intent",
  "## The CI/CD Pipeline: Reviewing Policy Like Pull Requests",
  "## Where Automation Goes Wrong: Pitfalls to Avoid",
  "## Getting Started Without Breaking Production",
  "## Where DNS Policy Automation Is Headed",
  "## Bringing It All Together"
];

for (const heading of headingsToMerge) {
  const regex1 = new RegExp('</div>\\s*<div class="content-card">\\s*' + heading.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&'), 'g');
  content = content.replace(regex1, heading);
}

fs.writeFileSync(file, content);
console.log('Merged sections correctly!');
