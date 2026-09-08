const fs = require('fs');

const input = fs.readFileSync('BLOG10.txt', 'utf8');
const lines = input.split('\n');

let title = '';
let description = '';
let date = '2026-09-03T00:00:00.000Z'; // default
let readTime = '';

let tldr = '';
let takeaways = [];
let content = [];
let state = 'meta';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (state === 'meta') {
    if (line.startsWith('title:')) {
      title = line.replace('title:', '').trim().replace(/^“|”$/g, '').replace(/^"|"$/g, '');
    } else if (line.startsWith('description:')) {
      description = line.replace('description:', '').trim().replace(/^“|”$/g, '').replace(/^"|"$/g, '');
    } else if (line.startsWith('date:')) {
      date = line.replace('date:', '').trim().replace(/^“|”$/g, '').replace(/^"|"$/g, '') + 'T00:00:00.000Z';
    } else if (line.startsWith('readTime:')) {
      readTime = line.replace('readTime:', '').trim().replace(/^“|”$/g, '').replace(/^"|"$/g, '');
    } else if (line === 'TL;DR') {
      tldr = lines[i+1].trim();
      i++; // skip next line
    } else if (line === 'Key Takeaways') {
      state = 'takeaways';
    }
  } else if (state === 'takeaways') {
    if (line === '') continue;
    if (line.match(/^\d+\./)) {
      takeaways.push(line.replace(/^\d+\./, '').trim());
    } else if (line === 'The Console Nobody Trusts Anymore' || line.startsWith('The Console')) {
      state = 'content';
      content.push('## ' + line);
    }
  } else if (state === 'content') {
    if (line === '') {
      content.push('');
    } else if (!line.startsWith('---') && !line.match(/^Category:/) && !line.match(/^keywords:/)) {
      // Check for headings
      if (line === 'What "DNS Policy as Code" Actually Means' || 
          line === 'Why Manual DNS Policy Management Breaks Down at Scale' ||
          line === 'The Building Blocks of DNS Security Automation' ||
          line === 'Declarative Policy: Describing What You Want, Not What to Click' ||
          line === 'Version Control: Treating Policy Changes Like Code Changes' ||
          line === 'Drift Detection: Catching When Reality Diverges from Intent' ||
          line === 'CI/CD Pipelines for DNS Policy: Plan, Review, Apply' ||
          line === 'Automating Blocklists, Allowlists, and Threat Intelligence Feeds' ||
          line === 'Policy Tiers as Code: Encoding Risk Based Rules' ||
          line === 'Identity and Group Based Policy Automation' ||
          line === 'Automating the Response Loop: From Detection to Enforcement' ||
          line === 'Multi-Site and Multi Region Policy Automation' ||
          line === 'Testing DNS Policy Changes Before They Ship' ||
          line === 'Common Pitfalls Teams Hit When Automating DNS Policy' ||
          line === 'A Practical Roadmap for Getting Started' ||
          line === 'Evaluating Tools and Providers for DNS Policy Automation' ||
          line === 'Common Myths About DNS Policy Automation, Debunked' ||
          line === 'Where DNS Policy Automation Is Headed' ||
          line === 'Frequently Asked Questions' ||
          line === 'Bringing It All Together') {
        content.push('## ' + line);
      } else if (line.match(/^[A-Z][^:]+$/) && lines[i+1] && lines[i+1].trim() !== '' && !line.includes('.') && line.length < 60) {
        // likely a sub-heading or list item
         content.push('### ' + line);
      } else {
        content.push(line);
      }
    }
  }
}

const md = `---
title: "${title || 'DNS Security Automation: How to Manage DNS Policies as Code'}"
description: "${description || "Clicking through a DNS console to update a blocklist doesn't scale past your first ten sites. Here's how to manage DNS security policy as code, with Terraform, version control, drift detection, and CI/CD, without breaking production."}"
pubDate: 2026-09-03T00:00:00.000Z
author: "olladns Security Team"
tags: ["Guide"]
---

<div class="content-card">
  <div class="premium-card-header">
    <span class="card-badge">TL;DR</span>
    <h3>DNS Security Automation in 60 Seconds</h3>
  </div>

  <p class="tldr-paragraph">${tldr}</p>
</div>

<div class="content-card">
  <div class="premium-card-header">
    <span class="card-badge">KEY TAKEAWAYS</span>
    <h3>What You'll Learn</h3>
  </div>

<ul class="grid-list">
${takeaways.map(t => `  <li><span>${t}</span></li>`).join('\n')}
</ul>

</div>

<div class="content-card">

${content.join('\n\n')}

</div>
`;

fs.writeFileSync('src/content/blog/dns-security-automation-how-to-manage-dns-policies-as-code.md', md);
console.log('Done!');
