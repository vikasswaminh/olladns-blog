const fs = require('fs');

const text = fs.readFileSync('BLOG8.txt', 'utf8');
const lines = text.split('\n');

let frontmatter = `---
title: "DNS Tunneling: How Attackers Abuse DNS and How to Detect It"
description: "DNS tunneling turns your busiest, least watched protocol into a covert channel for data theft and command and control. Here's exactly how it works, the tools attackers use, and how to catch it before it costs you."
pubDate: 2026-09-03T00:00:00.000Z
author: "OllaDNS Security Team"
tags: ["Threat Research"]
---

`;

let tldr = `<div class="content-card">
  <div class="premium-card-header">
    <span class="card-badge">TL;DR</span>
    <h3>DNS Tunneling in 60 Seconds</h3>
  </div>

  <p class="tldr-paragraph">DNS tunneling hides stolen data, malware instructions, and full command and control channels inside ordinary looking DNS queries, the one type of traffic almost every firewall on the planet lets through without a second look. Attackers encode payloads into subdomain labels, send them to a domain they control, and let their own nameserver decode the message on the other end. Because it rides on port 53, a protocol nobody blocks and few people log closely, it slips past traditional network defenses that are busy watching IP addresses and ports instead of the actual content of a lookup. This piece walks through exactly how tunneling works at the packet level, the real tools and malware families that use it, why conventional monitoring misses it, and the specific behavioral signals, things like entropy, subdomain length, query volume, timing, and record type abuse, that let a properly tuned DNS security layer catch it before data actually leaves the building.</p>
</div>

`;

let keyTakeaways = `<div class="content-card">
  <div class="premium-card-header">
    <span class="card-badge">KEY TAKEAWAYS</span>
    <h3>What You'll Learn</h3>
  </div>

<ul class="grid-list">
  <li><span><strong>The Delivery Truck Nobody Searches:</strong> DNS tunneling hides data and commands inside ordinary looking DNS queries, exploiting the fact that DNS traffic is almost universally permitted through firewalls and rarely inspected at the content level.</span></li>
  <li><span><strong>Not a Vulnerability, but a Trust Gap:</strong> The technique isn't a DNS vulnerability. It's a trust gap. Attackers register a domain, control its authoritative nameserver, and use that control to decode data smuggled into subdomain labels and encode instructions back into responses.</span></li>
  <li><span><strong>Traditional Firewalls Miss This:</strong> Traditional firewalls and signature-based tools structurally miss this, because they filter by IP address and port rather than analyzing the actual content and behavior of individual DNS queries.</span></li>
  <li><span><strong>The Telltale Signs are Statistical:</strong> The telltale signs are statistical, not obvious. Unusually long or high entropy subdomains, abnormal query volume to a single domain, elevated NXDOMAIN rates, heavy TXT or NULL record usage, and suspiciously regular query timing are most powerful when correlated together against a real traffic baseline.</span></li>
  <li><span><strong>Continuous Monitoring is Essential:</strong> Continuous, behavior-based DNS monitoring, not periodic manual hunting alone, is what closes this gap, catching tunneling activity in real time at the resolver, before stolen data finishes leaving the network.</span></li>
</ul>
</div>

`;

let footer = `
<div class="post-footer" style="margin-top: 3rem; margin-bottom: 1rem; border-top: none; padding-top: 0; text-align: center;">
  <a class="btn" href="https://olladns.com">Learn more about OllaDNS →</a>
</div>
`;

let mdLines = [];
let headings = [
    "The Delivery Truck Nobody Searches",
    "A Fast Refresher: What DNS Is Actually Doing",
    "So, What Exactly Is DNS Tunneling?",
    "How DNS Tunneling Actually Works, Step by Step",
    "Why This Actually Works: The Structural Weaknesses Attackers Are Exploiting",
    "Real Tools and Techniques Attackers Actually Use",
    "The Three Faces of DNS Tunneling: C2, Exfiltration, and Bypass",
    "Why Traditional Security Tools Miss This Almost Entirely",
    "The Telltale Signals: What Actually Gives Tunneling Away",
    "Building Real Detection: From Manual Hunting to Behavioral Engines",
    "What a Response Actually Looks Like When Tunneling Is Confirmed",
    "Deploying DNS Tunneling Detection Without Drowning in False Positives",
    "Common Misconceptions Worth Correcting",
    "Where This Is Heading"
];

let faqBlockOpen = `
<div class="content-card">
  <div class="premium-card-header">
    <span class="card-badge">FAQ</span>
    <h3>Frequently Asked Questions</h3>
  </div>

  <style>
    .faq-details {
      margin-bottom: 1rem;
      border-bottom: 1px solid #eee;
      padding-bottom: 1rem;
    }
    .faq-summary {
      font-weight: bold;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      list-style: none;
      font-size: 1.1rem;
      color: var(--text-main, #333);
    }
    .faq-summary::-webkit-details-marker {
      display: none;
    }
    .faq-details[open] .faq-plus {
      transform: rotate(45deg);
      transition: transform 0.2s ease;
    }
    .faq-plus {
      font-size: 1.5rem;
      transition: transform 0.2s ease;
      color: var(--accent, #d32f2f);
    }
    .faq-answer {
      margin-top: 1rem;
      color: var(--text-muted, #555);
      line-height: 1.6;
    }
  </style>

`;
let faqBlockClose = `</div>\n`;

let conclusionOpen = `
<div class="content-card">
  <div class="premium-card-header">
    <span class="card-badge">SUMMARY</span>
    <h3>Bringing It All Together</h3>
  </div>
`;

let inFaq = false;
let inConclusion = false;

mdLines.push('<div class="content-card">');

for (let i = 21; i < lines.length; i++) {
    let line = lines[i].trim();
    if (line === '') {
        if (!inFaq && !inConclusion) mdLines.push('');
    } else if (headings.includes(line)) {
        mdLines.push('## ' + line);
    } else if (line === "Frequently Asked Questions") {
        mdLines.push('</div>\n');
        mdLines.push(faqBlockOpen);
        inFaq = true;
    } else if (line === "Bringing It All Together") {
        if (inFaq) mdLines.push(faqBlockClose);
        inFaq = false;
        mdLines.push(conclusionOpen);
        inConclusion = true;
    } else if (inFaq) {
        if (line.endsWith('?')) {
            mdLines.push('  <details class="faq-details">');
            mdLines.push('    <summary class="faq-summary">' + line + ' <span class="faq-plus">+</span></summary>');
        } else {
            mdLines.push('    <div class="faq-answer">' + line + '</div>');
            mdLines.push('  </details>\n');
        }
    } else if (inConclusion) {
        mdLines.push('  <p>' + line + '</p>');
        // We only have a few lines in conclusion, close after loop.
    } else {
        mdLines.push(line);
    }
}
if (inConclusion) mdLines.push('</div>\n');
if (inFaq) mdLines.push(faqBlockClose); // Just in case it ends in FAQ

let result = frontmatter + tldr + keyTakeaways + mdLines.join('\n') + footer;
fs.writeFileSync('src/content/blog/dns-tunneling-how-attackers-abuse-dns-and-how-to-detect-it.md', result);
console.log('Successfully created dns-tunneling with proper FAQ and Summary cards.');
