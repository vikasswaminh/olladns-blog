const fs = require('fs');

let path = 'src/content/blog/what-is-protective-dns.md';
let content = fs.readFileSync(path, 'utf8');

// The current FAQ starts with `## Frequently Asked Questions`
// and ends right before `<div class="content-card">\n\n## Bringing It All Together`

let startIndex = content.indexOf('## Frequently Asked Questions');
let endIndex = content.indexOf('<div class="content-card">\n\n## Bringing It All Together');

if (startIndex !== -1 && endIndex !== -1) {
    let faqBlock = content.substring(startIndex, endIndex);

    // Extract questions and answers
    let qaRegex = /<summary class="faq-summary">(.*?) <span class="faq-plus">\+<\/span><\/summary>\s*<div class="faq-answer">(.*?)<\/div>/g;
    let match;
    let parsedQAs = [];
    
    while ((match = qaRegex.exec(faqBlock)) !== null) {
        parsedQAs.push({
            q: match[1].trim(),
            a: match[2].trim()
        });
    }

    if (parsedQAs.length === 0) {
        console.log("Could not parse QAs from current block. Let's try matching the modified format.");
        // We added `<div class="content-card" style="...">\n  <details class="faq-details">`
        qaRegex = /<summary class="faq-summary">(.*?) <span class="faq-plus">\+<\/span><\/summary>\s*<div class="faq-answer">([\s\S]*?)<\/div>/g;
        while ((match = qaRegex.exec(faqBlock)) !== null) {
            parsedQAs.push({
                q: match[1].trim(),
                a: match[2].trim()
            });
        }
    }

    if (parsedQAs.length > 0) {
        let newFaqHtml = '<div class="content-card">\n\n## Frequently Asked Questions\n\n<div class="faq-container">\n';
        
        parsedQAs.forEach(qa => {
            newFaqHtml += `  <details class="faq-item">\n`;
            newFaqHtml += `    <summary>${qa.q}</summary>\n`;
            newFaqHtml += `    <div class="faq-content">\n`;
            newFaqHtml += `      <p>${qa.a}</p>\n`;
            newFaqHtml += `    </div>\n`;
            newFaqHtml += `  </details>\n\n`;
        });
        
        newFaqHtml += '</div>\n</div>\n\n';

        content = content.replace(faqBlock, newFaqHtml);
        fs.writeFileSync(path, content);
        console.log('Successfully rewrote FAQ with native faq-item classes and one big wrapper box.');
    } else {
        console.log('Failed to extract questions/answers. Please check Regex.');
        console.log(faqBlock);
    }
} else {
    console.log('Could not locate FAQ section bounds.');
}
