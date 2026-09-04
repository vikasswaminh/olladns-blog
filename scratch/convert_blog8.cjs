const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../BLOG8.txt');
const outputPath = path.join(__dirname, '../src/content/blog/dns-tunneling-how-attackers-abuse-dns-and-how-to-detect-it.md');

const text = fs.readFileSync(inputPath, 'utf8');

const lines = text.split('\n');

const title = "DNS Tunneling: How Attackers Abuse DNS and How to Detect It";
const description = "DNS tunneling turns your busiest, least watched protocol into a covert channel for data theft and command and control. Here's exactly how it works, the tools attackers use, and how to catch it before it costs you.";
const pubDate = "2026-09-01T00:00:00.000Z";
const tags = '["Threat Research"]';

let markdown = `---
title: "${title}"
description: "${description}"
pubDate: ${pubDate}
author: "olladns Security Team"
tags: ${tags}
---
`;

let currentSection = 0;
let inSection = false;

function closeSection() {
    if (inSection) {
        markdown += `\n</div>\n\n`;
        inSection = false;
    }
}

function openSection(headingLine, isNumbered = true) {
    closeSection();
    markdown += `<div class="content-card">\n\n`;
    if (isNumbered) {
        currentSection++;
        const sectionNum = currentSection.toString().padStart(2, '0');
        markdown += `<span style="color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.95rem;">Section ${sectionNum}</span>\n`;
    }
    markdown += `## ${headingLine}\n`;
    inSection = true;
}

let i = 0;
while(i < lines.length) {
    const line = lines[i].trim();
    if (line === 'TL;DR') {
        openSection('TL;DR', false);
        i++;
        markdown += `${lines[i].trim()}\n`;
        i++;
        continue;
    }
    
    if (line === 'Key Takeaways') {
        openSection('Key Takeaways', false);
        i++;
        while (i < lines.length && lines[i].trim() !== '') {
            let item = lines[i].trim();
            if (item.match(/^\d+\./)) {
                item = item.replace(/^\d+\.\s*/, '* ');
                // Bold the first sentence
                const dotIndex = item.indexOf('.');
                if (dotIndex > 0) {
                    item = item.substring(0, 2) + '**' + item.substring(2, dotIndex + 1) + '**' + item.substring(dotIndex + 1);
                }
            }
            markdown += `${item}\n`;
            i++;
        }
        continue;
    }
    
    if (line === 'The Delivery Truck Nobody Searches' || line === 'A Fast Refresher: What DNS Is Actually Doing' || line === 'So, What Exactly Is DNS Tunneling?' || line === 'How DNS Tunneling Actually Works, Step by Step' || line === 'Why This Actually Works: The Structural Weaknesses Attackers Are Exploiting' || line === 'Real Tools and Techniques Attackers Actually Use' || line === 'The Three Faces of DNS Tunneling: C2, Exfiltration, and Bypass' || line === 'Why Traditional Security Tools Miss This Almost Entirely' || line === 'The Telltale Signals: What Actually Gives Tunneling Away' || line === 'Building Real Detection: From Manual Hunting to Behavioral Engines' || line === 'What a Response Actually Looks Like When Tunneling Is Confirmed' || line === 'Deploying DNS Tunneling Detection Without Drowning in False Positives' || line === 'Common Misconceptions Worth Correcting' || line === 'Where This Is Heading' || line === 'Frequently Asked Questions' || line === 'Bringing It All Together') {
        
        let isNumbered = true;
        if (line === 'Frequently Asked Questions' || line === 'Bringing It All Together') isNumbered = false;
        
        openSection(line, isNumbered);
        i++;
        continue;
    }

    if (line.match(/^title:/) || line.match(/^description:/) || line.match(/^category:/) || line.match(/^keywords:/) || line.match(/^date:/) || line.match(/^readTime:/)) {
        i++;
        continue;
    }

    if (line === 'DNS Tunneling: How Attackers Abuse DNS and How to Detect It' || line.match(/^\d+ min read/)) {
        i++;
        continue;
    }

    if (inSection && line !== '') {
        // Check for FAQ
        if (line.endsWith('?')) {
             markdown += `### ${line}\n`;
        } else {
            markdown += `${line}\n\n`;
        }
    }
    i++;
}

closeSection();

fs.writeFileSync(outputPath, markdown);
console.log("Done");
