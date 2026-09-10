const fs = require('fs');
const path = require('path');

const mdFilePath = path.join(__dirname, '../src/content/blog/response-policy-zones-rpz-how-real-time-dns-blocking-actually-works.md');
const cssFilePath = path.join(__dirname, '../src/styles/global.css');

let mdContent = fs.readFileSync(mdFilePath, 'utf8');

// Regex to find all <style>...</style> blocks
const styleRegex = /<style>([\s\S]*?)<\/style>/g;
let match;
let cssToAppend = '\n/* Styles extracted from response-policy-zones-rpz-how-real-time-dns-blocking-actually-works.md */\n';

while ((match = styleRegex.exec(mdContent)) !== null) {
    cssToAppend += match[1] + '\n';
}

// Reduce margin on unified-mechanism-card from 3rem to 1.5rem to fix huge gap
cssToAppend = cssToAppend.replace(/margin:\s*3rem\s+0;/g, 'margin: 1.5rem 0;');

// Also reduce margin on summary-box if it exists
cssToAppend = cssToAppend.replace(/margin:\s*3rem\s+0;/g, 'margin: 1.5rem 0;');

// Append extracted CSS to global.css
fs.appendFileSync(cssFilePath, cssToAppend);

// Remove all <style> blocks from markdown
mdContent = mdContent.replace(/<style>[\s\S]*?<\/style>\n?/g, '');

// Clean up extra newlines left behind by removal
mdContent = mdContent.replace(/\n{3,}/g, '\n\n');

fs.writeFileSync(mdFilePath, mdContent);

console.log('Successfully extracted styles and cleaned up the markdown file.');
