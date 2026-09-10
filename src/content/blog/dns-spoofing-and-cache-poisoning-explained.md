---

<style>
  .card-badge {
    font-size: 1.2rem;
    padding: 0.3rem 0.6rem;
  }
</style>
title: "DNS Spoofing and Cache Poisoning Explained: How Attackers Redirect Your Traffic"
description: "DNS spoofing tricks a resolver into catching a fake answer, silently redirecting anyone who asks. Here's exactly how cache poisoning works, from the original 16-bit flaw to the Kaminsky attack, and how to stop it."
pubDate: 2026-09-10T00:00:00.000Z
author: "olladns Security Team"
tags: ["Guide"]
---
<div class="content-card">
  <div class="premium-card-header">
    <span class="card-badge">TL;DR</span>
  </div>

  <p class="tldr-paragraph">DNS cache poisoning happens when an attacker tricks a resolver into storing a fake answer for a domain, silently redirecting every device that queries it. This exploits a structural weakness where resolvers accept a UDP response based on a guessable 16-bit transaction number and source port. While the 2008 Kaminsky attack made this easier by forcing fresh queries via random subdomains, modern defenses like source port randomization, DNS cookies, and DNSSEC have raised the bar. However, newer techniques like SAD DNS show the underlying vulnerability persists. Ultimately, the most reliable defense isn't a single patch, but migrating to a resolver purpose-built to validate, rate limit, and actively monitor for forgery.</p>
</div>

<div class="content-card">
  <div class="premium-card-header">
    <span class="card-badge">KEY TAKEAWAYS</span>
  </div>

<div class="takeaway-cards">
  <div class="takeaway-card">
    <span class="takeaway-num">01</span>
    <span class="takeaway-text"><strong>The Mechanism:</strong> Exactly what a resolver checks before trusting a DNS answer, and why that check was breakable from the start.</span>
  </div>
  <div class="takeaway-card">
    <span class="takeaway-num">02</span>
    <span class="takeaway-text"><strong>The Kaminsky Attack:</strong> How one researcher's 2008 discovery turned a slow, theoretical flaw into a fast, practical one.</span>
  </div>
  <div class="takeaway-card">
    <span class="takeaway-num">03</span>
    <span class="takeaway-text"><strong>Attack Variants:</strong> The difference between off path cache poisoning, on path interception, and local network spoofing, and why they're not the same threat.</span>
  </div>
  <div class="takeaway-card">
    <span class="takeaway-num">04</span>
    <span class="takeaway-text"><strong>Real Consequences:</strong> What happens to a victim once a poisoned entry sits in a resolver's cache.</span>
  </div>
  <div class="takeaway-card">
    <span class="takeaway-num">05</span>
    <span class="takeaway-text">**Defenses:** Which mitigations genuinely close the gap, DNSSEC included, and which only make the attack slightly harder.
</span>
  </div>
</div>
</div>

<div class="content-card">

## The Lie That Only Has to Be Told Once
Most attacks need to fool a person. DNS spoofing only needs to fool a machine, and it only needs to do it one time. That distinction is what makes cache poisoning so quietly dangerous compared to almost anything else in the attacker's toolkit.

Here's the shape of it. A recursive resolver, the piece of infrastructure standing between your device and the rest of the internet, keeps a cache of recent answers so it doesn't have to ask the same question twice. That cache exists purely for speed. But if an attacker can slip a fake answer into that cache before the genuine one arrives, the resolver stores the lie as if it were the truth, and every single device that asks that resolver about that domain, for as long as the entry lives, gets handed the attacker's answer instead of the real one. Nobody clicked anything wrong. Nobody fell for a phishing email. The infrastructure itself was tricked, quietly, once, and everyone downstream inherits the consequences.

This is the part that tends to surprise people who assume DNS attacks require some kind of user error. Cache poisoning doesn't. It exploits a structural weakness in how DNS was originally built to verify that an answer is genuine, a weakness that's been known, patched around, and re discovered in new forms for over two decades. Understanding exactly how that weakness works, and how attackers have exploited it, is the whole point of this piece.

