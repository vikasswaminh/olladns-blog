const fs = require('fs');

let path = 'src/content/blog/what-is-protective-dns.md';
let content = fs.readFileSync(path, 'utf8');

// Insert opening div before TL;DR
content = content.replace('## TL;DR', '<div class="content-card">\n\n## TL;DR');

// Insert closing div before "The One Thing Every Attack Has in Common"
content = content.replace('## The One Thing Every Attack Has in Common', '</div>\n\n## The One Thing Every Attack Has in Common');

fs.writeFileSync(path, content);
console.log('Added box for TL;DR and Key Takeaways.');
