---
title: "DNS Security Best Practices: 15 Ways to Secure Enterprise DNS in 2026"
description: "DNS is the layer attackers count on you ignoring. Here are 15 practical, field tested DNS security best practices enterprise teams can deploy today, without breaking the network."
pubDate: 2026-09-07T00:00:00.000Z
author: "olladns Security Team"
tags: ["Guide"]
---

<div class="content-card">

## TL;DR
Enterprise DNS security is a stack, not a setting. DNS sits earlier in the attack chain than almost anything else in your environment, which makes it one of the highest leverage places to intervene and one of the most ignored. This guide walks through 15 best practices that, together, form a real DNS security program. It covers protective DNS filtering and DNSSEC, encrypted transport, resolver hardening, tunneling detection, identity integration, and the operational habits like logging, rollback plans, and exception reviews that keep a deployment from quietly decaying over time. None of these requires ripping out your existing stack. They simply require pointing to your resolvers somewhere that's watching.

</div>

<div class="content-card">

<style>
.feature-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-top: 1.5rem;
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
.callout-box {
    background: rgba(211, 47, 47, 0.05);
    border-left: 4px solid var(--accent, #d32f2f);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0 8px 8px 0;
}
.callout-box p {
    margin: 0;
    color: var(--text-main);
    font-weight: 500;
}
.stack-diagram {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 2rem 0;
    padding: 1.5rem;
    background: #fafafa;
    border: 1px solid #eaeaea;
    border-radius: 8px;
}
.stack-layer {
    background: #fff;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    text-align: center;
    font-weight: bold;
    color: var(--text-main);
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    position: relative;
}
.stack-layer::after {
    content: '↓';
    position: absolute;
    bottom: -18px;
    left: 50%;
    transform: translateX(-50%);
    color: #999;
    font-size: 1.2rem;
}
.stack-layer:last-child::after {
    display: none;
}
.stack-layer span {
    display: block;
    font-size: 0.85rem;
    font-weight: normal;
    color: var(--text-muted);
    margin-top: 0.2rem;
}
</style>

## Top 5 Key Takeaways

<div class="feature-grid">
  <div class="grid-feature-card">
    <span class="feature-num">01</span>
    <h4>High Leverage Control</h4>
    <p>Protective DNS filtering intercepts phishing, malware, and C2 traffic before a connection is ever made.</p>
  </div>
  <div class="grid-feature-card">
    <span class="feature-num">02</span>
    <h4>Beyond Blocklists</h4>
    <p>Static blocklists aren't enough. You need behavioral and DGA detection layered on top of reputation feeds.</p>
  </div>
  <div class="grid-feature-card">
    <span class="feature-num">03</span>
    <h4>Encryption & Filtering</h4>
    <p>Encryption and filtering are not in conflict. A well-architected resolver encrypts traffic while applying full policy.</p>
  </div>
  <div class="grid-feature-card">
    <span class="feature-num">04</span>
    <h4>Universal Coverage</h4>
    <p>DNS security must cover every device. Roaming laptops, BYOD, IoT, and guest devices are crucial.</p>
  </div>
  <div class="grid-feature-card">
    <span class="feature-num">05</span>
    <h4>Deployment Discipline</h4>
    <p>Start in monitoring mode, roll out policy in tiers, integrate logs into SIEM, and review exceptions quarterly.</p>
  </div>
</div>

</div>

<div class="content-card">

<span style="color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.95rem;">Section 01</span>
## Why Enterprise DNS Deserves This Much Attention

Let's start with an uncomfortable question. If you asked your IT team right now who is actively watching your organization's DNS traffic, what would they say?

For most enterprises, the honest answer is nobody, or maybe "the resolver our ISP handed us by default." Compare that to how much scrutiny goes into your firewall rules, your endpoint detection platform, or your email security gateway. DNS, despite being older than the web itself and involved in essentially every single online action your organization takes, tends to get whatever configuration shipped with the router.

<div class="callout-box">
  <p>DNS isn't a side character in the attack story. It's usually the opening line. Before ransomware encrypts a single file or a phishing kit harvests a password, there's almost always a domain lookup.</p>
</div>

If you can see and control that question, and the answer your network gets back, you have one of the earliest and cheapest intervention points available in the entire security stack. Most enterprises simply aren't using it. This guide is about fixing that, with 15 specific, deployable practices rather than a vague call to take DNS more seriously.

A quick note before we dive in. None of this is about ripping out your firewall or your EDR platform and replacing it with DNS controls. DNS security is complementary. Your firewall watches IP addresses and ports. Your endpoint tools watch managed devices. DNS security watches something neither of those can fully see, the name resolution that happens before almost anything else, on every device, managed or not. Layer it in, and you close a gap that's been sitting wide open. Let's get into the 15 practices.

<div class="stack-diagram">
  <h4 style="margin:0 0 1rem 0; text-align:center;">The Enterprise DNS Security Stack</h4>
  <div class="stack-layer">Identity Integration <span>(Map policies to users/groups via SSO/SCIM)</span></div>
  <div class="stack-layer">Protective Filtering & RPZ <span>(Block malware, phishing, lookalikes, DGA)</span></div>
  <div class="stack-layer">Encrypted Transport (DoH/DoT/DoQ) <span>(Secure transit on unmanaged networks)</span></div>
  <div class="stack-layer">DNSSEC Validation <span>(Prevent tampering and spoofing)</span></div>
  <div class="stack-layer">Logging & SIEM Integration <span>(Retain visibility into all network queries)</span></div>
</div>

<span style="color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.95rem;">Section 02</span>
## 1. Deploy Protective DNS Filtering at the Resolver Level

If you only do one thing on this list, make it this one. Protective DNS, sometimes called DNS filtering or DNS threat intelligence, inspects every lookup your network makes in real time against known bad domains, freshly registered domains with suspicious characteristics, algorithmically generated domains, and whatever categories your policy chooses to block. When a device tries to resolve something dangerous, the resolver simply refuses to answer, or hands back a safe warning page instead of the real address.

<div class="callout-box"><p>The catch is that not all protective DNS is created equal. A system relying purely on daily updated reputation feeds will always be a step behind attackers who spin up disposable phishing infrastructure that lives for six hours and vanishes.</p></div>

When you're deploying this, resist the urge to flip straight to full enforcement. Start in monitoring mode for a couple of weeks. You'll learn two things fast: what your actual baseline DNS traffic looks like (you'll be surprised how many SaaS tools and background services are constantly phoning home), and how much risky traffic is already quietly present. Both inform how aggressively you can enforce policy without a VP's favorite tool suddenly breaking.

<span style="color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.95rem;">Section 03</span>
## 2. Turn On DNSSEC Across Every Authoritative Zone

DNSSEC solves a different problem than filtering does. It's about authenticity, not content. It adds cryptographic signatures to your DNS records so that resolvers can verify a response genuinely coming from your authoritative nameserver and wasn't tampered with along the way. That directly counters spoofing and cache poisoning attacks, where an attacker injects a forged record into a resolver's cache so that a user typing the correct URL still gets silently redirected to a malicious server.

This is one of the more commonly skipped best practices, mostly because it has a reputation for being fiddly to set up and maintain: key rotation, signing zones, coordinating with your registrar. That reputation isn't entirely undeserved, but the tooling has improved dramatically, and most modern DNS hosting providers and registrars now offer largely automated DNSSEC signing and rotation.

Enable it in every zone you're authoritative for, not just your primary domain. Attackers love forgotten subdomains and legacy zones precisely because they tend to be the ones nobody remembers to lock down.

<span style="color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.95rem;">Section 04</span>
## 3. Encrypt DNS in Transit with DoH, DoT, or DoQ

Plaintext DNS queries can be read and, in the wrong network conditions, tampered with by anyone sitting on the path between a device and its resolver. That's not a theoretical risk on public WiFi, hotel networks, or any network your organization doesn't fully control, which, given how much work now happens outside the office, describes quite a lot of networks.

Three protocols solve this by encrypting DNS queries in transit. DNS over HTTPS wraps queries inside standard HTTPS traffic, so they're indistinguishable from ordinary web browsing to an outside observer. DNS over TLS encrypts over a dedicated port, which makes it easier for network administrators to identify and manage specifically, at the cost of being more visible and therefore more blockable by a restrictive network. DNS over QUIC is the newest of the three, built on QUIC transport for faster connection establishment and better performance on lossy or high latency connections.

Here's the part worth saying directly, because it's a myth that stops a lot of organizations from adopting encrypted DNS: encryption does not break filtering. Encrypting a query in transit protects it from being read or altered by a third party sitting on the network path. It says nothing about what the resolver you've deliberately chosen to send that query to is allowed to do with it.

<span style="color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.95rem;">Section 05</span>
## 4. Lock Down Recursive Resolvers and Kill Open Resolvers for Good

An open DNS resolver is one that answers recursive queries from any source on the internet, not just your own network or authorized clients. Open resolvers are a favorite tool for DNS amplification attacks, where an attacker sends a small, forged query and the resolver reflects a much larger response at a victim, effectively turning your infrastructure into a weapon in someone else's DDoS attack against a third party.

If your organization runs any authoritative or recursive DNS infrastructure of its own, and many enterprises do, even if it's just an internal resolver for corporate devices, audit it specifically for this. Recursive resolution should only be available to your own network ranges and authenticated clients. Response Rate Limiting should be configured to throttle abusive query volumes automatically. And any resolver that doesn't strictly need to be internet facing shouldn't be.

<span style="color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.95rem;">Section 06</span>
## 5. Implement Response Policy Zones for Real Time Enforcement

Response Policy Zones, or RPZ, are the mechanism that makes real time blocking at the resolver level possible and scalable, rather than something bolted on as an afterthought. RPZ lets a DNS resolver apply custom policy to specific domains: overriding a response for a known bad domain, redirecting the query to a warning page, or simply returning NXDOMAIN (meaning this domain doesn't exist) instead of the real answer.

Think of RPZ as the plumbing underneath protective DNS filtering. The threat intelligence tells the system which domains are dangerous, and RPZ is what enforces that decision now a device asks the question, at scale, across every query your network handles, without meaningfully adding latency.

<span style="color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.95rem;">Section 07</span>
## 6. Log Every DNS Query and Feed It into Your SIEM

DNS query logs are one of the most underrated data sources in enterprise security, and they’re not close. Every device, every app, every background service, and every piece of malware trying to reach a command server generates DNS traffic constantly. If you're logging into it, you have visibility into essentially everything trying to communicate outward from your network, a vantage point most organizations aren't using at all.

<div class="callout-box"><p>The mistake a lot of teams make is treating DNS logs as a separate, siloed thing, living in a standalone console that gets checked occasionally and stays disconnected from everything else the security team is watching. Stream DNS query logs into Splunk, Sentinel, Datadog, or Elastic.</p></div>

This matters for incident response as much as detection. When something goes wrong, DNS logs frequently hold the earliest evidence of what happened: the first lookup to a command-and-control domain, the first sign of a tunneling pattern, or the moment a compromised account started resolving domains it never had before.

<span style="color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.95rem;">Section 08</span>
## 7. Detect Domain Generation Algorithms and Behavioral Anomalies

Modern malware families, especially the ones built for resilience against takedown efforts, frequently use domain generation algorithms to produce large numbers of pseudo random domains on a schedule, sometimes thousands per day. The malware and the attacker's infrastructure both run the same algorithm independently, arriving at the same set of domains without needing a hardcoded command server address that defenders could simply block once and be done with it.

The only reliable countermeasure is behavioral and statistical detection, recognizing the pattern of algorithmically generated domains rather than trying to catch each individual name. That means watching for unusual entropies in domain strings, characteristic length distributions that don't match how humans name things, and high volumes of NXDOMAIN responses as malware cycles through dozens or hundreds of generated candidates hoping one resolves.

<span style="color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.95rem;">Section 09</span>
## 8. Shut Down DNS Tunneling Before It Becomes an Exfiltration Channel

DNS tunneling is one of the more elegant, and more dangerous, abuses of the protocol, precisely because DNS traffic is almost universally allowed through firewalls. Port 53 stays open on nearly every network on earth, because blocking it breaks the internet for that network. Attackers know this, and they use it as a covert channel.

Catching this requires looking at query characteristics that a normal DNS lookup simply doesn't have unusually long subdomain labels, high query volume to a single domain in a short window, high entropy in the queried names, and query patterns that don't match how legitimate applications use DNS. A dedicated DNS security platform with tunneling detection built in will flag this automatically.

<span style="color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.95rem;">Section 10</span>
## 9. Restrict Zone Transfers and Lock Down AXFR

Zone transfers, the mechanism secondary nameservers use to replicate a full copy of a DNS zone from a primary server, can hand an attacker your organization's entire DNS map in a single request if they're left unrestricted. That's every subdomain, every internal hostname, and every piece of infrastructure you've ever pointed a DNS record at, served up in one convenient list to anyone who asks.

This should be restricted to explicitly authorized secondary nameservers only, using IP allowlisting at minimum and TSIG (transaction signature) authentication where your infrastructure supports it. Periodically test this from outside your network. Attempt a zone transfer against your public nameservers the way an attacker would and confirm it's refused.

<span style="color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.95rem;">Section 11</span>
## 10. Harden Registrar and Domain Level Security

DNS security conversations tend to focus heavily on resolvers and query traffic, and understandably so, since that's where the day-to-day threats live. But your domain registrar account itself is a single point of failure that, if compromised, bypasses almost everything else on this list entirely. If an attacker gains control of your registrar account, they can repoint your DNS records anywhere they want, and every technical control downstream of that becomes irrelevant.

Enable a registry lock on your most critical domains, which requires an out of band verification step before any DNS or name server change can go through. Enforce multi factor authentication on every registrar account with administrative access, and audit who has that access.

<span style="color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.95rem;">Section 12</span>
## 11. Build Redundant, Segmented Resolver Architecture

A DNS security layer that goes down along with your primary upstream provider isn't protecting anyone. It's just adding a single point of failure to your network's most fundamental function. Real resilience here means a few specific architectural choices.

<div class="callout-box"><p>Anycast routing lets your resolver infrastructure reroute around a failing upstream root or provider in seconds rather than minutes, because multiple geographically distributed instances can answer the same address, and traffic automatically routes to a healthy one.</p></div>

Split horizon DNS, where internal and external queries get different answers for the same domain, prevents your internal infrastructure map from being exposed to the public internet through a misconfigured public facing resolver.

<span style="color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.95rem;">Section 13</span>
## 12. Extend Protection to Roaming, Remote, and Unmanaged Devices

This is where a lot of otherwise well-built DNS security programs quietly fail, and it's worth being blunt about it. Protection that only applies while a device sits on the corporate office network offers very little value in a world where a large share of work happens on home Wi-Fi, coffee shop connections, and airport lounges.

A resilient approach applies protection at multiple points simultaneously. On managed devices, that means a roaming client deployed silently through your MDM platform. On the network level, it means protecting everything that isn't running an endpoint agent at all: guest devices, IoT hardware, unmanaged BYOD phones, printers, and even the smart TV in the third-floor conference room.

<span style="color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.95rem;">Section 14</span>
## 13. Integrate Identity So Policy Follows the User, Not the IP

Traditional network security policy tends to be built around IP addresses and network segments: this subnet gets this policy, that VLAN gets that one. That model breaks down fast in an environment where people move between networks constantly, where IP addresses get reassigned by DHCP, and where the same device might be on the corporate network in the morning and a home network by afternoon.

Syncing your DNS security policy with your identity provider, whether that's Entra ID, Okta, or Google Workspace, through SCIM provisioning and group mapping lets policy travel with the user and the group they belong to, rather than the network segment they happen to be sitting on at a given moment.

<span style="color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.95rem;">Section 15</span>
## 14. Guard Explicitly Against Spoofing and Cache Poisoning

DNS spoofing, sometimes called cache poisoning, involves injecting false DNS records into a resolver's cache so that a legitimate domain lookup gets silently redirected to a malicious IP address. This is particularly nasty because it defeats the most basic phishing advice anyone's ever been given, which is checking the URL bar. The domain name displayed is correct. It's the destination underneath that's been swapped.

Beyond DNSSEC, which we covered earlier and which directly addresses this by cryptographically verifying response authenticity, a few specific hardening steps matter here. Confirm your resolvers use proper source port and transaction ID randomization rather than predictable sequences. Enabled DNS Cookies where supported, a lightweight mechanism that helps resolvers distinguish legitimate responses from off path forgery attempts.

<span style="color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.95rem;">Section 16</span>
## 15. Plan Your Rollback and Review Exceptions on Real Cadence

The last item on this list isn't technology at all. It's operational discipline, and it's the difference between a DNS security deployment that stays effective for years and one that quietly decays into theater within eighteen months.

Any change to core DNS infrastructure deserves a genuinely tested rollback plan, not just a plan that exists as a paragraph in a document nobody's opened since it was written. What happens if a new resolver has an outage? What's the fallback path?

The second half of this practice is exception management. Every DNS security deployment accumulates exceptions over time. A domain gets manually allowed because someone needed it for a project last quarter, or a category gets loosened for a team that complained loudly enough. Left unreviewed, that exception list becomes its own quiet form of security debt.

</div>

<div class="content-card">

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

## Frequently Asked Questions

<div class="faq-container">
  <details class="faq-item">
    <summary>What is the single most important DNS security best practice for a mid-size enterprise to start with?</summary>
    <div class="faq-content">
      <p>Protective DNS filtering at the resolver level, deployed first in monitoring mode. It delivers the broadest, fastest coverage of anything on this list, because it protects every device that resolves a domain through it, and starting in monitoring mode lets you build enforcement policy off real traffic data instead of guesswork.</p>
    </div>
  </details>

  <details class="faq-item">
    <summary>Is DNSSEC alone enough to secure enterprise DNS?</summary>
    <div class="faq-content">
      <p>No. DNSSEC verifies that a DNS response is authentic and hasn't been tampered with. It says nothing about whether the destination that response points to is safe. A domain can be perfectly DNSSEC signed and still be malicious. It's one layer among many, not a complete solution on its own.</p>
    </div>
  </details>

  <details class="faq-item">
    <summary>Does encrypting DNS traffic with DoH or DoT make filtering impossible?</summary>
    <div class="faq-content">
      <p>No, and this is a common misconception. Encryption protects a query from being read or altered by a third party on the network path. It doesn't prevent the resolver you've deliberately chosen to use from applying policy once the query arrives at that resolver. A well architected DNS security provider supports encrypted transport and full filtering at the same time.</p>
    </div>
  </details>

  <details class="faq-item">
    <summary>How often should we review DNS security exceptions and allowlists?</summary>
    <div class="faq-content">
      <p>Quarterly is a reasonable default for most enterprises. Exception lists accumulate steadily as teams request carve out for specific projects or tools, and without a regular review cadence, that list quietly erodes how much protection your policy is providing, even though the policy itself looks unchanged on paper.</p>
    </div>
  </details>

  <details class="faq-item">
    <summary>Can DNS security stop ransomware before encryption starts?</summary>
    <div class="faq-content">
      <p>It can meaningfully disrupt it, though it's rarely the only control standing between an organization and an attack. A large share of ransomware operations relies on DNS at multiple stages, including initial phishing domains for the foothold and DGA based command and control infrastructure to maintain access, and sometimes DNS tunneling for reconnaissance before encryption ever begins. Strong DNS layer visibility frequently catches those precursor stages well before the damage becomes irreversible.</p>
    </div>
  </details>
  
  <details class="faq-item">
    <summary>Do small and mid-size enterprises really need this level of DNS security, or is it primarily an enterprise scale concern?</summary>
    <div class="faq-content">
      <p>Company size doesn't meaningfully change the threat model here. Attackers running phishing as a service kit and DGA based malware campaigns aren't hand picking targets by headcount. They're casting wide, automated nets. A smaller organization is exactly as reachable by a mass phishing campaign as a large one. The difference usually comes down to which one has any defense at this layer at all.</p>
    </div>
  </details>

  <details class="faq-item">
    <summary>What's the difference between DNS filtering and full DNS security?</summary>
    <div class="faq-content">
      <p>DNS filtering, blocking resolution of known bad or policy violating domains, is one visible feature within the broader discipline of DNS security. The full picture also includes protecting DNS infrastructure itself through DNSSEC, encrypted transport, and resolver hardening, plus using DNS traffic more broadly for threat detection, logging, and incident response visibility.</p>
    </div>
  </details>

</div>
</div>

<div class="content-card">

## Bringing It All Together
Enterprise DNS security is a layered system where controls like DNSSEC, encrypted transport, and protective filtering reinforce each other. You don't need to rip out your existing stack—just point your resolvers somewhere that's actively watching and blocking threats at the domain lookup stage.

> The internet asks the same question billions of times a second: "Where is this domain?" **Enterprise DNS security is simply the decision to start paying attention to the answer.**


<a href="https://olladns.com" style="display: block; text-align: center; text-decoration: none; margin-top: 1.5rem; padding: 1rem; border: 1px solid var(--accent); border-radius: 8px; transition: transform 0.2s ease;">
  <h4 style="margin: 0; color: var(--accent);">Return to the OllaDNS Homepage →</h4>
  <p style="margin: 0.2rem 0 0; color: var(--muted); font-size: 0.85rem;">Explore our Protective DNS platform and enterprise solutions.</p>
</a>
</div>
