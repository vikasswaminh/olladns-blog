const fs = require('fs');

const path = 'src/content/blog/dnssec-explained-what-it-is-how-it-works-and-why-it-matters.md';
let content = fs.readFileSync(path, 'utf-8');

const footerHtml = `
<div class="post-footer" style="margin-top: 3rem; margin-bottom: 1rem; border-top: none; padding-top: 0; text-align: center;">
  <a class="btn" href="https://olladns.com">Learn more about OllaDNS →</a>
</div>
`;

// Find the very last </div> and replace it with footerHtml + </div>
const lastDivIndex = content.lastIndexOf('</div>');
if (lastDivIndex !== -1) {
    content = content.substring(0, lastDivIndex) + footerHtml + content.substring(lastDivIndex);
    fs.writeFileSync(path, content);
    console.log('Footer injected successfully.');
} else {
    console.log('Error: Could not find the closing </div>.');
}
