const fs = require('fs');

let path = 'src/content/blog/what-is-protective-dns.md';
let content = fs.readFileSync(path, 'utf8');

// I will find the real "## Frequently Asked Questions" section.
let faqStart = content.indexOf('## Frequently Asked Questions');
if (faqStart === -1) {
  console.log("Could not find ## Frequently Asked Questions");
  process.exit(1);
}

// Find where "Bringing It All Together" starts
let nextSectionStart = content.indexOf('## Bringing It All Together');
if (nextSectionStart === -1) {
  nextSectionStart = content.length;
}

let faqContent = content.substring(faqStart, nextSectionStart);

// We need to parse all the `#### Question` and the following text, and replace them with `<details>`.
// First, let's just use a regex to replace each `#### [question]\n[answer]` block
// We can split by `#### `
let parts = faqContent.split('#### ');

let newFaqHTML = `</div>\n\n<div class="content-card" id="frequently-asked-questions">\n\n## Frequently Asked Questions\n\n`;
// We skip the first part which is just the heading and number.
for (let i = 1; i < parts.length; i++) {
    let lines = parts[i].split('\n');
    let question = lines[0].trim();
    // The rest is the answer until the next number (e.g. 09, 10).
    // Let's filter out the numbers like `\n09\n` from the end.
    let answerText = lines.slice(1).join('\n').trim();
    // Remove trailing numbers like "09" on a single line at the end
    answerText = answerText.replace(/\n\d+\s*$/, '').trim();
    
    newFaqHTML += `  <details class="faq-details">
    <summary class="faq-summary">${question} <span class="faq-plus">+</span></summary>
    <div class="faq-answer">${answerText}</div>
  </details>\n\n`;
}

newFaqHTML += `</div>\n\n<div class="content-card" style="border-top: 1px solid transparent; box-shadow: none;">\n\n`;

// Since I already added `<style>` in the myths section, I don't need to redefine `.faq-details` CSS unless I want to be safe. I will include it again but guarded, or just add it globally in the file.
let cssStyles = `
<style>
  .faq-details {
    margin-bottom: 1rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 1rem;
  }
  .faq-summary {
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    font-size: 1.1rem;
    color: var(--text-main, #333);
  }
  .faq-summary::-webkit-details-marker {
    display: none;
  }
  .faq-details[open] .faq-plus {
    transform: rotate(45deg);
    transition: transform 0.2s ease;
  }
  .faq-plus {
    font-size: 1.5rem;
    transition: transform 0.2s ease;
    color: var(--accent, #d32f2f);
  }
  .faq-answer {
    margin-top: 1rem;
    color: var(--text-muted, #555);
    line-height: 1.6;
  }
</style>
`;
if (!content.includes('.faq-details')) {
   newFaqHTML = cssStyles + newFaqHTML;
}

// Replace the old FAQ content with the new HTML
content = content.replace(faqContent, newFaqHTML);

// Let's remove the first FAQ/Myths block I made earlier, and restore the original Myths paragraph so we don't have two FAQs on the same page.
// The earlier one had "Frequently Asked Questions & Myths"
let mythsRegex = /<div class="content-card">\s*<h2>Frequently Asked Questions & Myths[\s\S]*?<\/div>/;
content = content.replace(mythsRegex, `## Common Myths, Cleared Up\n\nA handful of misconceptions come up often enough that they're worth addressing directly.\n"We already have a firewall, so we're covered." Firewalls and protective DNS work on different signals, IP address and port versus domain name, and attackers specifically exploit that gap by rotating infrastructure faster than IP based rules can keep pace with. They're complementary, not redundant.\n"Protective DNS will slow down our network." This was a fair concern with some early, clunky implementations, but modern protective DNS resolvers typically respond in single digit milliseconds, often faster than the default resolver an ISP hands out, because dedicated security resolvers tend to be better engineered and better peered than whatever came bundled with a home internet plan.\n"We're too small to be a target." Attackers running phishing as service kits and automated malware campaigns aren't hand picking victims by company size. They're casting wide, automated nets. A small clinic or a nine-person office is exactly as reachable by a mass phishing campaign as a large enterprise. The difference is usually just which one has any defense at that layer at all.\n"Encrypted DNS makes filtering impossible." This one trips up a lot of people. Encryption via DoH, DoT, or DoQ protects a query from being read or tampered with by a third party sitting somewhere on the network path. It doesn't prevent the resolver a device is configured to use from applying policy to that query. A well-built protective DNS provider supports encrypted transport and still applies full filtering, because the encryption and the policy decision happen at the same trusted endpoint rather than working against each other.\n"Blocking a domain is the same as fixing the problem." Blocking the lookup stops that specific attempt, but a mature program treats each block as a signal worth investigating which device tried to reach it, why, and whether that points to a broader compromise worth chasing down. The block is the start of an investigation, not the end of one.`);

// Also remove `</div>` and `style="border-top..."` from the previous script
content = content.replace(/<\/div>\s*<div class="content-card" style="border-top: 1px solid transparent; box-shadow: none;">/g, '');


fs.writeFileSync(path, content);
console.log('Real FAQ section formatted with accordion boxes.');
