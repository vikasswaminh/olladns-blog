const fs = require('fs');

let path = 'src/content/blog/what-is-protective-dns.md';
let content = fs.readFileSync(path, 'utf8');

let originalEnding = `Protective DNS isn't a replacement for the rest of a security stack. It's the layer that catches what everything else is structurally unable to see, because it sits at the one checkpoint every device, every application, and every attacker's payload must pass through before anything else can happen: the domain looks up.
Done well, it's one of the highest leverage security investments an organization can make, precisely because of where it sits: early in the attack chain, covering every device on the network uniformly, watching a protocol that virtually nothing can avoid using. Done poorly, or more commonly, not done at all, it leaves one of the most consistently abused corners of the internet completely unmonitored, in a landscape where attackers know exactly how little scrutiny DNS traffic typically gets.
> The internet asks the same question billions of times a second: where is this domain? For most organizations, that question goes unwatched. **Protective DNS is simply the decision to start paying attention to the answer, before it's too late to matter.**`;

let shortEnding = `Protective DNS isn't a replacement for your firewall or antivirus—it's the critical first line of defense that catches what they miss. By analyzing every domain lookup, it stops threats at the earliest possible stage, before any connection is even established.

> The internet asks the same question billions of times a second: "Where is this domain?" **Protective DNS is simply the decision to start paying attention to the answer, before it's too late.**`;

content = content.replace(originalEnding, shortEnding);

fs.writeFileSync(path, content);
console.log('Shortened the conclusion.');
