const fs = require('fs');

const files = fs.readdirSync('src/content/blog/').filter(f => f.endsWith('.md'));

files.forEach(f => {
    const path = 'src/content/blog/' + f;
    let content = fs.readFileSync(path, 'utf8');
    
    if (content.includes('<div class="tldr-card">')) {
        content = content.replace(/<div class="tldr-card">/g, '<div class="content-card">');
        fs.writeFileSync(path, content);
        console.log('Replaced tldr-card with content-card in ' + f);
    }
});
