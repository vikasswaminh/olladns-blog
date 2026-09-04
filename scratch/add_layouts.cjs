const fs = require('fs');

let path = 'src/content/blog/what-is-protective-dns.md';
let content = fs.readFileSync(path, 'utf8');

// Replace "What a Real Protective DNS Deployment Looks Like" section text with structured lists
let deploymentReplaces = [
    {
        from: 'Start in monitoring mode, not enforcement mode. The instinct with any new security control is to flip on blocking immediately.',
        to: '*   01\n    \n    #### Start in Monitoring Mode\n    \n    The instinct with any new security control is to flip on blocking immediately.'
    },
    {
        from: 'Cover both the network and the roaming device. Protection tied only to the office network offers limited value once a laptop leaves the building',
        to: '*   02\n    \n    #### Cover the Network and Roaming Devices\n    \n    Protection tied only to the office network offers limited value once a laptop leaves the building'
    },
    {
        from: 'Tier your policy instead of applying one blanket rule. A finance team handling wire transfers reasonably warrants stricter policy',
        to: '*   03\n    \n    #### Tier Your Policy\n    \n    A finance team handling wire transfers reasonably warrants stricter policy'
    },
    {
        from: 'Feed the logs into your existing SIEM. DNS query logs are a genuinely underrated data source',
        to: '*   04\n    \n    #### Integrate with SIEM\n    \n    DNS query logs are a genuinely underrated data source'
    },
    {
        from: 'Have a rollback plan before you need one. Any change to core network infrastructure deserves a tested fallback.',
        to: '*   05\n    \n    #### Have a Rollback Plan\n    \n    Any change to core network infrastructure deserves a tested fallback.'
    },
    {
        from: 'Review exceptions on a regular cadence. Every deployment accumulates allowlist exceptions over time',
        to: '*   06\n    \n    #### Review Exceptions Regularly\n    \n    Every deployment accumulates allowlist exceptions over time'
    }
];

// Replace "A Practical Checklist for Evaluating Protective DNS Providers" section text
let checklistReplaces = [
    {
        from: 'Ask how fast the detection engine identifies newly registered malicious infrastructure. Hours matter enormously here',
        to: '*   01\n    \n    #### Detection Speed\n    \n    Ask how fast the detection engine identifies newly registered malicious infrastructure. Hours matter enormously here'
    },
    {
        from: 'Ask specifically about false positive rates, and how they\'re measured. A system that blocks aggressively but constantly flags legitimate traffic gets disabled',
        to: '*   02\n    \n    #### False Positive Rates\n    \n    Ask specifically about false positive rates, and how they\'re measured. A system that blocks aggressively but constantly flags legitimate traffic gets disabled'
    },
    {
        from: 'Check whether protection extends to roaming devices, not just on network traffic. If protection evaporates the moment someone leaves the office',
        to: '*   03\n    \n    #### Roaming Device Coverage\n    \n    Check whether protection extends to roaming devices, not just on network traffic. If protection evaporates the moment someone leaves the office'
    },
    {
        from: 'Look at deployment friction for MDM integration, whatever platform an organization already runs. A rollout that requires manually touching every device',
        to: '*   04\n    \n    #### MDM Integration\n    \n    Look at deployment friction for MDM integration, whatever platform an organization already runs. A rollout that requires manually touching every device'
    },
    {
        from: 'Check for SIEM and identity integration. Does the provider stream log into the tools a security team already uses, in a usable format?',
        to: '*   05\n    \n    #### SIEM and Identity Integration\n    \n    Check for SIEM and identity integration. Does the provider stream log into the tools a security team already uses, in a usable format?'
    },
    {
        from: 'Ask specifically about behavioral and DGA detection, not just blocklist matching. This is the clearest differentiator between protective DNS that catches modern',
        to: '*   06\n    \n    #### Behavioral & DGA Detection\n    \n    Ask specifically about behavioral and DGA detection, not just blocklist matching. This is the clearest differentiator between protective DNS that catches modern'
    },
    {
        from: 'And finally, read the provider\'s actual trust and security posture rather than just the marketing page. What\'s their certification status, and is it in progress or complete?',
        to: '*   07\n    \n    #### Security Posture\n    \n    Read the provider\'s actual trust and security posture rather than just the marketing page. What\'s their certification status, and is it in progress or complete?'
    }
];

let allReplaces = [...deploymentReplaces, ...checklistReplaces];

for (let r of allReplaces) {
    content = content.replace(r.from, r.to);
}

fs.writeFileSync(path, content);
console.log('Added nested list layouts for premium formatting.');
