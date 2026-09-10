const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/content/blog/response-policy-zones-rpz-how-real-time-dns-blocking-actually-works.md');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');

const restoredBlock = `
<div class="content-card">
  <div class="premium-card-header">
    <span class="card-badge">TL;DR</span>
  </div>

  <p class="tldr-paragraph">Response Policy Zones, almost always shortened to RPZ, are the actual technical mechanism that lets a DNS resolver override a malicious answer before it ever reaches a device. It works by treating security policy the same way DNS has always treated ordinary records: as a zone file a resolver can consult, update, and apply at internet scale, in milliseconds. This guide breaks down exactly how RPZ works under the hood, the different trigger types it supports beyond simple domain matching, the specific actions a policy can take when a query matches, how policy feeds keep an RPZ current in near real time, and why understanding this one mechanism explains most of what makes modern DNS firewalls and protective DNS actually work, rather than just what they claim to do in a sales deck.</p>
</div>

<div class="content-card">
  <div class="premium-card-header">
    <span class="card-badge">KEY TAKEAWAYS</span>
  </div>

<style>
.takeaway-cards {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
}
.takeaway-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: #fff;
  border: 1px solid #eaeaea;
  border-left: 4px solid var(--accent, #DA291C);
  border-radius: 8px;
  padding: 1rem 1.25rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.03);
}
.takeaway-num {
  font-size: 1.1rem;
  font-weight: 900;
  color: var(--accent, #DA291C);
  min-width: 1.5rem;
  line-height: 1.4;
}
.takeaway-text {
  font-size: 0.92rem;
  line-height: 1.5;
  color: #333;
}
</style>
<div class="takeaway-cards">
  <div class="takeaway-card">
    <span class="takeaway-num">01</span>
    <span class="takeaway-text">RPZ is the actual mechanism behind "real time DNS blocking." It's a specially formatted DNS zone a resolver consults to override a malicious answer, using the same proven zone transfer infrastructure DNS has relied on for decades rather than a separate, proprietary system.</span>
  </div>
  <div class="takeaway-card">
    <span class="takeaway-num">02</span>
    <span class="takeaway-text">RPZ can match far more than just a domain name. Trigger types include the response IP address, the authoritative nameserver's name or IP, and the querying client's IP, which is exactly what lets it catch threats like rotating phishing domains that all point to the same malicious hosting infrastructure.</span>
  </div>
  <div class="takeaway-card">
    <span class="takeaway-num">03</span>
    <span class="takeaway-text">The propagation mechanism is fast, but real-world protection speed depends on the detection feeding it. RPZ updates can reach subscribed resolvers in seconds; how quickly a new malicious domain gets identified and added in the first place is what separates strong providers from weak ones.</span>
  </div>
  <div class="takeaway-card">
    <span class="takeaway-num">04</span>
    <span class="takeaway-text">Multiple RPZ zones can be layered with defined precedence, letting an organization run its own custom policy zone alongside a broader, shared threat intelligence zone, with clean, auditable exception handling through the passthr action type.</span>
  </div>
  <div class="takeaway-card">
    <span class="takeaway-num">05</span>
    <span class="takeaway-text">Encrypted DNS doesn't break RPZ. A resolver applying RPZ policy still enforces it on DoH, DoT, and DoQ queries exactly as it does on plaintext ones, provided the device is sending its queries to a resolver that applies that policy in the first place.</span>
  </div>
</div>
</div>
`;

// Insert the restored block after line 7 (index 7).
lines.splice(8, 0, restoredBlock.trim());

fs.writeFileSync(filePath, lines.join('\n'));
console.log('Successfully restored the sections without the h3 headings.');
