const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '../src/content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

const oldSnippet = `<div class="post-footer" style="margin-top: 3rem; margin-bottom: 1rem; border-top: none; padding-top: 0; text-align: center;">
  <a href="https://olladns.com" style="font-size: 0.95rem; font-weight: 500; text-decoration: underline; color: var(--accent);">Learn more about OllaDNS →</a>
</div>`;

const newSnippet = `<a href="https://olladns.com" class="content-card" style="display: block; text-align: center; text-decoration: none; margin-top: 2rem; border: 2px solid var(--accent); transition: transform 0.2s ease;">
  <h3 style="margin: 0; color: var(--accent);">Return to the OllaDNS Homepage →</h3>
  <p style="margin: 0.5rem 0 0; color: var(--muted); font-size: 0.9rem;">Explore our Protective DNS platform and enterprise solutions.</p>
</a>`;

let updatedCount = 0;

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace exact snippet or similar variations
  if (content.includes(oldSnippet)) {
    content = content.replace(oldSnippet, newSnippet);
    fs.writeFileSync(filePath, content);
    updatedCount++;
    console.log(`Updated ${file} with the new link box.`);
  } else {
    // Try regex if exact match fails due to spaces
    const regex = /<div class="post-footer"[\s\S]*?Learn more about OllaDNS.*<\/div>/g;
    if (regex.test(content)) {
      content = content.replace(regex, newSnippet);
      fs.writeFileSync(filePath, content);
      updatedCount++;
      console.log(`Updated ${file} with the new link box (regex match).`);
    }
  }
}

console.log(`Successfully updated ${updatedCount} files.`);
