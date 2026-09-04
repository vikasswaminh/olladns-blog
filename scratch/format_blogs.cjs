const fs = require('fs');

const files = [
    'dns-over-https-doh-complete-guide.md',
    'dns-filtering-explained.md',
    'dns-firewall-explained-how-dns-firewalls-protect-networks.md',
    'what-is-dns-how-domain-name-system-works.md',
    'what-is-dns-security-a-complete-guide-to-protecting-your-network-in-2026.md'
];

const footerHtml = `

<div class="post-footer" style="margin-top: 3rem; margin-bottom: 1rem; border-top: none; padding-top: 0; text-align: center;">
  <a class="btn" href="https://olladns.com">Learn more about OllaDNS →</a>
</div>
</div>
`;

files.forEach(f => {
    let path = 'src/content/blog/' + f;
    let content = fs.readFileSync(path, 'utf8');

    // Remove the giant inline CSS blob in dns-filtering-explained.md if it exists
    content = content.replace(/\/\* ── Layout ──.*?@media \(max-width: 768px\) \{.*?\}\s*/s, '');
    content = content.replace(/\/\* ── Layout ──.*\}\s*/s, ''); // A bit more aggressive catch-all for the inline CSS if needed

    // 1. Format TL;DR
    content = content.replace(/TL;DR\s*\n+###\s+(.+)\n/g, `<div class="tldr-card">\n  <div class="premium-card-header">\n    <span class="card-badge">TL;DR</span>\n    <h3>$1</h3>\n  </div>\n`);

    // 2. Format Key Takeaways (if exists)
    if (content.includes('Key Takeaways')) {
        content = content.replace(/Key Takeaways\s*\n+###\s+(.+)\n/g, `</div>\n\n<div class="content-card">\n  <div class="premium-card-header">\n    <span class="card-badge">KEY TAKEAWAYS</span>\n    <h3>$1</h3>\n  </div>\n`);
    }

    // 3. Format main content start
    content = content.replace(/\n01\s*\n+##\s+/g, `\n</div>\n\n<div class="content-card">\n\n## `);

    // 4. Remove any hardcoded footer text at the bottom like "[← Back to Home](/)"
    content = content.replace(/\[← Back to Home\].*/gs, '');
    content = content.replace(/\[← All posts\].*/gs, '');
    content = content.replace(/OS Written by \*\*olladns Security Team\*\*.*/gs, '');

    // 5. Add footer box
    content = content.trim() + footerHtml;

    fs.writeFileSync(path, content);
    console.log(`Formatted ${f}`);
});