## What a Resolver Actually Checks Before Trusting an Answer
To understand why spoofing works, you must understand what DNS was never built to do: prove, cryptographically, that an answer genuinely came from where it claims to have come from. In its original design, DNS runs almost entirely over UDP, a connectionless protocol with no handshake and no built-in way to verify a sender's identity. When your resolver asks an authoritative server, "where does this domain live," it has no inherent way of confirming that the reply landing in its inbox came from that server and not from someone else entirely.

So, DNS relies on a much weaker substitute for proof: matching. When a resolver sends a query, it attaches a 16-bit transaction identifier, an essentially random number between 0 and 65,535, and it sends the query from a specific source port. When a response comes back, the resolver checks whether the transaction ID matches, whether the source port matches, and whether the question in the reply matches the question it asked. If all those lines up, the resolver accepts the answer as genuine and caches it. That's it. That's the entire authentication mechanism DNS originally shipped with.

The problem should already be obvious. A 16-bit number has only 65,536 possible values. An attacker who can send enough forged responses, guessing at the transaction ID, doesn't need to intercept the real answer or see any legitimate traffic at all. They just need to flood the resolver with fake replies fast enough that one of them happens to land with the right number before the genuine answer arrives. This is, at its heart, a guessing game against a small space, and small spaces get beaten by brute force.

## The Original Off Path Attack: A Race Against a Small Number
Before source ports were randomized, the only real barrier standing between an attacker and a successful forgery was that 16-bit transaction ID, and even that wasn't nearly as strong a barrier as it sounds.

Here's the classic sequence. An attacker, sitting anywhere on the internet with no special access to the victim's network, triggers a DNS lookup, often by getting a victim's browser to load a page that references a resource on the target domain. The moment the resolver doesn't already have that answer caught, it sends its own query out to the real authoritative server and starts waiting for a reply. That waiting window, however brief, is the opening the attacker needs.

During that window, the attacker fires off a flood of forged UDP responses, each one guessing at a different transaction ID, each one claiming to be the authoritative answer, each one pointing the domain at an IP address the attacker controls. If even one of those forged packets happens to arrive with the matching transaction ID before the real authoritative server's genuine reply does, the resolver accepts it, caches it, and discards the real answer when it eventually shows up too late to matter. The resolver has no way of knowing it just got fooled. As far as it's concerned, the question was asked and answered correctly.

This is fundamentally a race, and with only 65,536 possible transaction ID values, an attacker with enough bandwidth and enough attempts has a genuinely reasonable shot at winning it, especially against domains with short cache lifetimes that force resolvers to re query frequently, giving the attacker repeated windows of opportunity rather than just one.

## The Kaminsky Attack: Turning a Slow Problem into a Fast One
For years, this brute force race was considered a real but somewhat impractical threat, mostly because of one limiting factor: if a domain's answer was already sitting in a resolver's cache with time left on its clock, the resolver wouldn't need to send a fresh query at all. It would just serve the cached answer, giving an attacker no fresh race to win until that cache entry expired. That natural throttling made large scale exploitation slower and harder than it might otherwise have been.

In 2008, security researcher Dan Kaminsky found a way around that limitation entirely, and the discovery was significant enough that when he first described it to DNS co-creator Paul Vixie, Vixie's reported reaction was that essentially everything on the internet was going to need to be patched. Kaminsky's insight was almost embarrassingly simple in hindsight: instead of attacking the domain the attacker wanted to hijack, attack a random, nonexistent subdomain instead, something like a string of random characters dot the target domain.

Because that exact subdomain has never been queried before, it can't possibly already be sitting in the resolver's cache. Every single time, without fail, the resolver is forced to go ask the authoritative server fresh, which means every single time, the attacker gets a brand-new race to try to win. And because the resolver has no idea the subdomain is nonsense, it treats each attempt exactly like a legitimate new query, opening a fresh transaction ID guessing window repeatedly, as fast as the attacker cares to generate new random subdomains.

The real damage came from what Kaminsky's forged responses contained. Rather than just claiming to answer the fake subdomain's own lookup, and rather than settling for poisoning one meaningless entry, the forged packets carried an authority section naming a new nameserver for the entire parent domain, along with a glue record pointing that nameserver at an address the attacker controlled. If even one of those forged replies won the race, the resolver didn't just catch a bogus answer for a nonsense subdomain nobody would ever look up. It caught a new, attacker controlled nameserver for the real domain itself, which meant every future query for anything under that domain, the real website, the mail servers, everything, got routed through infrastructure the attacker owned. One successful race, repeated as many times as needed until it landed, was enough to take over an entire domain's resolution for as long as the poisoned entry's artificially inflated time to live kept it alive in the cache.

