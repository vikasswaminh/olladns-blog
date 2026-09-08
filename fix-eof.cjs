const fs = require('fs');
const file = 'src/content/blog/dns-security-automation-how-to-manage-dns-policies-as-code.md';
let content = fs.readFileSync(file);
// Remove any null bytes or UTF-16 artifacts if present
if (content.indexOf(0) !== -1) {
    content = content.filter(byte => byte !== 0);
}
let text = content.toString('utf8');
// Clean up any accidentally appended </div> from echo
text = text.replace(/<\/div>\s*<\/div>\s*$/g, '</div>\n'); // we might have appended one too many or with bad encoding

// Make sure the file ends with exactly one `</div>`
if (!text.trim().endsWith('</div>')) {
    text = text.trim() + '\n\n</div>\n';
}

fs.writeFileSync(file, text);
console.log('Fixed end of file.');
