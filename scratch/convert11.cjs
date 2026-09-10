const fs = require('fs');

const input = fs.readFileSync('BLOG11.txt', 'utf8');
const lines = input.split('\n');

let title = '';
let description = '';
let date = '2026-09-04T00:00:00.000Z'; // default
let readTime = '';

let tldr = '';
let takeaways = [];
let content = [];
let state = 'start';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  if (line.startsWith('title:')) {
    title = line.replace('title:', '').trim().replace(/^“|”$/g, '').replace(/^"|"$/g, '');
    continue;
  }
  if (line.startsWith('description:')) {
    description = line.replace('description:', '').trim().replace(/^“|”$/g, '').replace(/^"|"$/g, '');
    continue;
  }
  if (line.startsWith('date:')) {
    date = line.replace('date:', '').trim().replace(/^“|”$/g, '').replace(/^"|"$/g, '') + 'T00:00:00.000Z';
    continue;
  }
  if (line.startsWith('readTime:')) {
    readTime = line.replace('readTime:', '').trim().replace(/^“|”$/g, '').replace(/^"|"$/g, '');
    continue;
  }
  
  if (state === 'start') {
    if (line === 'TL;DR') {
      state = 'tldr';
    }
  } else if (state === 'tldr') {
    if (line === 'Key Takeaways') {
      state = 'takeaways';
    } else if (line !== '' && !line.startsWith('RPZ is the mechanism') && !line.startsWith('title:') && !line.startsWith('description:') && !line.startsWith('category:') && !line.startsWith('keywords:') && !line.startsWith('date:') && !line.startsWith('readTime:')) {
      tldr += line + ' ';
    }
  } else if (state === 'takeaways') {
    if (line === 'The Mechanism Nobody Names') {
      state = 'content';
      content.push('## ' + line);
    } else if (line.match(/^\d+\./)) {
      takeaways.push(line.replace(/^\d+\./, '').trim());
    }
  } else if (state === 'content') {
    if (line === '') {
      content.push('');
    } else if (
        line === 'A Quick Refresher: What DNS Actually Does' ||
        line === 'So, What Exactly Is a Response Policy Zone?' ||
        line === 'Where RPZ Came From' ||
        line === 'How RPZ Works Under the Hood, Step by Step' ||
        line === 'The Trigger Types: RPZ Can Match More Than Just a Domain Name' ||
        line === 'Policy Actions: What Happens When a Query Matches' ||
        line === 'How Threat Intelligence Feeds Update an RPZ in Real Time' ||
        line === 'Layering Policy: RPZ Feeds, Walled Gardens, and Overrides' ||
        line === 'Why RPZ is Better Than a Flat Blocklist' ||
        line === 'Encrypted DNS (DoH, DoT, DoQ) Doesn\'t Break RPZ' ||
        line === 'Limitations of RPZ (What It Doesn\'t Do)' ||
        line === 'Where RPZ Fits in the Broader SASE and Zero Trust Architecture' ||
        line === 'The Future of Real-Time Policy Enforcement' ||
        line === 'Frequently Asked Questions' ||
        line === 'Bringing It All Together'
    ) {
      content.push('## ' + line);
    } else if (
      line === 'QNAME triggers' ||
      line === 'Response IP triggers' ||
      line === 'NSDNAME triggers' ||
      line === 'NSIP triggers' ||
      line === 'Client IP triggers' ||
      line === 'NXDOMAIN' ||
      line === 'NODATA' ||
      line === 'A walled garden response' ||
      line === 'Passthru' ||
      line === 'Drop' ||
      line.match(/^\d+\.\s/)
    ) {
      content.push('### ' + line);
    } else {
      content.push(line);
    }
  }
}

const md = `---
title: "${title || 'Response Policy Zones (RPZ): How Real-Time DNS Blocking Actually Works'}"
description: "${description || "Every DNS firewall claims to 'block malicious domains in real time.' RPZ is the actual mechanism that makes that possible. Here's exactly how Response Policy Zones work, how they're built, and why they're the quiet engine behind almost every modern DNS security product."}"
pubDate: ${date}
author: "olladns Security Team"
tags: ["Guide"]
---

<div class="content-card">
  <div class="premium-card-header">
    <span class="card-badge">TL;DR</span>
    <h3>DNS Security Automation in 60 Seconds</h3>
  </div>

  <p class="tldr-paragraph">${tldr.trim()}</p>
</div>

<div class="content-card">
  <div class="premium-card-header">
    <span class="card-badge">KEY TAKEAWAYS</span>
    <h3>What You'll Learn</h3>
  </div>

<style>
.takeaway-cards {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
}
.takeaway-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: #fff;
  border: 1px solid #eaeaea;
  border-left: 4px solid var(--accent, #DA291C);
  border-radius: 8px;
  padding: 1rem 1.25rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.03);
}
.takeaway-num {
  font-size: 1.1rem;
  font-weight: 900;
  color: var(--accent, #DA291C);
  min-width: 1.5rem;
  line-height: 1.4;
}
.takeaway-text {
  font-size: 0.92rem;
  line-height: 1.5;
  color: #333;
}
</style>
<div class="takeaway-cards">
${takeaways.map((t, i) => `  <div class="takeaway-card">
    <span class="takeaway-num">0${i+1}</span>
    <span class="takeaway-text">${t}</span>
  </div>`).join('\n')}
</div>

</div>

<div class="content-card">

${content.join('\n\n')}

</div>
`;

fs.writeFileSync('src/content/blog/response-policy-zones-rpz-how-real-time-dns-blocking-actually-works.md', md);
console.log('Done converting BLOG11!');
