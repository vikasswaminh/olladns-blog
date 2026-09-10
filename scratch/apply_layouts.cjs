const fs = require('fs');
const filePath = 'c:\\Users\\Dell\\Downloads\\olladns-blog\\src\\content\\blog\\dns-spoofing-and-cache-poisoning-explained.md';
let content = fs.readFileSync(filePath, 'utf8');

// Section 04
const s4_regex = /65,536: possible transaction ID values in the original, unrandomized DNS design[\s\S]+?1 win: is all it takes; a single successful forged reply can hijack an entire domain's resolution/;
const s4_replacement = `<div class="feature-grid">
  <div class="grid-feature-card" style="text-align: center;">
    <div style="font-size: 2.5rem; font-weight: 800; color: var(--accent); margin-bottom: 0.5rem;">65,536</div>
    <p style="margin: 0; font-size: 0.95rem;">Possible transaction ID values in the original, unrandomized DNS design</p>
  </div>
  <div class="grid-feature-card" style="text-align: center;">
    <div style="font-size: 2.5rem; font-weight: 800; color: var(--accent); margin-bottom: 0.5rem;">2008</div>
    <p style="margin: 0; font-size: 0.95rem;">The year Dan Kaminsky's technique made cache poisoning dramatically faster</p>
  </div>
  <div class="grid-feature-card" style="text-align: center;">
    <div style="font-size: 2.5rem; font-weight: 800; color: var(--accent); margin-bottom: 0.5rem;">1 Win</div>
    <p style="margin: 0; font-size: 0.95rem;">Is all it takes; a single successful forged reply can hijack an entire domain's resolution</p>
  </div>
</div>`;
content = content.replace(s4_regex, s4_replacement);

// Section 07
const s7_regex = /Every device that queries the affected resolver[\s\S]+?no redirection or credential theft required at all\./;
const s7_replacement = `<div class="feature-grid">
  <div class="grid-feature-card">
    <span class="feature-num">01</span>
    <h4>Website Redirection</h4>
    <p>Every device that queries the affected resolver for the poisoned domain receives the attacker's IP address instead of the real one. Users are silently routed to infrastructure the attacker controls, often a clone of the real login page engineered to harvest credentials.</p>
  </div>
  <div class="grid-feature-card">
    <span class="feature-num">02</span>
    <h4>Email Interception</h4>
    <p>Email is arguably even more exposed. Incoming mail can be silently redirected to a server the attacker controls, intercepted, read, and in some cases forwarded on so the compromise stays invisible, opening the door for account takeovers via password resets.</p>
  </div>
  <div class="grid-feature-card">
    <span class="feature-num">03</span>
    <h4>Authentication Undermined</h4>
    <p>An attacker who's compromised resolution for a domain can undermine mechanisms like SPF, DKIM, and DMARC that prove an email genuinely came from where it claims to have come from, since those mechanisms rely on DNS lookups.</p>
  </div>
  <div class="grid-feature-card">
    <span class="feature-num">04</span>
    <h4>Network Denial of Service</h4>
    <p>A compromised resolver can function as a blanket denial of service tool. Simply pointing a widely used domain at a dead or unreachable address breaks access to that service for everyone relying on the poisoned resolver.</p>
  </div>
</div>`;
content = content.replace(s7_regex, s7_replacement);

// Section 09
const s9_regex = /  •Source port randomization was the first major[\s\S]+?change to the DNS protocol at all\./;
const s9_replacement = `<div class="feature-grid">
  <div class="grid-feature-card">
    <span class="feature-num">01</span>
    <h4>Source Port Randomization</h4>
    <p>The first major response to Kaminsky. Randomizing the source port adds ~16 bits of additional entropy, turning a feasible brute-force race into a dramatically harder one, multiplying the effective guessing space enormously.</p>
  </div>
  <div class="grid-feature-card">
    <span class="feature-num">02</span>
    <h4>0x20 Encoding</h4>
    <p>A clever trick that mixes capitalization (e.g. ExAmPlE.cOm) in the outgoing query and expects the response to match it. It adds extra entropy by forcing the attacker to guess the correct case pattern without changing the protocol.</p>
  </div>
  <div class="grid-feature-card">
    <span class="feature-num">03</span>
    <h4>DNS Cookies</h4>
    <p>A lightweight, semi-persistent token exchanged between a resolver and authoritative servers, giving both sides a way to recognize legitimate traffic and reject responses lacking the expected cookie value.</p>
  </div>
  <div class="grid-feature-card">
    <span class="feature-num">04</span>
    <h4>Rate Limiting & Anomaly Detection</h4>
    <p>Catching the sheer volume signature of an attack in progress. Throttling or dropping suspiciously high volumes of responses claiming to answer the same outstanding query closes off a meaningful chunk of attack surface.</p>
  </div>
</div>`;
content = content.replace(s9_regex, s9_replacement);

