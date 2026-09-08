const fs = require('fs');
const file = 'src/content/blog/dns-security-automation-how-to-manage-dns-policies-as-code.md';
let content = fs.readFileSync(file, 'utf8');

const faqIndex = content.indexOf('## Frequently Asked Questions');
const endFaqIndex = content.indexOf('## Bringing It All Together');

if (faqIndex > -1 && endFaqIndex > -1) {
  let beforeFaq = content.substring(0, faqIndex);
  let afterFaq = content.substring(endFaqIndex);
  let faqContent = content.substring(faqIndex, endFaqIndex);

  // Close the previous card and open a new one
  if (beforeFaq.endsWith('\n\n')) {
      beforeFaq = beforeFaq.slice(0, -2) + '</div>\n\n<div class="content-card" id="frequently-asked-questions">\n\n';
  } else {
      beforeFaq = beforeFaq + '\n</div>\n\n<div class="content-card" id="frequently-asked-questions">\n\n';
  }

  let style = `
<style>
  .faq-details {
    margin-bottom: 1rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 1rem;
  }
  .faq-summary {
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    font-size: 1.1rem;
    color: var(--text-main, #333);
  }
  .faq-summary::-webkit-details-marker {
    display: none;
  }
  .faq-details[open] .faq-plus {
    transform: rotate(45deg);
    transition: transform 0.2s ease;
  }
  .faq-plus {
    font-size: 1.5rem;
    transition: transform 0.2s ease;
    color: var(--accent, #d32f2f);
  }
  .faq-answer {
    margin-top: 1rem;
    line-height: 1.6;
    color: var(--text-muted, #555);
  }
</style>
`;

  let parsedFaq = '## Frequently Asked Questions\n' + style + '\n';
  
  const lines = faqContent.split('\n');
  let q = '';
  let a = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '## Frequently Asked Questions' || line === '') continue;
    
    if (line.endsWith('?') || line.includes('?')) {
       // Save previous QA
       if (q && a) {
         parsedFaq += `  <details class="faq-details">\n    <summary class="faq-summary">${q.replace(/^### /, '').replace(/^What /,'What ').trim()} <span class="faq-plus">+</span></summary>\n    <div class="faq-answer">${a.trim()}</div>\n  </details>\n\n`;
       }
       q = line;
       a = '';
    } else {
       a += line + ' ';
    }
  }
  // Save last
  if (q && a) {
     parsedFaq += `  <details class="faq-details">\n    <summary class="faq-summary">${q.replace(/^### /, '').replace(/^What /,'What ').trim()} <span class="faq-plus">+</span></summary>\n    <div class="faq-answer">${a.trim()}</div>\n  </details>\n\n`;
  }

  // we also need to close this card before Bringing it all together
  parsedFaq += '</div>\n\n<div class="content-card">\n\n';

  const newContent = beforeFaq + parsedFaq + afterFaq;
  fs.writeFileSync(file, newContent);
  console.log('FAQ fixed');
} else {
  console.log('Could not find bounds');
}
