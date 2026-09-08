const fs = require('fs');
const file = 'src/content/blog/dns-security-automation-how-to-manage-dns-policies-as-code.md';
let content = fs.readFileSync(file, 'utf8');

// 1. Add sleek callout style to the top
const styleStr = `<style>
.sleek-callout {
    border-left: 3px solid var(--accent, #d32f2f);
    padding: 1.25rem 1.5rem;
    margin: 2rem 0;
    background: #fafafa;
    border-radius: 0 6px 6px 0;
    font-size: 1.05rem;
    color: var(--text-main);
    box-shadow: 0 1px 2px rgba(0,0,0,0.02);
}
.sleek-callout p { margin: 0; }
.blog-image {
    width: 100%;
    border-radius: 8px;
    margin: 2rem 0;
    border: 1px solid #eaeaea;
    box-shadow: 0 4px 6px rgba(0,0,0,0.02);
}
</style>
`;

if (!content.includes('.sleek-callout')) {
  // Insert styles right after the Key Takeaways
  content = content.replace('</ul>\n</div>', '</ul>\n</div>\n\n' + styleStr);
}

// 2. Add Pipeline Image to "The Building Blocks of DNS Security Automation"
content = content.replace(
  '## The Building Blocks of DNS Security Automation',
  '## The Building Blocks of DNS Security Automation\n\n<img src="/images/dns_automation_pipeline.jpg" alt="DNS Automation Pipeline" class="blog-image" />'
);

// 3. Add Drift Detection Image to "Drift Detection: Catching When Reality Diverges from Intent"
content = content.replace(
  '## Drift Detection: Catching When Reality Diverges from Intent',
  '## Drift Detection: Catching When Reality Diverges from Intent\n\n<img src="/images/drift_detection_concept.jpg" alt="Drift Detection Concept" class="blog-image" />'
);

// 4. Wrap key quotes in sleek callouts
content = content.replace(
  'A console shows you the current state. It rarely shows you why that state exists, who approved of it, or what it looked like six months ago.',
  '<div class="sleek-callout"><p><em>"A console shows you the current state. It rarely shows you why that state exists, who approved of it, or what it looked like six months ago."</em></p></div>'
);

// We need to match the "The configuration file isn't documentation describing the policy. It is the policy." phrase without replacing the whole paragraph blindly.
content = content.replace(
  /For DNS security policy specifically, declarative configuration also solves a subtler problem: it becomes the actual source of truth\. The configuration file isn't documentation describing the policy\. It is the policy\. If someone wants to know exactly what block rules apply/g,
  `For DNS security policy specifically, declarative configuration also solves a subtler problem: it becomes the actual source of truth.\n\n<div class="sleek-callout"><p><strong>The configuration file isn't documentation describing the policy. It is the policy.</strong></p></div>\n\nIf someone wants to know exactly what block rules apply`
);

fs.writeFileSync(file, content);
console.log('Embedded images and callouts');
