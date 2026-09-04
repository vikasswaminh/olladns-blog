const fs = require('fs');

let path = 'src/content/blog/what-is-protective-dns.md';
let content = fs.readFileSync(path, 'utf8');

let startIndex = content.indexOf('## A Practical Checklist for Evaluating Protective DNS Providers');
let endIndex = content.indexOf('<span style="color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.95rem;">Section 11</span>');

if (startIndex !== -1 && endIndex !== -1) {
    let block = content.substring(startIndex, endIndex);

    let newBlock = `## A Practical Checklist for Evaluating Protective DNS Providers
If you're shopping for one of these, a few things separate the genuinely strong options from the merely adequate ones, and they're worth digging into directly rather than taking a sales deck's word for it.

<div class="feature-grid">

  <div class="grid-feature-card">
    <h4 style="color: var(--text-main); margin-top: 0;">Detection Speed</h4>
    <p>Ask how fast the detection engine identifies newly registered malicious infrastructure. Hours matter enormously here, given how quickly phishing kits rotate. A provider that can show median detection time in minutes, not hours, is operating in a fundamentally different tier than one leaning mainly on static reputation feeds.</p>
  </div>
  <div class="grid-feature-card">
    <h4 style="color: var(--text-main); margin-top: 0;">False Positive Rates</h4>
    <p>Ask specifically about false positive rates, and how they're measured. A system that blocks aggressively but constantly flags legitimate traffic gets disabled by frustrated users within weeks. The most thorough filter in the world is worthless the moment IT turns it off because the help desk can't keep up with complaints.</p>
  </div>
  <div class="grid-feature-card">
    <h4 style="color: var(--text-main); margin-top: 0;">Roaming Device Coverage</h4>
    <p>Check whether protection extends to roaming devices, not just on network traffic. If protection evaporates the moment someone leaves the office WiFi, it's only covering a fraction of the real attack surface in a world where laptops spend more time off network than on it.</p>
  </div>
  <div class="grid-feature-card">
    <h4 style="color: var(--text-main); margin-top: 0;">MDM Integration</h4>
    <p>Look at deployment friction for MDM integration, whatever platform an organization already runs. A rollout that requires manually touching every device is a project that dies halfway through. Silent, MDM pushed deployment is table stake for anything beyond a handful of machines.</p>
  </div>
  <div class="grid-feature-card">
    <h4 style="color: var(--text-main); margin-top: 0;">SIEM and Identity Integration</h4>
    <p>Check for SIEM and identity integration. Does the provider stream log into the tools a security team already uses, in a usable format? Does it sync with an identity provider so policy can be tied to actual users and groups rather than IP ranges that shift constantly as people move around?</p>
  </div>
  <div class="grid-feature-card">
    <h4 style="color: var(--text-main); margin-top: 0;">Behavioral & DGA Detection</h4>
    <p>Ask specifically about behavioral and DGA detection, not just blocklist matching. This is the clearest differentiator between protective DNS that catches modern, fast-moving threats and protective DNS that's essentially a blocklist a few days behind the threat landscape.</p>
  </div>
  <div class="grid-feature-card">
    <h4 style="color: var(--text-main); margin-top: 0;">Security Posture</h4>
    <p>Read the provider's actual trust and security posture rather than just the marketing page. What's their certification status, and is it in progress or complete? What data do they retain, for how long, and where does it live? Do they anonymize client IPs? A huge share of an organization's sensitive traffic metadata flows through this provider, so their own security posture matters just as much as the product's feature list.</p>
  </div>
</div>



`;

    content = content.replace(block, newBlock);
    fs.writeFileSync(path, content);
    console.log('Successfully fixed section 10 grid layout.');

} else {
    console.log('Could not find section 10 bounds.');
}
