const fs = require('fs');

let path = 'src/content/blog/what-is-protective-dns.md';
let content = fs.readFileSync(path, 'utf8');

// The FAQ starts with:
// <div class="content-card" id="frequently-asked-questions">
//
// ## Frequently Asked Questions

// And ends with `</details>\n</div>\n\n<div class="content-card">\n\n## Bringing It All Together` (with some extra spaces maybe).

// 1. Remove the opening `<div class="content-card" id="frequently-asked-questions">`
content = content.replace(
  '<div class="content-card" id="frequently-asked-questions">\n\n## Frequently Asked Questions',
  '## Frequently Asked Questions'
);

// 2. We need to find every `<details class="faq-details">` and wrap it in a `content-card`.
// Since they are all identical tags, we can just replace them.
content = content.replace(/<details class="faq-details">/g, '<div class="content-card" style="margin-bottom: 1rem; padding: 1rem 2rem;">\n  <details class="faq-details">');
content = content.replace(/<\/details>/g, '</details>\n</div>');

// 3. Remove the single closing `</div>` that was at the end of the original FAQ box.
// It is located right before `<div class="content-card">\n\n## Bringing It All Together`
// Wait, since we added `</div>` to EVERY `</details>`, we will now have one extra `</div>` at the end of the FAQ section!
// The original end was: `</details>\n</div>\n\n<div class="content-card">\n\n## Bringing It All Together`
// Now it will be: `</details>\n</div>\n</div>\n\n<div class="content-card">\n\n## Bringing It All Together`
// We need to remove the extra one.
content = content.replace('</details>\n</div>\n</div>\n\n<div class="content-card">\n\n## Bringing It All Together', '</details>\n</div>\n\n<div class="content-card">\n\n## Bringing It All Together');
// In case of whitespace differences:
content = content.replace('</details>\n</div>\n  </details>\n</div>', '</details>\n</div>'); // not this
content = content.replace(/<\/div>\s*<div class="content-card">\s*## Bringing It All Together/, '<div class="content-card">\n\n## Bringing It All Together');

fs.writeFileSync(path, content);
console.log('Restructured FAQ into separate boxes.');
