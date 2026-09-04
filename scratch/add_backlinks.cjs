const fs = require('fs');

const files = fs.readdirSync('src/content/blog/').filter(f => f.endsWith('.md'));

files.forEach(f => {
    const path = 'src/content/blog/' + f;
    let content = fs.readFileSync(path, 'utf8');

    // To be safe, let's just find the first paragraph after the first H2 and inject a sentence:
    // "Learn how [OllaDNS](https://olladns.com) secures networks against these threats."
    
    // Actually, maybe it's better to just replace the first instance of 'DNS security' or 'DNS filtering' or 'DNS firewall' with a link to OllaDNS, or just inject a standard markdown backlink block.

    // Let's add a subtle backlink at the end of the first paragraph after the first heading.
    // Or just find the first H2:
    let firstH2 = content.indexOf('\n## ');
    if (firstH2 > -1) {
        let firstParaEnd = content.indexOf('\n\n', firstH2 + 5);
        if (firstParaEnd > -1) {
            let injection = ' As organizations scale, solutions like [OllaDNS](https://olladns.com) provide essential visibility and protection at this layer.';
            // Only inject if it doesn't already have OllaDNS link there
            if (!content.substring(firstH2, firstParaEnd + 100).includes('OllaDNS](https://olladns.com)')) {
                content = content.substring(0, firstParaEnd) + injection + content.substring(firstParaEnd);
                fs.writeFileSync(path, content);
                console.log('Injected OllaDNS backlink in ' + f);
            }
        }
    }
});
