const fs = require('fs');
const filePath = 'c:\\Users\\Dell\\Downloads\\olladns-blog\\src\\content\\blog\\dns-spoofing-and-cache-poisoning-explained.md';
let content = fs.readFileSync(filePath, 'utf8');

// Section 07 Replacement
const s7_regex = /<div class="feature-grid">\s*<div class="grid-feature-card">\s*<span class="feature-num">01<\/span>\s*<h4>Website Redirection<\/h4>[\s\S]+?<\/div>\s*<\/div>/;
const s7_replacement = `<div class="action-card red">
  <div class="action-content">
    <h4>Website Redirection</h4>
    <p>Every device that queries the affected resolver for the poisoned domain receives the attacker's IP address instead of the real one. Users are silently routed to infrastructure the attacker controls, often a clone of the real login page engineered to harvest credentials.</p>
  </div>
</div>
<div class="action-card red">
  <div class="action-content">
    <h4>Email Interception</h4>
    <p>Email is arguably even more exposed. Incoming mail can be silently redirected to a server the attacker controls, intercepted, read, and in some cases forwarded on so the compromise stays invisible, opening the door for account takeovers via password resets.</p>
  </div>
</div>
<div class="action-card red">
  <div class="action-content">
    <h4>Authentication Undermined</h4>
    <p>An attacker who's compromised resolution for a domain can undermine mechanisms like SPF, DKIM, and DMARC that prove an email genuinely came from where it claims to have come from, since those mechanisms rely on DNS lookups.</p>
  </div>
</div>
<div class="action-card red">
  <div class="action-content">
    <h4>Network Denial of Service</h4>
    <p>A compromised resolver can function as a blanket denial of service tool. Simply pointing a widely used domain at a dead or unreachable address breaks access to that service for everyone relying on the poisoned resolver.</p>
  </div>
</div>`;
content = content.replace(s7_regex, s7_replacement);

// Section 09 Replacement
const s9_regex = /<div class="feature-grid">\s*<div class="grid-feature-card">\s*<span class="feature-num">01<\/span>\s*<h4>Source Port Randomization<\/h4>[\s\S]+?<\/div>\s*<\/div>/;
const s9_replacement = `<div class="card-grid">
  <div class="premium-card">
    <div class="card-icon">🎲</div>
    <h4>Source Port Randomization</h4>
    <p>The first major response to Kaminsky. Randomizing the source port adds ~16 bits of additional entropy, turning a feasible brute-force race into a dramatically harder one, multiplying the effective guessing space enormously.</p>
  </div>
  <div class="premium-card">
    <div class="card-icon">🔠</div>
    <h4>0x20 Encoding</h4>
    <p>A clever trick that mixes capitalization (e.g. ExAmPlE.cOm) in the outgoing query and expects the response to match it. It adds extra entropy by forcing the attacker to guess the correct case pattern without changing the protocol.</p>
  </div>
  <div class="premium-card">
    <div class="card-icon">🍪</div>
    <h4>DNS Cookies</h4>
    <p>A lightweight, semi-persistent token exchanged between a resolver and authoritative servers, giving both sides a way to recognize legitimate traffic and reject responses lacking the expected cookie value.</p>
  </div>
  <div class="premium-card">
    <div class="card-icon">🚦</div>
    <h4>Rate Limiting & Anomaly Detection</h4>
    <p>Catching the sheer volume signature of an attack in progress. Throttling or dropping suspiciously high volumes of responses claiming to answer the same outstanding query closes off a meaningful chunk of attack surface.</p>
  </div>
</div>`;
content = content.replace(s9_regex, s9_replacement);

fs.writeFileSync(filePath, content);
console.log('Applied diff layouts to sections 7 and 9');
