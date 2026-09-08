const fs = require('fs');
const file = 'src/content/blog/dns-security-automation-how-to-manage-dns-policies-as-code.md';
let content = fs.readFileSync(file, 'utf8');

// The file currently has no <div class="content-card"> for the main content blocks after Key Takeaways.
// It just has `## Heading` everywhere.
// First, let's fix `## The Console Nobody Trusts Anymore`
content = content.replace('\n\n## The Console Nobody Trusts Anymore', '\n\n<div class="content-card">\n\n## The Console Nobody Trusts Anymore');

// Now, for all OTHER headings (except FAQ, which already has its own div), we want to close the previous card and open a new one.
const headingsToSplit = [
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

for (const heading of headingsToSplit) {
  // We look for exactly the heading with newlines before it
  const regex = new RegExp('\\n\\n' + heading.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&'), 'g');
  content = content.replace(regex, '\n</div>\n\n<div class="content-card">\n\n' + heading);
}

fs.writeFileSync(file, content);
console.log('Split sections correctly!');