<div class="feature-grid">
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
</div>

## Beyond the Classic Race: Birthday Attacks and Timing Tricks
The core guessing game behind cache poisoning has been refined in more than one clever direction over the years, and it's worth understanding a couple of the more notable variants, because they illustrate just how much creativity has gone into squeezing more advantage out of a fundamentally small number space.

A birthday attack borrows its name from the well-known probability puzzle about how few people you need in a room before two of them are likely to share a birthday, and the same math applies here. Rather than an attacker sending a stream of guesses against a single outstanding query and hoping to land the right transaction ID, they instead trigger many simultaneous outstanding queries and fire off many simultaneous guesses at once. The odds of any one guess matching any one outstanding query rise far faster than intuition suggests, because the comparison isn't one guess against one target, it's many guesses against many targets at the same time, and the number of possible matching pairs grows much faster than the number of attempts.

Timing matters just as much as raw guessing power. An attacker who can influence when a resolver actually sends its upstream query, for instance by controlling when a victim's browser requests a resource that triggers the lookup, gains a meaningful edge, because they know roughly when the race window opens rather than having to spray guesses continuously and hope to catch a window they can't see. Combined with the Kaminsky technique's ability to force fresh queries on demand, an attacker gets both a predictable timing window and an effectively unlimited number of attempts, which is precisely the combination that makes off path cache poisoning a practical threat rather than a purely theoretical one.

## When the Attacker Doesn't Have to Guess at All: On Path Interception
Everything described so far assumes the attacker is off path, meaning they have no direct visibility into the real traffic between the resolver and the authoritative server, and must guess blindly at transaction IDs and source ports. That's the harder version of the problem for an attacker to solve. There's a meaningfully easier version, and it matters just as much in practice.

An on-path attacker, someone with actual visibility into the network traffic flowing between a victim and the resolver, or between the resolver and the wider internet, doesn't need to guess anything. They can simply watch the genuine query go by, read the transaction ID and source port directly off the wire, and immediately craft a forged response using the exact correct values, then race it to arrive before the legitimate answer does, or in some positions, simply intercept and modify the traffic outright rather than racing it at all.

This is the scenario behind attacks on public Wi-Fi networks, compromised routers, and certain positions within an ISP's own infrastructure. A rogue access point at a coffee shop, or a compromised home router silently altering DNS settings, doesn't need any of the statistical cleverness the Kaminsky attack required, because it sits directly in the path of the traffic it wants to forge. This is also the scenario behind rogue DHCP servers on a local network, which can simply hand out a malicious DNS resolver's address to every device that joins, no packet racing required at all, because the attacker has convinced the victim's device to ask the wrong resolver in the first place rather than trying to fool the right one.

The practical takeaway is that DNS spoofing isn't one single attack technique with one single fix. It's a family of related techniques, off path guessing games exploiting weak entropy, on path interception exploiting network position, and local redirection exploiting trust in DHCP, all converging on the same outcome: a device ends up with a false belief about where a domain name lives.

## What Actually Happens Once the Cache Is Poisoned
It's worth walking through the concrete, practical consequences once a poisoned entry lands, because the abstract description of "the resolver caches a fake answer" undersells how much damage flows from that one moment.

<div class="action-card red">
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
</div>

## Why HTTPS Doesn't Fully Save You
A common and reasonable assumption is that the widespread adoption of HTTPS has quietly neutralized most of the danger here, since an attacker redirecting traffic to their own server still can't present a certificate that matches the real domain, and browsers will flag that mismatch loudly. There's truth in this, and it's genuinely one of the biggest reasons DNS spoofing is a less catastrophic threat today than it was in the pre-HTTPS everywhere era.

But it's an incomplete picture, and it's worth being honest about exactly where the gap remains. Certificate validation protects the specific case of a browser loading a website over HTTPS and checking that the certificate presented matches the domain being visited. It does considerably less for the many other things that rely on DNS resolution and don't carry the same rigorous certificate checking, email routing being the clearest example, along with countless background application connections, API calls between services, and IoT devices that were never built with the same level of certificate scrutiny a modern browser applies.

