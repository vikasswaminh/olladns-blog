const fs = require('fs');
const file = 'src/content/blog/dns-security-automation-how-to-manage-dns-policies-as-code.md';
let content = fs.readFileSync(file, 'utf8');

// 1. Restore Comparison Grid
const oldDeclarative = `An imperative approach is a list of steps. Click here, then here, add this domain, then that one, toggle this setting. It describes a process. A declarative approach instead describes an end state. It says, in effect, "this policy should have exactly these blocklist entries, this category configuration, and these site assignments," without specifying the individual steps needed to get there. The automation tool figures out what needs to change to make reality match that description, and only changes what's necessary.`;

const newDeclarative = `<style>
.comparison-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 1.5rem 0;
}
.comparison-card {
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid #eaeaea;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}
.comparison-card h4 {
    margin-top: 0;
    color: var(--text-main);
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
.comparison-card.imperative { border-top: 3px solid #757575; }
.comparison-card.declarative { border-top: 3px solid var(--accent, #d32f2f); }
@media (max-width: 600px) {
    .comparison-grid { grid-template-columns: 1fr; }
}
</style>

<div class="comparison-grid">
  <div class="comparison-card imperative">
    <h4>⚙️ Imperative Approach</h4>
    <p>A list of steps. Click here, then here, add this domain, then that one, toggle this setting. It describes a <strong>process</strong>.</p>
  </div>
  <div class="comparison-card declarative">
    <h4>🎯 Declarative Approach</h4>
    <p>Describes an end state. It says, "this policy should have exactly these blocklist entries and settings," without specifying steps. The tool figures out how to make reality match.</p>
  </div>
</div>`;

content = content.replace(oldDeclarative, newDeclarative);

// 2. Restore FAQ Styles
const faqStyle = `<style>
.faq-details {
    background: #fff;
    border: 1px solid #eaeaea;
    border-radius: 8px;
    margin-bottom: 1rem;
    overflow: hidden;
}
.faq-summary {
    padding: 1.25rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--text-main);
    list-style: none;
}
.faq-summary::-webkit-details-marker { display: none; }
.faq-plus {
    color: var(--accent, #d32f2f);
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 1;
}
.faq-answer {
    padding: 0 1.25rem 1.25rem;
    color: var(--text-muted);
    font-size: 0.95rem;
    line-height: 1.6;
}
details[open] .faq-plus { transform: rotate(45deg); }
</style>

## Frequently Asked Questions`;

content = content.replace('## Frequently Asked Questions', faqStyle);

fs.writeFileSync(file, content);
console.log('Restored comparison grid and FAQ styles');
