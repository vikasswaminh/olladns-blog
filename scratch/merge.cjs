const fs = require('fs');

const lines = fs.readFileSync('src/content/blog/dnssec-explained-what-it-is-how-it-works-and-why-it-matters.md', 'utf-8').split('\n');

let newLines = [];
let inRestOfFile = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.includes('KEY TAKEAWAYS')) {
        inRestOfFile = false;
    }
    
    if (i === 45) { // Line 46
        newLines.push('<div class="content-card">');
        inRestOfFile = true;
    }
    
    if (inRestOfFile) {
        if (line.trim() === '<div class="content-card">' || line.trim() === '<div class="content-card table-card">') {
            continue;
        }
        
        if (line.trim() === '</div>') {
            let lookahead = i + 1;
            while (lookahead < lines.length && lines[lookahead].trim() === '') {
                lookahead++;
            }
            if (lookahead < lines.length && (lines[lookahead].trim() === '<div class="content-card">' || lines[lookahead].trim() === '<div class="content-card table-card">')) {
                continue;
            }
            
            if (lookahead === lines.length || (lookahead === lines.length - 1 && lines[lookahead].trim() === '')) {
                newLines.push(line);
                continue;
            }
        }
        newLines.push(line);
    } else {
        newLines.push(line);
    }
}

fs.writeFileSync('src/content/blog/dnssec-explained-what-it-is-how-it-works-and-why-it-matters.md', newLines.join('\n'));