There's also a subtler problem: DNS spoofing can be used not just to redirect a connection outright, but to interfere with the process before certificate checking ever becomes relevant, forcing a connection failure, degrading a secure connection into an insecure fallback where one is misconfigured to allow it, or simply denying service by pointing critical infrastructure domains nowhere useful at all. HTTPS raises the bar considerably for the most visible, most damaging version of this attack, website credential theft, but it doesn't retire DNS spoofing as a threat, it just narrows where the remaining danger concentrates.

## The Defenses: What Actually Closes the Gap
The security community's response to cache poisoning has unfolded in layers over more than two decades, and it's worth understanding what each layer contributes, because some genuinely closed real gaps while others only raised the cost of the attack without eliminating the underlying weakness.

<div class="card-grid">
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
</div>

And then there's DNSSEC, which is genuinely different in kind from everything listed above, because it's the only defense on this list that doesn't rely on making guessing harder, it makes guessing irrelevant. DNSSEC has authoritative servers cryptographically sign their DNS records, and validating resolvers check that signature against a chain of trust rooted all the way back to the DNS root itself. An attacker who successfully forges a response still fails, because the forged answer either carries no valid signature at all, or carries a signature that doesn't verify correctly, and a DNSSEC validating resolver simply discards it regardless of how perfectly the attacker guessed the transaction ID and source port. This is the closest thing DNS has to a structural, rather than probabilistic, fix for spoofing, though it depends entirely on both the domain being signed and the resolver validating, and adoption on both sides remains meaningfully incomplete across the internet even now.

## SAD DNS and the Ongoing Cat and Mouse Game
It would be comforting to say source port randomization and the layers built on top of it permanently closed this chapter, but honest history says otherwise. Researchers have repeatedly found new side channels that let an attacker recover information the defenses were specifically designed to hide, without ever needing to see the actual traffic on the wire.

One notable line of research, generally referred to as SAD DNS, demonstrated that an attacker could use ICMP probes, ordinary network diagnostic packets that most systems respond to by default, to indirectly infer which source port a resolver was actually using for a given outstanding query, effectively defeating the protection source port randomization was supposed to provide without ever intercepting a single genuine DNS packet. Once the source port is known through this side channel, the attacker is left facing only the original 16-bit transaction ID guessing game, the exact problem source port randomization was meant to make impractical in the first place.

The lesson here isn't that any individual defense failed outright, it's that DNS spoofing has never been a single vulnerability with a single patch. It's been an ongoing structural weakness, rooted in the protocol's original reliance on matching rather than cryptographic proof, that each generation of defenses has narrowed a little further without fully closing. Every meaningful advance so far, source port randomization, 0x20 encoding, DNS cookies, rate limiting, has raised the bar. None of them, on their own, has made the underlying race disappear entirely. Only DNSSEC changes the fundamental nature of the problem, by replacing the race with a cryptographic check, and it's precisely because DNSSEC adoption remains uneven that the rest of this layered defense still matters as much as it does today.

## What a Well-Built Resolver Actually Does Differently
Given all of this, the practical question for anyone running real infrastructure isn't whether DNS spoofing is theoretically possible, it clearly is, it's whether the resolver handling your organization's queries is built to make it genuinely difficult rather than merely inconvenient.

<div class="feature-grid">
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
</div>

## Practical Steps Beyond Just Trusting Your Resolver
Choosing a resolver built with these defenses in mind is the single highest leverage decision here, but it's not the only lever available, and a genuinely careful security posture layers a few more habits on top of it.

<div class="feature-grid">
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
</div>

</div>

<div class="content-card">
<h2 style="color: black;">Frequently Asked Questions</h2>

