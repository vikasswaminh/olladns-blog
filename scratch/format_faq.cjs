const fs = require('fs');

let path = 'src/content/blog/what-is-protective-dns.md';
let content = fs.readFileSync(path, 'utf8');

let mythsSectionStart = 'A handful of misconceptions come up often enough that they\'re worth addressing directly.';
let nextSectionStart = '05\n\n#### A Practical Checklist for Evaluating Protective DNS Providers';
// Wait, the next section is "A Practical Checklist". The regex or split might be easier.

let mythsBlock = `A handful of misconceptions come up often enough that they're worth addressing directly.
"We already have a firewall, so we're covered." Firewalls and protective DNS work on different signals, IP address and port versus domain name, and attackers specifically exploit that gap by rotating infrastructure faster than IP based rules can keep pace with. They're complementary, not redundant.
"Protective DNS will slow down our network." This was a fair concern with some early, clunky implementations, but modern protective DNS resolvers typically respond in single digit milliseconds, often faster than the default resolver an ISP hands out, because dedicated security resolvers tend to be better engineered and better peered than whatever came bundled with a home internet plan.
"We're too small to be a target." Attackers running phishing as service kits and automated malware campaigns aren't hand picking victims by company size. They're casting wide, automated nets. A small clinic or a nine-person office is exactly as reachable by a mass phishing campaign as a large enterprise. The difference is usually just which one has any defense at that layer at all.
"Encrypted DNS makes filtering impossible." This one trips up a lot of people. Encryption via DoH, DoT, or DoQ protects a query from being read or tampered with by a third party sitting somewhere on the network path. It doesn't prevent the resolver a device is configured to use from applying policy to that query. A well-built protective DNS provider supports encrypted transport and still applies full filtering, because the encryption and the policy decision happen at the same trusted endpoint rather than working against each other.
"Blocking a domain is the same as fixing the problem." Blocking the lookup stops that specific attempt, but a mature program treats each block as a signal worth investigating which device tried to reach it, why, and whether that points to a broader compromise worth chasing down. The block is the start of an investigation, not the end of one.`;

let faqHTML = `</div>

<div class="content-card">
  <h2>Frequently Asked Questions & Myths</h2>
  <p>A handful of misconceptions come up often enough that they're worth addressing directly.</p>

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

  <details class="faq-details">
    <summary class="faq-summary">We already have a firewall, so we're covered. <span class="faq-plus">+</span></summary>
    <div class="faq-answer">Firewalls and protective DNS work on different signals, IP address and port versus domain name, and attackers specifically exploit that gap by rotating infrastructure faster than IP based rules can keep pace with. They're complementary, not redundant.</div>
  </details>

  <details class="faq-details">
    <summary class="faq-summary">Protective DNS will slow down our network. <span class="faq-plus">+</span></summary>
    <div class="faq-answer">This was a fair concern with some early, clunky implementations, but modern protective DNS resolvers typically respond in single digit milliseconds, often faster than the default resolver an ISP hands out, because dedicated security resolvers tend to be better engineered and better peered than whatever came bundled with a home internet plan.</div>
  </details>

  <details class="faq-details">
    <summary class="faq-summary">We're too small to be a target. <span class="faq-plus">+</span></summary>
    <div class="faq-answer">Attackers running phishing as service kits and automated malware campaigns aren't hand picking victims by company size. They're casting wide, automated nets. A small clinic or a nine-person office is exactly as reachable by a mass phishing campaign as a large enterprise. The difference is usually just which one has any defense at that layer at all.</div>
  </details>

  <details class="faq-details">
    <summary class="faq-summary">Encrypted DNS makes filtering impossible. <span class="faq-plus">+</span></summary>
    <div class="faq-answer">This one trips up a lot of people. Encryption via DoH, DoT, or DoQ protects a query from being read or tampered with by a third party sitting somewhere on the network path. It doesn't prevent the resolver a device is configured to use from applying policy to that query. A well-built protective DNS provider supports encrypted transport and still applies full filtering, because the encryption and the policy decision happen at the same trusted endpoint rather than working against each other.</div>
  </details>

  <details class="faq-details" style="border-bottom: none;">
    <summary class="faq-summary">Blocking a domain is the same as fixing the problem. <span class="faq-plus">+</span></summary>
    <div class="faq-answer">Blocking the lookup stops that specific attempt, but a mature program treats each block as a signal worth investigating which device tried to reach it, why, and whether that points to a broader compromise worth chasing down. The block is the start of an investigation, not the end of one.</div>
  </details>
</div>

<div class="content-card" style="border-top: 1px solid transparent; box-shadow: none;">
`; // Re-opening a pseudo content-card if it continues, or we can just leave it since the user wanted "no box for every section". 
// Oh wait! The user wanted "section 1 dont put box for every section". But for FAQ they explicitly said "need box for faq".
// So the FAQ SHOULD be in its own box!
// That means I will break out of the single box, do the FAQ box, and then start a new box for the rest of the content.

content = content.replace(mythsBlock, faqHTML);

// Let's also remove the previous "## Common Myths, Cleared Up" heading since we put "<h2>Frequently Asked Questions & Myths</h2>" inside the box.
content = content.replace(/04\s*\n\s*#### Common Myths, Cleared Up/g, ''); // Wait, what was the heading? 
// Let's just do a regex replace to catch any variation.

fs.writeFileSync(path, content);
console.log('FAQ section formatted with accordion boxes.');