// Section 11
const s11_regex = /A resolver worth trusting randomizes source ports[\s\S]+?before real damage accumulates\./;
const s11_replacement = `<div class="feature-grid">
  <div class="grid-feature-card">
    <h4 style="color: var(--text-main); margin-top: 0;">Robust Entropy and Validation</h4>
    <p>A resolver worth trusting randomizes source ports thoroughly and unpredictably. It implements 0x20 encoding and DNS cookies as a matter of course, not as an optional feature buried behind a configuration flag nobody enables.</p>
  </div>
  <div class="grid-feature-card">
    <h4 style="color: var(--text-main); margin-top: 0;">Active Anomaly Detection</h4>
    <p>It watches its own traffic for the volume signature of an active poisoning attempt—a sudden burst of responses to the same query—and treats that pattern as the active attack indicator it is, rather than accepting whichever response happens to match first.</p>
  </div>
  <div class="grid-feature-card">
    <h4 style="color: var(--text-main); margin-top: 0;">DNSSEC Prioritization</h4>
    <p>Critically, a properly built resolver validates DNSSEC signatures wherever they're available. It gives you meaningfully more protection than one that leans on any single mechanism alone, while still applying layered defenses for unsigned domains.</p>
  </div>
  <div class="grid-feature-card">
    <h4 style="color: var(--text-main); margin-top: 0;">Logging and Visibility</h4>
    <p>A poisoning attempt leaves a detectable trace: unusual response volumes, mismatched patterns, sudden changes to cached records. A resolver that surfaces these anomalies turns an invisible attack into something a team can investigate before damage occurs.</p>
  </div>
</div>`;
content = content.replace(s11_regex, s11_replacement);

// Section 12
const s12_regex = /Keep DNS software and firmware current[\s\S]+?email has already been quietly redirected\./;
const s12_replacement = `<div class="feature-grid">
  <div class="grid-feature-card">
    <h4 style="color: var(--text-main); margin-top: 0;">Update Software Everywhere</h4>
    <p>Keep DNS software and firmware current on every device that resolves DNS locally. Home routers are a chronically under-patched piece of equipment sitting directly in the path of every device, making them a common vector for attack.</p>
  </div>
  <div class="grid-feature-card">
    <h4 style="color: var(--text-main); margin-top: 0;">Publish DNSSEC Records</h4>
    <p>Watch for domains you control publishing DNSSEC-signed records. Signing your own domain protects the people looking you up; if your domain isn't signed, resolvers validating DNSSEC can't protect anyone trying to reach you.</p>
  </div>
  <div class="grid-feature-card">
    <h4 style="color: var(--text-main); margin-top: 0;">Restrict Allowed Resolvers</h4>
    <p>Restrict which resolvers devices on your network are permitted to use. Network-level rules that lock outbound DNS traffic to a sanctioned, trusted resolver close off redirection avenues from rogue DHCP servers or malware.</p>
  </div>
  <div class="grid-feature-card">
    <h4 style="color: var(--text-main); margin-top: 0;">Monitor Query Logs</h4>
    <p>Treat DNS query logs as a genuine security signal. Sudden changes to a domain's resolution, or a spike in random subdomain queries (a Kaminsky-style probe), are early warnings that let a team catch an attack in progress.</p>
  </div>
</div>`;
content = content.replace(s12_regex, s12_replacement);

fs.writeFileSync(filePath, content);
console.log('Applied grid layouts to all sections');
