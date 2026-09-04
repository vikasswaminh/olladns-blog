const fs = require('fs');

let input = fs.readFileSync('BLOG8.txt', 'utf8');
let lines = input.split('\n').map(l => l.trimRight());

let title = lines.find(l => l.startsWith('title:')).replace('title: ', '').replace(/[“”"]/g, '');
let description = lines.find(l => l.startsWith('description:')).replace('description: ', '').replace(/[“”"]/g, '');
let tags = lines.find(l => l.startsWith('category:')).replace('category: ', '').replace(/[“”"]/g, '');

let frontmatter = `---
title: "${title}"
description: "${description}"
pubDate: 2026-09-04T00:00:00.000Z
author: "olladns Security Team"
tags: ["${tags}"]
---

`;

let md = frontmatter;

let tldrIdx = lines.findIndex(l => l === 'TL;DR');
let tldrText = lines[tldrIdx + 1];

md += `<div class="content-card">
  <div class="premium-card-header">
    <span class="card-badge">TL;DR</span>
    <h3>DNS Tunneling: A Covert Channel</h3>
  </div>

  <p class="tldr-paragraph">${tldrText}</p>
</div>

<div class="content-card">

`;

let currentSection = '';
for (let i = 13; i < lines.length; i++) {
    let line = lines[i];
    if (line === 'Key Takeaways') {
        md += `## Key Takeaways\n`;
    } else if (line.match(/^\d+\.\t/)) {
        md += `* **${line.substring(line.indexOf('\t') + 1, line.indexOf('.'))}** ${line.substring(line.indexOf('.') + 1).trim()}\n`;
    } else if (line === '') {
        md += '\n';
    } else if (line === 'Frequently Asked Questions') {
        md += `</div>\n\n<div class="content-card" id="frequently-asked-questions">\n\n## Frequently Asked Questions\n\n`;
        md += `<style>
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
    color: var(--text-muted, #555);
    line-height: 1.6;
  }
</style>\n\n`;
    } else if (line.startsWith('title:') || line.startsWith('description:') || line.startsWith('category:') || line.startsWith('keywords:') || line.startsWith('date:') || line.startsWith('readTime:')) {
        // Skip metadata lines that might have slipped through
        continue;
    } else if (line.endsWith('?') && lines[i-1] === '') {
        // FAQ Question
        let question = line;
        let answer = '';
        let j = i + 1;
        while (j < lines.length && lines[j] !== '') {
            answer += lines[j] + ' ';
            j++;
        }
        answer = answer.trim();
        
        if (md.includes('Frequently Asked Questions')) {
            md += `  <details class="faq-details">
    <summary class="faq-summary">${question} <span class="faq-plus">+</span></summary>
    <div class="faq-answer">${answer}</div>
  </details>\n\n`;
            i = j - 1; // skip answer lines
        } else {
             md += `## ${line}\n`;
        }
    } else if (!line.includes('.') && line.length > 0 && line.length < 100 && lines[i-1] === '' && line !== 'Bringing It All Together') {
        md += `## ${line}\n`;
    } else if (line === 'Bringing It All Together') {
        md += `</div>\n\n<div class="content-card">\n\n## Bringing It All Together\n`;
    } else {
        md += `${line}\n`;
    }
}

md += `\n</div>\n`;

// Fix list formatting for Key Takeaways, actually the loop above probably made some mess.
// Let's refine it with a quick check on output.

fs.writeFileSync('src/content/blog/dns-tunneling-how-attackers-abuse-dns-and-how-to-detect-it.md', md);
console.log('Done!');
