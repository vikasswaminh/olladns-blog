const fs = require('fs');

const files = [
    'dns-over-https-doh-complete-guide.md',
    'dns-filtering-explained.md',
    'dns-firewall-explained-how-dns-firewalls-protect-networks.md',
    'what-is-dns-how-domain-name-system-works.md',
    'what-is-dns-security-a-complete-guide-to-protecting-your-network-in-2026.md'
];

files.forEach(f => {
    let path = 'src/content/blog/' + f;
    let content = fs.readFileSync(path, 'utf8');

    // We will do a generic replacement of bullet points inside the first part of the file (before the first ## )
    // because that's where TL;DR and Key Takeaways are.
    
    // Instead of complex parsing, let's just find bullet lists and convert them.
    // A bullet list starts with `*   ` or `* ` or `- `
    
    // Function to convert bullet block to HTML
    const replaceBullets = (match) => {
        let lines = match.trim().split('\n');
        let htmlLines = ['<ul class="grid-list">'];
        for (let line of lines) {
            let text = line.replace(/^[\*\-]\s+(✓|✔)?\s*/, '').trim();
            // Basic inline bold parsing
            text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            // Basic inline link parsing
            text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
            htmlLines.push(`  <li><span>${text}</span></li>`);
        }
        htmlLines.push('</ul>\n');
        return htmlLines.join('\n');
    };

    // Find blocks of bullet points (consecutive lines starting with * or -)
    // We only want to convert bullet points that are before the first "## "
    let firstH2Index = content.indexOf('\n## ');
    if (firstH2Index === -1) firstH2Index = content.length;

    let headerPart = content.substring(0, firstH2Index);
    let bodyPart = content.substring(firstH2Index);

    headerPart = headerPart.replace(/(?:^|\n)(?:[\*\-]\s+.*(?:\n|$))+/g, match => {
        return '\n' + replaceBullets(match);
    });

    fs.writeFileSync(path, headerPart + bodyPart);
    console.log(`Fixed bullets in ${f}`);
});
