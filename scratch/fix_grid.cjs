const fs = require('fs');

let path = 'src/content/blog/what-is-protective-dns.md';
let content = fs.readFileSync(path, 'utf8');

// First, revert the breaks I added.
let revertTargets = [
    '01\n\n#### Phishing Infrastructure',
    '02\n\n#### Malware Command and Control',
    '03\n\n#### Domain Generation Algorithms (DGA)',
    '04\n\n#### DNS Tunneling and Data Exfiltration',
    '05\n\n#### Lookalike and Typosquat Domains',
    '06\n\n#### Newly Registered and Parked Domains'
];

for (let r of revertTargets) {
    let badHTML = `\n</div>\n<div class="content-card">\n\n${r}`;
    content = content.replace(badHTML, `\n\n${r}`);
}

content = content.replace('\n</div>\n<div class="content-card" style="margin-top: 2rem;">\n\n04\n\n## The Mechanics Behind the Curtain', '\n\n04\n\n## The Mechanics Behind the Curtain');

let gridCSS = `
<style>
.feature-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
}
.grid-feature-card {
    border: 1px solid #eaeaea;
    border-radius: 8px;
    padding: 1.5rem;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}
.grid-feature-card h4 {
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
    font-size: 1.1rem;
    color: var(--text-main);
}
.grid-feature-card .feature-num {
    color: var(--accent, #d32f2f);
    font-size: 1.3rem;
    font-weight: 800;
    margin-bottom: 0.2rem;
    display: block;
}
.grid-feature-card p {
    font-size: 0.95rem;
    color: var(--text-muted);
    line-height: 1.6;
    margin-bottom: 0;
}
@media (max-width: 768px) {
    .feature-grid {
        grid-template-columns: 1fr;
    }
}
</style>
<div class="feature-grid">
`;

let texts = [
    { num: '01', title: 'Phishing Infrastructure', body: "Phishing remains one of the most common ways attackers get an initial foothold, and modern phishing operations move fast. Phishing as a service kit lets criminals spin up a convincing fake login page, register a domain, blast out emails, and abandon the whole thing within hours, often before traditional reputation based blocklists have even indexed the domain. Protective DNS, especially systems using behavioral and structural detection rather than waiting for a domain to be manually reported, can flag a phishing domain within minutes of registration by recognizing patterns: how closely the domain name mimics a known brand, unusual registration characteristics, and hosting behavior that doesn't match a legitimate business. When a user clicks the link in that phishing email, the domain simply doesn't resolve. The convincing fake login page never loads, no matter how well it was designed." },
    { num: '02', title: 'Malware Command and Control', body: "Once malware lands on a device, through a malicious attachment, a drive by download, or an infected USB drive, it typically needs to phone home. It needs to reach a command-and-control server to receive instructions, download additional payloads, or exfiltrate stolen data. That phone home almost always starts with a DNS lookup for the C2 domain. Block that lookup, and the malware is effectively isolated on the device. It can't receive further instructions, it can't escalate, and in many cases, it can't complete its objective at all, even though it's technically already executing." },
    { num: '03', title: 'Domain Generation Algorithms (DGA)', body: "This one deserves special attention because it's specifically designed to defeat simple blocklists. Sophisticated malware families generate huge numbers of pseudo random domain names on a schedule. The malware and the attacker's infrastructure both run the same algorithm, so they land on the same domains independently, without the malware needing a hardcoded address that defenders could just block once and be done with it. A static blocklist is nearly useless here, because the list of bad domains changes constantly and unpredictably. Protective DNS systems built with behavioral detection catch this differently, by recognizing the statistical fingerprint of algorithmically generated names such as unusual character entropy, characteristic length patterns, and a suspicious volume of failed lookups as malware cycles through candidate domains, rather than trying to memorize an ever-shifting list of specific names." },
    { num: '04', title: 'DNS Tunneling and Data Exfiltration', body: "Because DNS is almost never blocked by firewalls, attackers sometimes abuse the protocol itself to move data. They encode stolen data or command instructions into the actual DNS queries and responses, using a domain they control. It's slow, but it's extremely stealthy. A strong protective DNS deployment detects tunneling by analyzing query volume, payload size, and the frequency of requests to specific domains, shutting down the covert channel." },
    { num: '05', title: 'Lookalike and Typosquat Domains', body: "Attackers register domains that look nearly identical to trusted brands, swapping an 'l' for a '1', using different top level domains, or employing international characters that look like English letters. Protective DNS blocks these proactively based on visual similarity and registration timing, preventing users from landing on credential harvesting pages." },
    { num: '06', title: 'Newly Registered and Parked Domains', body: "A huge percentage of malicious infrastructure is spun up and burned down in less than 48 hours. Many organizations choose to simply block any domain registered within the last 30 days. It's a blunt instrument, but a highly effective one, as there are very few legitimate business reasons for an employee to access a website that was registered yesterday." }
];

let fullReplacement = gridCSS;
for (let t of texts) {
    fullReplacement += `
  <div class="grid-feature-card">
    <span class="feature-num">${t.num}</span>
    <h4>${t.title}</h4>
    <p>${t.body}</p>
  </div>`;
}
fullReplacement += `\n</div>\n`;

let startIndex = content.indexOf('\n01\n\n#### Phishing Infrastructure');
let endString = 'legitimate business reasons for an employee to access a website that was registered yesterday.';
let endIndex = content.indexOf(endString) + endString.length;

let oldBlock = content.substring(startIndex, endIndex);

content = content.replace(oldBlock, fullReplacement);

fs.writeFileSync(path, content);
console.log('Fixed grid layout with escaped quotes.');
