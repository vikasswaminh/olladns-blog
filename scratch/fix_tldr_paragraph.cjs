const fs = require('fs');
const files = fs.readdirSync('src/content/blog/').filter(f => f.endsWith('.md'));

files.forEach(f => {
    const path = 'src/content/blog/' + f;
    let content = fs.readFileSync(path, 'utf8');

    // Find the TL;DR header
    let tldrBadgeIdx = content.indexOf('TL;DR</span>');
    if (tldrBadgeIdx > -1) {
        let tldrHeaderIdx = content.lastIndexOf('<div', tldrBadgeIdx);
        // Sometimes it's inside another div like premium-card-header
        let prevDiv = content.lastIndexOf('<div', tldrHeaderIdx - 1);
        if (prevDiv > -1 && content.substring(prevDiv, tldrHeaderIdx).includes('premium-card-header')) {
            tldrHeaderIdx = prevDiv;
        }

        let ulStart = content.indexOf('<ul', tldrBadgeIdx);
        let ulEnd = content.indexOf('</ul>', ulStart) + 5;

        // Make sure we found the ul
        if (ulStart > -1 && ulEnd > ulStart && (ulStart - tldrBadgeIdx) < 500) {
            let ulHtml = content.substring(ulStart, ulEnd);
            
            let listItems = [];
            let liRegex = /<li>(.*?)<\/li>/gs;
            let match;
            while ((match = liRegex.exec(ulHtml)) !== null) {
                let text = match[1].replace(/<[^>]+>/g, '').trim();
                listItems.push(text);
            }

            let paragraphHtml = '<p class="tldr-paragraph">' + listItems.join(' ') + '</p>';
            
            let headerEnd = content.indexOf('</div>', tldrBadgeIdx);
            // If premium-card-header, it might have nested divs? No, it's just <div class="premium-card-header"><span></span><h3></h3></div>
            headerEnd = content.indexOf('</div>', content.indexOf('</h', tldrBadgeIdx)) + 6;
            
            let headerHtml = content.substring(tldrHeaderIdx, headerEnd);
            
            let newSection = '<div class="tldr-card">\n  ' + headerHtml + '\n\n  ' + paragraphHtml + '\n</div>';
            
            // Only replace if we haven't already added tldr-card in this exact spot
            // (The first script ran on two files and added tldr-card)
            if (content.substring(Math.max(0, tldrHeaderIdx - 30), tldrHeaderIdx).includes('tldr-card')) {
                // already has tldr-card, maybe we just need to replace the ul?
                // actually we can just overwrite the whole tldr-card outer div
                let cardStart = content.lastIndexOf('<div class="tldr-card">', tldrHeaderIdx);
                let oldSectionEnd = ulEnd;
                // find the closing div of tldr-card
                let cardEnd = content.indexOf('</div>', ulEnd);
                if (cardEnd > -1) {
                    content = content.substring(0, cardStart) + newSection + content.substring(cardEnd + 6);
                    fs.writeFileSync(path, content);
                    console.log('Fixed TL;DR (re-run) in ' + f);
                }
            } else {
                content = content.substring(0, tldrHeaderIdx) + newSection + content.substring(ulEnd);
                fs.writeFileSync(path, content);
                console.log('Fixed TL;DR in ' + f);
            }
        }
    }
});
