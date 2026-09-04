const fs = require('fs');

const files = fs.readdirSync('src/content/blog/').filter(f => f.endsWith('.md'));

files.forEach(f => {
    const path = 'src/content/blog/' + f;
    let content = fs.readFileSync(path, 'utf8');
    
    // Find <div class="tldr-card">
    let tldrIndex = content.indexOf('<div class="tldr-card">');
    if (tldrIndex > -1) {
        // Find the first </div> after tldrIndex
        let endDivIndex = content.indexOf('</div>', tldrIndex);
        // Wait, there is a nested div! <div class="premium-card-header"> ... </div>
        // So the closing div for tldr-card is the SECOND </div>
        // Let's find the closing div properly.
        let htmlSnippet = content.substring(tldrIndex);
        let openDivs = 0;
        let closeIndex = -1;
        let pos = 0;
        
        while (pos < htmlSnippet.length) {
            let nextOpen = htmlSnippet.indexOf('<div', pos);
            let nextClose = htmlSnippet.indexOf('</div', pos);
            
            if (nextOpen > -1 && nextOpen < nextClose) {
                openDivs++;
                pos = nextOpen + 4;
            } else if (nextClose > -1) {
                openDivs--;
                pos = nextClose + 6;
                if (openDivs === 0) {
                    closeIndex = tldrIndex + pos;
                    break;
                }
            } else {
                break;
            }
        }
        
        if (closeIndex > -1) {
            // we remove `<div class="tldr-card">` (and any trailing newline)
            // and we remove `</div>` at closeIndex
            let pre = content.substring(0, tldrIndex);
            let inner = content.substring(tldrIndex + '<div class="tldr-card">'.length, closeIndex - 6);
            let post = content.substring(closeIndex);
            
            // Clean up leading/trailing newlines in inner
            inner = inner.trim();
            
            content = pre + '\n' + inner + '\n\n' + post;
            fs.writeFileSync(path, content);
            console.log('Removed tldr-card box from ' + f);
        }
    }
});
