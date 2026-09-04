const fs = require('fs');

let path = 'src/content/blog/what-is-protective-dns.md';
let content = fs.readFileSync(path, 'utf8');

// The script to update the grid texts

let oldTexts = [
    { num: '01', title: 'Phishing Infrastructure', body: "Phishing remains one of the most common ways attackers get an initial foothold, and modern phishing operations move fast. Phishing as a service kit lets criminals spin up a convincing fake login page, register a domain, blast out emails, and abandon the whole thing within hours, often before traditional reputation based blocklists have even indexed the domain. Protective DNS, especially systems using behavioral and structural detection rather than waiting for a domain to be manually reported, can flag a phishing domain within minutes of registration by recognizing patterns: how closely the domain name mimics a known brand, unusual registration characteristics, and hosting behavior that doesn't match a legitimate business. When a user clicks the link in that phishing email, the domain simply doesn't resolve. The convincing fake login page never loads, no matter how well it was designed." },
    { num: '02', title: 'Malware Command and Control', body: "Once malware lands on a device, through a malicious attachment, a drive by download, or an infected USB drive, it typically needs to phone home. It needs to reach a command-and-control server to receive instructions, download additional payloads, or exfiltrate stolen data. That phone home almost always starts with a DNS lookup for the C2 domain. Block that lookup, and the malware is effectively isolated on the device. It can't receive further instructions, it can't escalate, and in many cases, it can't complete its objective at all, even though it's technically already executing." },
    { num: '03', title: 'Domain Generation Algorithms (DGA)', body: "This one deserves special attention because it's specifically designed to defeat simple blocklists. Sophisticated malware families generate huge numbers of pseudo random domain names on a schedule. The malware and the attacker's infrastructure both run the same algorithm, so they land on the same domains independently, without the malware needing a hardcoded address that defenders could just block once and be done with it. A static blocklist is nearly useless here, because the list of bad domains changes constantly and unpredictably. Protective DNS systems built with behavioral detection catch this differently, by recognizing the statistical fingerprint of algorithmically generated names such as unusual character entropy, characteristic length patterns, and a suspicious volume of failed lookups as malware cycles through candidate domains, rather than trying to memorize an ever-shifting list of specific names." },
    { num: '04', title: 'DNS Tunneling and Data Exfiltration', body: "Because DNS is almost never blocked by firewalls, attackers sometimes abuse the protocol itself to move data. They encode stolen data or command instructions into the actual DNS queries and responses, using a domain they control. It's slow, but it's extremely stealthy. A strong protective DNS deployment detects tunneling by analyzing query volume, payload size, and the frequency of requests to specific domains, shutting down the covert channel." },
    { num: '05', title: 'Lookalike and Typosquat Domains', body: "Attackers register domains that look nearly identical to trusted brands, swapping an 'l' for a '1', using different top level domains, or employing international characters that look like English letters. Protective DNS blocks these proactively based on visual similarity and registration timing, preventing users from landing on credential harvesting pages." },
    { num: '06', title: 'Newly Registered and Parked Domains', body: "A huge percentage of malicious infrastructure is spun up and burned down in less than 48 hours. Many organizations choose to simply block any domain registered within the last 30 days. It's a blunt instrument, but a highly effective one, as there are very few legitimate business reasons for an employee to access a website that was registered yesterday." }
];

let newTexts = [
    { num: '01', title: 'Phishing Infrastructure', body: "Modern phishing campaigns move fast, often spinning up fake login pages and abandoning them within hours. Protective DNS uses structural detection to flag these domains instantly, preventing the fake login page from ever loading." },
    { num: '02', title: 'Malware Command and Control', body: "Once malware lands on a device, it needs to phone home to a C2 server to receive instructions or exfiltrate data. Blocking that initial DNS lookup effectively isolates the malware and stops the attack in its tracks." },
    { num: '03', title: 'Domain Generation Algorithms (DGA)', body: "Sophisticated malware generates thousands of random domain names to evade static blocklists. Protective DNS catches these by recognizing the statistical fingerprints and entropy of algorithmically generated names." },
    { num: '04', title: 'DNS Tunneling and Data Exfiltration', body: "Attackers sometimes bypass firewalls by encoding stolen data directly into DNS queries. A strong deployment detects this covert tunneling by analyzing query volume, payload size, and request frequency." },
    { num: '05', title: 'Lookalike and Typosquat Domains', body: "Attackers frequently register domains that mimic trusted brands by swapping letters (like an 'l' for a '1'). Protective DNS blocks these lookalikes proactively based on visual similarity." },
    { num: '06', title: 'Newly Registered and Parked Domains', body: "A massive percentage of malicious infrastructure is burned down in under 48 hours. Blocking domains registered within the last 30 days is a blunt but highly effective way to eliminate fresh threats." }
];

for (let i = 0; i < oldTexts.length; i++) {
    let oldHTML = `<div class="grid-feature-card">
    <span class="feature-num">${oldTexts[i].num}</span>
    <h4>${oldTexts[i].title}</h4>
    <p>${oldTexts[i].body}</p>
  </div>`;
  
    let newHTML = `<div class="grid-feature-card">
    <span class="feature-num">${newTexts[i].num}</span>
    <h4>${newTexts[i].title}</h4>
    <p>${newTexts[i].body}</p>
  </div>`;
  
    content = content.replace(oldHTML, newHTML);
}

fs.writeFileSync(path, content);
console.log('Shortened grid texts.');
