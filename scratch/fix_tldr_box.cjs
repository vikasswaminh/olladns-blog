const fs = require('fs');
const files = [
    'what-is-dns-how-domain-name-system-works.md',
    'dns-firewall-explained-how-dns-firewalls-protect-networks.md'
];

files.forEach(f => {
    const path = 'src/content/blog/' + f;
    let content = fs.readFileSync(path, 'utf8');

    let tldrBadgeIdx = content.indexOf('TL;DR</span>');
    if (tldrBadgeIdx > -1) {
        let tldrHeaderIdx = content.lastIndexOf('<div', tldrBadgeIdx);
        // Sometimes it's inside another div like premium-card-header
        let prevDiv = content.lastIndexOf('<div', tldrHeaderIdx - 1);
        if (prevDiv > -1 && content.substring(prevDiv, tldrHeaderIdx).includes('premium-card-header')) {
            tldrHeaderIdx = prevDiv;
        }

        // If it doesn't already have tldr-card
        if (!content.substring(Math.max(0, tldrHeaderIdx - 50), tldrHeaderIdx).includes('tldr-card')) {
            // Find where the next div starts (which should be the end of the TLDR section)
            let nextDivIdx = content.indexOf('<div', tldrHeaderIdx + 10);
            
            if (nextDivIdx > -1) {
                // wrap everything from tldrHeaderIdx to nextDivIdx in <div class="tldr-card">
                let tldrContent = content.substring(tldrHeaderIdx, nextDivIdx).trim();
                
                // Wrap in <p class="tldr-paragraph"> if it's raw text after the header
                // Find the end of the header
                let headerEndIdx = tldrContent.indexOf('</div>') + 6;
                let textPart = tldrContent.substring(headerEndIdx).trim();
                
                if (textPart.length > 0 && !textPart.startsWith('<p')) {
                    textPart = '<p class="tldr-paragraph">' + textPart + '</p>';
                }
                
                let newTldr = '<div class="tldr-card">\n  ' + tldrContent.substring(0, headerEndIdx) + '\n\n  ' + textPart + '\n</div>\n\n';
                
                content = content.substring(0, tldrHeaderIdx) + newTldr + content.substring(nextDivIdx);
                fs.writeFileSync(path, content);
                console.log('Wrapped TL;DR in box for ' + f);
            }
        }
    }
});
