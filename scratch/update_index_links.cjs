const fs = require('fs');
let path = 'src/pages/index.astro';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  '<a href="#">Return to the main OllaDNS homepage to see everything.</a>',
  '<a href="https://olladns.com">Return to the main OllaDNS homepage to see everything.</a>'
);
content = content.replace(
  '<a href="#">Explore the autonomous platform that powers AI work.</a>',
  '<a href="https://olladns.com/products">Explore the protective DNS platform that secures networks.</a>'
);
content = content.replace(
  '<a href="#">Discover industry-specific solutions tailored for your business.</a>',
  '<a href="https://olladns.com/solutions">Discover industry-specific solutions tailored for your business.</a>'
);

fs.writeFileSync(path, content);
console.log('Updated right sidebar links.');
