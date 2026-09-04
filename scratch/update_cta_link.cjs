const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '../src/content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

let updatedCount = 0;

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('<a class="btn" href="https://olladns.com">Learn more about OllaDNS →</a>')) {
    content = content.replace(
      '<a class="btn" href="https://olladns.com">Learn more about OllaDNS →</a>',
      '<a href="https://olladns.com" style="font-size: 0.95rem; font-weight: 500; text-decoration: underline; color: var(--accent);">Learn more about OllaDNS →</a>'
    );
    fs.writeFileSync(filePath, content);
    updatedCount++;
    console.log(`Updated ${file}`);
  }
}

console.log(`Successfully updated ${updatedCount} files.`);
