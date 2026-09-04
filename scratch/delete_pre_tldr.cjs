const fs = require('fs');

const files = fs.readdirSync('src/content/blog/').filter(f => f.endsWith('.md'));

files.forEach(f => {
    const path = 'src/content/blog/' + f;
    let content = fs.readFileSync(path, 'utf8');
    const tldrIndex = content.indexOf('<div class="tldr-card">');
    
    if (tldrIndex > -1) {
        const fmEnd = content.indexOf('---', 3) + 3;
        if (fmEnd > -1 && tldrIndex > fmEnd) {
            const beforeTldr = content.substring(fmEnd, tldrIndex).trim();
            if (beforeTldr.length > 0) {
                console.log('Deleting from ' + f + ':\n' + beforeTldr);
                content = content.substring(0, fmEnd) + '\n\n' + content.substring(tldrIndex);
                fs.writeFileSync(path, content);
            }
        }
    }
});
