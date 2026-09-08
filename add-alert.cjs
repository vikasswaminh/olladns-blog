const fs = require('fs');
const file = 'src/content/blog/dns-security-automation-how-to-manage-dns-policies-as-code.md';
let content = fs.readFileSync(file, 'utf8');

// Replace the unspoken option paragraph with a warning alert
content = content.replace(
  'What you want to avoid is the third, unspoken option that quietly becomes the default in undisciplined environments: drift gets noticed, nobody does anything about it, and the configuration files slowly stop being an accurate description of reality at all. At that point you\'ve lost the entire benefit of managing policy as code in the first place, while still carrying the overhead of maintaining files that no longer mean anything.',
  `<style>
.alert-box {
    background: rgba(255, 152, 0, 0.1);
    border-left: 4px solid #FF9800;
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0 8px 8px 0;
}
.alert-box strong { color: #E65100; }
</style>
<div class="alert-box">
  <p style="margin:0;"><strong>⚠️ PITFALL TO AVOID:</strong> What you want to avoid is the third, unspoken option that quietly becomes the default in undisciplined environments: drift gets noticed, nobody does anything about it, and the configuration files slowly stop being an accurate description of reality at all. At that point you've lost the entire benefit of managing policy as code in the first place, while still carrying the overhead of maintaining files that no longer mean anything.</p>
</div>`
);

fs.writeFileSync(file, content);
console.log('Added alert styling');
