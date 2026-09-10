const fs = require('fs');

const input = fs.readFileSync('c:\\Users\\Dell\\Downloads\\olladns-blog\\BLOG12.txt', 'utf8');
const lines = input.split('\n').map(l => l.trimEnd());

let out = `---
title: "DNS Spoofing and Cache Poisoning Explained: How Attackers Redirect Your Traffic"
description: "DNS spoofing tricks a resolver into catching a fake answer, silently redirecting anyone who asks. Here's exactly how cache poisoning works, from the original 16-bit flaw to the Kaminsky attack, and how to stop it."
pubDate: 2026-09-08T00:00:00.000Z
author: "olladns Security Team"
tags: ["Guide"]
---
<div class="content-card">
  <div class="premium-card-header">
    <span class="card-badge">TL;DR</span>
  </div>

  <p class="tldr-paragraph">**DNS Spoofing in 60 Seconds**<br/>
  • DNS cache poisoning happens when an attacker tricks a resolver into storing a fake answer for a domain, so every device that asks that resolver gets redirected until the bad entry expires or gets flushed.<br/>
  • The core weakness is old and structural: a resolver accepts a UDP response as genuine if it matches a 16-bit transaction number and the right source port, and both of those are guessable given enough attempts.<br/>
  • The Kaminsky attack, revealed in 2008, made this dramatically easier by querying random nonexistent subdomains, forcing the resolver to ask fresh questions an attacker could race to answer first.<br/>
  • Modern defenses, source port randomization, 0x20 encoding, DNS cookies, and cryptographic signing through DNSSEC, have raised the bar significantly, but newer techniques like SAD DNS show the underlying weakness has never fully gone away.<br/>
  • The most reliable fix isn't a single patch, it's moving DNS resolution to a resolver built to validate, rate limit, and monitor for exactly this kind of forgery in the first place.</p>
</div>

<div class="content-card">
  <div class="premium-card-header">
    <span class="card-badge">KEY TAKEAWAYS</span>
  </div>

<div class="takeaway-cards">
  <div class="takeaway-card">
    <span class="takeaway-num">01</span>
    <span class="takeaway-text">**The Mechanism:** Exactly what a resolver checks before trusting a DNS answer, and why that check was breakable from the start.</span>
  </div>
  <div class="takeaway-card">
    <span class="takeaway-num">02</span>
    <span class="takeaway-text">**The Kaminsky Attack:** How one researcher's 2008 discovery turned a slow, theoretical flaw into a fast, practical one.</span>
  </div>
  <div class="takeaway-card">
    <span class="takeaway-num">03</span>
    <span class="takeaway-text">**Attack Variants:** The difference between off path cache poisoning, on path interception, and local network spoofing, and why they're not the same threat.</span>
  </div>
  <div class="takeaway-card">
    <span class="takeaway-num">04</span>
    <span class="takeaway-text">**Real Consequences:** What happens to a victim once a poisoned entry sits in a resolver's cache.</span>
  </div>
  <div class="takeaway-card">
    <span class="takeaway-num">05</span>
    <span class="takeaway-text">**Defenses:** Which mitigations genuinely close the gap, DNSSEC included, and which only make the attack slightly harder.





<span style="color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.95rem;">Section 01</span></span>
  </div>
</div>
</div>

<div class="content-card">
`;

// Extract sections from body starting after line 30
let bodyLines = lines.slice(30);
let sectionCounter = 2; // starting from Section 02 since Section 01 is inside the takeaway

let inFAQ = false;

for (let i = 0; i < bodyLines.length; i++) {
  let line = bodyLines[i];
  if (line.trim() === '') continue;

  if (line === 'Frequently Asked Questions') {
    inFAQ = true;
    out += `\n\n\n\n\n\n\n\n## Frequently Asked Questions\n\n<div class="faq-container">\n`;
    continue;
  }
  if (line === 'Wrapping Up') {
    inFAQ = false; // Just in case, but it's at the end
    out += `\n<span style="color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.95rem;">Section ${sectionCounter.toString().padStart(2, '0')}</span>\n## Bringing It All Together\n`;
    sectionCounter++;
    continue;
  }

  // Check if it's a heading (no period at the end and relatively short)
  // or specifically matches one of the headings
  const isHeading = !inFAQ && line.length > 5 && line.length < 80 && !line.endsWith('.') && !line.includes('•') && bodyLines[i+1] && bodyLines[i+1].length > 80;
  
  if (isHeading && !line.startsWith('65,536:') && !line.startsWith('2008:') && !line.startsWith('1 win:')) {
    out += `\n<span style="color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.95rem;">Section ${sectionCounter.toString().padStart(2, '0')}</span>\n## ${line}\n`;
    sectionCounter++;
  } else if (inFAQ && line.endsWith('?')) {
    let ans = '';
    let j = i + 1;
    while (j < bodyLines.length && bodyLines[j].trim() !== '' && !bodyLines[j].endsWith('?') && bodyLines[j] !== 'Wrapping Up') {
      ans += bodyLines[j] + ' ';
      j++;
    }
    out += `  <details class="faq-item">\n    <summary>${line}</summary>\n    <div class="faq-content">\n      <p>${ans.trim()}</p>\n    </div>\n  </details>\n\n`;
    i = j - 1; // skip answer lines
  } else if (inFAQ && line === '</div>') {
    // skip
  } else if (inFAQ) {
      if (line.trim() === '') {
          // ignore
      }
  } else {
    // Normal paragraph
    if (line.startsWith('•') || line.match(/^[0-9]+:/)) {
       out += `- ${line}\n`;
    } else {
       out += `${line}\n\n`;
    }
  }
}

if (inFAQ) {
    out += `</div>\n\n`;
}

out += `
<a href="https://olladns.com" class="content-card" style="display: block; text-align: center; text-decoration: none; margin-top: 2rem; border: 2px solid var(--accent); transition: transform 0.2s ease;">
  <h3 style="margin: 0; color: var(--accent);">Return to the OllaDNS Homepage →</h3>
  <p style="margin: 0.5rem 0 0; color: var(--muted); font-size: 0.9rem;">Explore our Protective DNS platform and enterprise solutions.</p>
</a>

</div>
`;

fs.writeFileSync('c:\\Users\\Dell\\Downloads\\olladns-blog\\src\\content\\blog\\dns-spoofing-and-cache-poisoning-explained.md', out);
console.log('Done');