<div class="faq-container">
  <details class="faq-item" open>
    <summary>What's the actual difference between DNS spoofing and DNS cache poisoning?</summary>
    <div class="faq-content">
      <p>The terms are often used interchangeably, and there's real overlap, but cache poisoning specifically refers to getting a false record stored in a resolver's cache, so it persists and affects future queries. Spoofing is the broader technique, forging a DNS response, which cache poisoning relies on, but which can also be used in ways that don't involve caching at all, such as a single on path interception of one specific query.</p>
    </div>
  </details>

  <details class="faq-item" open>
    <summary>Can DNS spoofing happen even if I only visit websites using HTTPS?</summary>
    <div class="faq-content">
      <p>Largely, HTTPS certificate validation will catch the most damaging version of this, since a spoofed site can't present a valid certificate for the real domain and your browser will warn you loudly. But HTTPS doesn't protect every kind of traffic that depends on DNS, email routing being the clearest example, and it doesn't prevent a poisoned resolver from causing outright denial of access even when it can't successfully impersonate a secure site.</p>
    </div>
  </details>

  <details class="faq-item" open>
    <summary>Does DNSSEC completely solve DNS spoofing?</summary>
    <div class="faq-content">
      <p>It solves the problem structurally for any domain that's signed and any resolver that validates, by replacing the guessing game with a cryptographic check a forged answer simply cannot pass. It doesn't solve the problem across the whole internet yet, because meaningful numbers of domains remain unsigned and meaningful numbers of resolvers don't fully validate, which is exactly why it needs to be paired with the other layered defenses rather than relied on alone.</p>
    </div>
  </details>

  <details class="faq-item" open>
    <summary>Is the Kaminsky attack from 2008 still relevant today?</summary>
    <div class="faq-content">
      <p>The specific technique was addressed by source port randomization and the other coordinated fixes that followed its disclosure, but the underlying insight, forcing fresh queries by targeting random nonexistent subdomains to open repeated attack windows, remains a foundational building block of newer research like SAD DNS, which found new ways to recover the information those original fixes were meant to hide.</p>
    </div>
  </details>

  <details class="faq-item" open>
    <summary>How would I even know if my organization's DNS has been poisoned?</summary>
    <div class="faq-content">
      <p>The clearest signals are unexplained changes in how a stable, well known domain resolves, unusual spikes in DNS query volume or response volume for a single outstanding query, and query logs showing bursts of randomly generated subdomain names against a domain you rely on, which is a strong indicator of an active Kaminsky style probing attempt rather than normal traffic.</p>
    </div>
  </details>

  <details class="faq-item" open>
    <summary>Can a home Wi-Fi router be used to spoof DNS?</summary>
    <div class="faq-content">
      <p>Yes, and this is one of the more common real-world versions of the attack. A compromised or maliciously configured router, or a rogue access point set up to look like a trusted network, sits directly on the path of every device's traffic and can intercept or redirect DNS queries without needing to guess anything at all, since it has genuine visibility into the real traffic passing through it.</p>
    </div>
  </details>

  <details class="faq-item" open>
    <summary>Does using a public DNS resolver instead of my ISP's protect me from this?</summary>
    <div class="faq-content">
      <p>It can help if the resolver switches genuinely implement strong entropy defenses, DNSSEC validation, and active monitoring for spoofing attempts, but simply switching providers isn't automatically a fix. What matters is whether the specific resolver you're using has been engineered with these protections in mind, not which company happens to operate it.</p>
    </div>
  </details>

  <details class="faq-item" open>
    <summary>What's the difference between an on path and an off-path DNS attacker?</summary>
    <div class="faq-content">
      <p>An on-path attacker has genuine visibility into the real network traffic between a victim and their resolver, or between the resolver and the wider internet, and can read the correct transaction ID and source port directly rather than guessing. An off-path attacker has no such visibility and must blindly guess those values, which is the harder, more probabilistic version of the attack that source port randomization and related defenses are specifically designed to make impractical.</p>
    </div>
  </details>

</div>
</div>

<div class="content-card">
<h2 style="color: black;">Bringing It All Together</h2>
DNS spoofing endures because the protocol was built for a more trusting internet. While modern patches—from source port randomization to DNSSEC—have raised the bar, the threat is not purely historical; new techniques like SAD DNS and rogue access points still bypass older defenses. To stay resilient, organizations must move beyond assuming this is a solved problem and instead adopt resolvers built with robust entropy, DNSSEC validation, active anomaly detection, and deep visibility. The lie only has to be told once, and your best defense is a resolver that’s actually paying attention.

<a href="https://olladns.com" class="content-card" style="display: block; text-align: center; text-decoration: none; margin: 2rem auto 0; padding: 1rem 2rem; max-width: 200px; border: 2px solid var(--accent); transition: transform 0.2s ease;">
  <h3 style="margin: 0; color: var(--accent);">OllaDNS</h3>
</a>

</div>
