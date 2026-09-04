const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '../src/content/blog');

const mapping = [
    { file: 'what-is-dns-security-a-complete-guide-to-protecting-your-network-in-2026.md', date: '2026-09-08T00:00:00.000Z', title: 'What is DNS Security' },
    { file: 'what-is-dns-how-domain-name-system-works.md', date: '2026-09-07T00:00:00.000Z', title: 'What Is DNS? How Domain Name System Works' },
    { file: 'dns-firewall-explained-how-dns-firewalls-protect-networks.md', date: '2026-09-06T00:00:00.000Z', title: 'DNS Firewall Explained: How DNS Firewalls Protect Networks' },
    { file: 'how-to-use-ai-to-write-seo-friendly-blog-posts.md', date: '2026-09-05T00:00:00.000Z', title: 'How to Use AI to Write SEO-Friendly Blog Posts', isNew: true },
    { file: 'dns-over-https-doh-complete-guide.md', date: '2026-09-04T00:00:00.000Z', title: 'DNS Over HTTPS (DoH): Complete Guide to Secure DNS' },
    { file: 'dnssec-explained-what-it-is-how-it-works-and-why-it-matters.md', date: '2026-09-03T00:00:00.000Z', title: 'DNS SEC Explained: What It Is, How It Works, and Why It Matters' },
    { file: 'what-is-protective-dns.md', date: '2026-09-02T00:00:00.000Z', title: 'What Is Protective DNS? How It Blocks Cyber Threats at the Resolver' },
    { file: 'dns-tunneling-how-attackers-abuse-dns-and-how-to-detect-it.md', date: '2026-09-01T00:00:00.000Z', title: 'DNS Tunneling: How Attackers Abuse DNS and How to Detect It' },
    { file: 'dns-filtering-explained.md', date: '2026-08-31T00:00:00.000Z', title: 'DNS Filtering Explained' } 
];

mapping.forEach(item => {
    const filePath = path.join(dir, item.file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf-8');
        content = content.replace(/pubDate:\s*.*?(\r?\n)/, `pubDate: ${item.date}$1`);
        fs.writeFileSync(filePath, content);
    } else if (item.isNew) {
        const placeholder = `---
title: "${item.title}"
description: "Placeholder for AI blog post"
pubDate: ${item.date}
author: "olladns Security Team"
tags: ["Guide"]
---

<div class="content-card">

## Coming Soon

This is a placeholder for Blog 4.

</div>
`;
        fs.writeFileSync(filePath, placeholder);
    }
});

console.log('Dates updated successfully.');
