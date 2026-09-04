const fs = require('fs');

const text = fs.readFileSync('BLOG7.txt', 'utf8');
const lines = text.split('\n');

let frontmatter = `---
title: "What Is Protective DNS? How It Blocks Cyber Threats at the Resolver"
description: "Protective DNS stops threats before a connection ever happens, right at the resolver. Here's exactly what it is, how it works, what it blocks, and why it's becoming the first line of defense for modern security teams."
pubDate: 2026-08-31T00:00:00.000Z
author: "olladns Security Team"
tags: ["Guide"]
---

`;

let tldr = `<div class="content-card">
  <div class="premium-card-header">
    <span class="card-badge">TL;DR</span>
    <h3>Protective DNS in 60 Seconds</h3>
  </div>

  <p class="tldr-paragraph">Every cyberattack, from phishing to ransomware to command-and-control communication, needs to resolve a domain name before it can do anything harmful. Protective DNS sits at that exact checkpoint, the resolver, and refuses to answer queries for domains it knows or suspects are dangerous. No connection ever forms. No payload ever downloads. No credentials ever get typed into a fake login page. This guide walks through what protective DNS actually is, how the resolver becomes a security checkpoint, the specific threats it blocks (phishing, malware, DGA based command and control, DNS tunneling, lookalike domains), how it differs from firewalls and antivirus, and what a real-world deployment looks like, without the marketing fluff.</p>
</div>

`;

let keyTakeaways = `<div class="content-card">
  <div class="premium-card-header">
    <span class="card-badge">KEY TAKEAWAYS</span>
    <h3>What You'll Learn</h3>
  </div>

<ul class="grid-list">
  <li><span><strong>Every attack must ask, "where is this domain?" first:</strong> Phishing, malware, ransomware, command and control traffic all rely on a DNS lookup before anything malicious can happen, which makes the resolver the earliest possible point to stop them.</span></li>
  <li><span><strong>Protective DNS blocks the lookup, not just the payload:</strong> Instead of reacting to a threat after it arrives, it prevents the connection from forming in the first place, regardless of whether the malicious link came through email, SMS, a QR code, or anything else.</span></li>
  <li><span><strong>It catches what firewalls and antivirus structurally can't:</strong> Firewalls watch IPs and ports that attackers rotate constantly, and antivirus only covers devices with an agent installed. Protective DNS covers every device that is resolved through it, agent or no agent.</span></li>
  <li><span><strong>Behavioral detection matters more than static blocklists:</strong> Modern threats like DGA based malware and fast-moving phishing kits move too quickly for daily updated blocklists to keep up, which is why detection speed and pattern-based analysis are the real differentiators between providers.</span></li>
  <li><span><strong>Deployment discipline matters as much as technology:</strong> Starting in monitoring mode, covering roaming devices, tiering policy, integrating logs into a SIEM, and having a tested rollback plan are what separate a smooth rollout from one that quietly gets disabled after the first false positive.</span></li>
</ul>
</div>

<div class="content-card">

`;

let footer = `
<div class="post-footer" style="margin-top: 3rem; margin-bottom: 1rem; border-top: none; padding-top: 0; text-align: center;">
  <a class="btn" href="https://olladns.com">Learn more about OllaDNS →</a>
</div>
</div>
`;

let mdLines = [];
let inContent = false;

for (let i = 24; i < lines.length; i++) { // Skip headers, tldr, takeaways in the raw text
    let line = lines[i].trim();
    if (line === '') {
        mdLines.push('');
    } else if (line === "The One Thing Every Attack Has in Common" || line === "So, What Exactly Is Protective DNS?" || line === "How the Resolver Becomes a Security Checkpoint" || line === "What Protective DNS Actually Blocks" || line === "The Mechanics Behind the Curtain" || line === "Protective DNS vs. Firewalls, Antivirus, and Secure Web Gateways" || line === "Why This Isn't Theoretical" || line === "What a Real Protective DNS Deployment Looks Like" || line === "The Value That Goes Beyond Blocking" || line === "Common Myths, Cleared Up" || line === "A Practical Checklist for Evaluating Protective DNS Providers" || line === "Where Protective DNS Is Headed" || line === "Frequently Asked Questions" || line === "Bringing It All Together") {
        mdLines.push('## ' + line);
    } else if (line.startsWith('Phishing Infrastructure:') || line.startsWith('Malware Command and Control:') || line.startsWith('Domain Generation Algorithms (DGA):') || line.startsWith('DNS Tunneling and Data Exfiltration:') || line.startsWith('Lookalike and Typosquat Domains:') || line.startsWith('Newly Registered and Suspicious Domains:') || line.startsWith('Ransomware Precursors:')) {
        let parts = line.split(':');
        mdLines.push('### ' + parts[0] + '\n' + parts.slice(1).join(':').trim());
    } else if (line === 'What is protective DNS in simple terms?' || line === 'How is protective DNS different from a firewall?' || line === 'Does protective DNS slow down browsing?' || line === 'Can protective DNS stop ransomware?' || line === 'Does encrypted DNS (DoH/DoT/DoQ) break protective DNS filtering?' || line === 'What happens when a device tries to reach a blocked domain?' || line === 'Is protective DNS only useful for large enterprises?' || line === 'How quickly can protective DNS catch a brand-new phishing domain?' || line === 'Does protective DNS work for remote and hybrid employees?' || line === 'What\'s the difference between protective DNS and DNS filtering generally?') {
        mdLines.push('### ' + line);
    } else {
        mdLines.push(line);
    }
}

let result = frontmatter + tldr + keyTakeaways + mdLines.join('\n') + footer;
fs.writeFileSync('src/content/blog/what-is-protective-dns.md', result);
console.log('Successfully created what-is-protective-dns.md');
