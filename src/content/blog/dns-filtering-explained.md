---
title: "DNS Filtering Explained: How It Stops Phishing and Malware"
description: "DNS filtering blocks malicious domains before a connection ever forms. Here's exactly how it stops phishing and malware, how it's built, and how to deploy it right."
pubDate: 2026-08-20T00:00:00.000Z
author: "olladns Security Team"
tags: ["Guide"]
---


<div class="content-card">
  <div class="premium-card-header">
    <span class="card-badge">TL;DR</span>
    <h3>DNS Filtering in 60 Seconds</h3>
  </div>

  <p class="tldr-paragraph">DNS filtering intercepts every lookup before a connection opens — stopping threats at the earliest possible point. It works by resolving queries through a protective resolver that checks each domain against threat intelligence in milliseconds. Phishing sites, malware C2 servers, and lookalike domains are blocked before the browser ever loads a byte. Unlike endpoint tools, DNS filtering covers every device on a network with zero software to install. It complements firewalls and EDR — it doesn't replace them — but it catches threats earlier.</p>
</div>



<div class="content-card">
  <div class="premium-card-header">
    <span class="card-badge">KEY TAKEAWAYS</span>
    <h3>What You'll Learn</h3>
  </div>

<ul class="grid-list">
  <li><span><strong>The Mechanism:</strong> Exactly how a filtering resolver intercepts and blocks a domain query before a connection ever opens.</span></li>
  <li><span><strong>Phishing Defence:</strong> Why DNS is the single best choke point to stop phishing — before the page even renders.</span></li>
  <li><span><strong>Malware C2 Blocking:</strong> How filtering cuts off malware's ability to call home to command-and-control servers.</span></li>
  <li><span><strong>Deployment:</strong> A 6-step framework for rolling out filtering without disrupting your team's legitimate work.</span></li>
  <li><span><strong>Evaluation:</strong> The five questions to ask any DNS filtering provider before signing a contract.</span></li>
</ul>

</div>

<div class="content-card">

## The Split Second Before Everything Goes Wrong As organizations scale, solutions like [OllaDNS](https://olladns.com) provide essential visibility and protection at this layer.

Picture the moment right before a phishing attack works. Not the email landing in the inbox — that part is basically free and happens constantly. Not even the moment someone reads it and feels that little flicker of urgency ("your account will be suspended," "invoice overdue," "click to verify"). The moment that matters, the one where the attack either succeeds or dies quietly, is the click.

Someone clicks the link. And in the fraction of a second between that click and the fake login page rendering on their screen, something must happen first: their device must ask, "where is this domain, actually?" That question — a DNS lookup — is the single narrowest chokepoint in the entire attack. It is also, weirdly, one of the least defended.

That's the whole premise behind [DNS filtering](https://olladns.com/product.html "olladns DNS Filtering"). It sits exactly at that chokepoint and asks one question of its own before answering: _is this domain safe to go to?_ If the answer is no, the lookup simply fails. The phishing page never loads. The malware never reaches its command server. The user's browser just… stalls, like the link was broken. No antivirus signature must match. The connection was never allowed to exist in the first place.

This piece is entirely about that mechanism — how it works, why it's effective against phishing and malware specifically, where the real trade-offs and blind spots are, and what a good deployment actually looks like in practice.

02

## A Thirty-Second Refresher on DNS

You already know, roughly, that DNS turns names into numbers. Type olladns.com into a browser and that name gets translated into an IP address a computer can route traffic to. But it undersells how central this process is to _literally everything_ a device does on a network.

Every app phoning home, every background sync, every piece of malware trying to reach its operator — all of it, without exception, starts with a DNS lookup. Not most of it. **All of it.** IP addresses change, get rotated, get load-balanced across data centers constantly. Names are the stable reference points. Numbers are the implementation detail underneath.

That single fact — that everything asks DNS first — is what makes filtering at this layer so unusually powerful. You're not trying to inspect every possible protocol or payload format an attacker might dream up. You're watching one narrow, universal chokepoint that every single connection, malicious or otherwise, is contractually obligated to pass through before it can do anything at all.

100%

of internet connections start with a DNS lookup

<5ms

median DNS resolution time — filtering adds virtually none

1st

DNS is the earliest intervention point in any attack chain

03

## What DNS Filtering Actually Is, Mechanically

DNS filtering routes your DNS queries through a resolver that checks each one against a set of rules — threat intelligence, category policies, custom lists — before deciding whether to return the real answer, a blocked response, or nothing at all.

Under normal circumstances, a DNS resolver's entire job is to be a fast, honest phonebook. You ask, it answers, end of transaction. A filtering resolver adds **exactly one extra step**: a decision point. Before it hands back the IP address, it checks that domain against everything it currently knows — in single-digit milliseconds, because nobody will tolerate a security control that makes every web page feel sluggish.

#### Device sends a DNS query

User types a URL or clicks a link. The device queries its configured DNS resolver.

↓

#### Filtering resolver receives the query

Instead of a plain ISP resolver, the query lands at a [protective resolver](https://olladns.com/product.html "olladns Protective DNS Resolver") that checks every domain.

↓

#### Domain is checked against threat intelligence

The resolver cross-references the domain against blocklists, ML models, and reputation databases — in milliseconds.

↓

#### Decision: Allow or Block

Clean domains resolve normally. Malicious, suspicious, or policy-violating domains return a blocked response.

↓

#### Connection never opens

The browser receives a block page or empty response. No data is exchanged with the malicious server.

🚫

#### Blocklist Check

The domain is matched against known-bad lists from threat intelligence feeds, phishing reports, and malware sandboxes. Fast, reliable for known threats.

🏷️

#### Category Classification

Is this domain gambling, adult content, social media, or a known-malicious category? Policy lets you enforce acceptable use at the DNS layer.

🧠

#### Behavioral Analysis

Structural signals — domain age, registration patterns, algorithmic name entropy — score risk even before a domain has been reported by anyone.

04

## How DNS Filtering Stops Phishing

Phishing is a con game that depends entirely on getting a victim to a fake page that looks real enough. Email is just the delivery mechanism — increasingly it isn't even email anymore; it's SMS, a QR code on a parking meter, a fake job offer in a chat app, a comment on a social post. The delivery channel keeps changing because attackers know email filters have gotten reasonably good. But the destination — the part that does the damage — is still almost always a domain the victim's device must resolve before the fake page can load.

An email filter only sees email. An SMS spam filter only sees texts. A DNS filter sees the lookup regardless of which app or channel triggered it — because at the DNS layer, a link is a link is a link.

Phishing infrastructure today is disposable by design. A phishing-as-a-service kit spins up a fresh domain, points it at a convincing cloned login page, blasts out a wave of messages, harvests credentials in the first few hours, and abandons the domain before most reputation systems have even logged its existence. A blocklist that updates once a day is nearly worthless against a domain with a six-hour operational lifespan.

This is exactly why the more advanced DNS filtering systems don't wait for a domain to be reported before flagging it. They look at signals available the moment a domain becomes visible: how recently it was registered, whether its structure closely resembles a known brand (typosquatting, homoglyph impersonation), whether the certificate and hosting pattern match known phishing infrastructure templates, and whether the query volume looks like a mass campaign. A domain doesn't need a confirmed victim report to get flagged if enough structural signals line up on their own.

That's the difference between _"we caught this because someone got burned first"_ and _"we caught this because it looked wrong the moment it appeared"_ — and in a world where phishing kits live for hours, that difference is the entire ballgame.

05

## Why This Is Also a Good Place to Stop Malware

Phishing gets most of the popular attention, but DNS filtering earns just as much of its keep against malware — almost nothing malicious runs in total isolation anymore. **Modern malware calls home.**

💀

#### Initial infection lands

Phishing attachment, drive-by download, compromised USB — the vector doesn't matter. The payload executes. At this point the malware is running but it's blind.

📡

#### Malware must ask DNS for its C2 address

It needs instructions, a place to send stolen data, a way to check in. All of that communication is coordinated through domain names, not hardcoded IPs, because domains are flexible and IPs get burned quickly.

🛡️

#### DNS filter blocks the lookup — malware goes dark

If that lookup fails, the malware is functionally stranded. It's running on the machine but has no way to receive instructions, exfiltrate anything, or coordinate. It's a burglar in an empty room with the phone line cut.

🔍

#### DGA detection catches what blocklists can't

DGA-based malware generates thousands of pseudo-random candidate domains per day. You cannot blocklist your way out of that. Detection means recognizing the statistical fingerprint of machine- generated names — unusual entropy, burst NXDOMAIN patterns — and blocking the entire class.

06

## The Building Blocks: What's Inside a Filtering Decision

"DNS filtering" as a phrase can hide a huge range of actual sophistication. The differences matter enormously in practice — here's what's actually happening inside a real filtering decision:

#### 📋 Reputation Blocklisting

The floor, not the ceiling. Community- and vendor-maintained lists of known-bad domains. Necessary and fast, but fundamentally reactive — there's always a window between a domain going live and it being blocked.

#### 🤖 DGA Classification

A classifier trained to recognize the statistical fingerprint of algorithmically generated names. Character entropy, n-gram frequency, vowel-to-consonant ratios. Runs inline, scoring every query in real time, without ever having seen that domain before.

#### 🔡 Typosquat & Homoglyph Detection

Domains deliberately built to look like a trusted brand — transposed letters, missing characters, or Cyrillic characters that render identically to Latin ones. Damerau-Levenshtein distance, with proper homoglyph normalization, catches these reliably at scale.

#### 🕐 Freshness & Registration Analysis

Domain age and registration characteristics treated as a genuine risk signal. A domain registered 14 minutes ago, hosted on infrastructure associated with phishing kits, with a name one character off from a well-known bank, is very different from one resolving consistently for six years.

#### 📈 Query Pattern & Volume Analysis

Watching not just what's asked but how, how often, and from where. Burst NXDOMAIN cycling signals DGA malware. Steady long-subdomain queries to an obscure domain signal tunneling. Patterns only visible when treating traffic as a stream, not isolated lookups.

#### 🏢 Per-Tenant Brand Protection

Feed in your own domain names and the system watches specifically for lookalikes of your brand — not just generic threat feeds that have no idea your company exists. Increasingly standard, not an enterprise add-on.

The honest takeaway: not one of these techniques is sufficient on its own. The strongest filtering systems layer all of them, so a domain missing one check still gets caught by another.

#### Blocklists & Allowlists

Curated lists of known-malicious and known-safe domains. Updated continuously from threat intelligence feeds.

#### Domain Age & Reputation

Newly registered domains are treated with higher suspicion. Phishing infrastructure is typically freshly created.

#### ML Classifiers

Machine learning models analyze domain patterns, query behaviour, and network signals to flag suspicious activity in real time.

#### Category Policies

Admins can block entire categories (gambling, adult, social media) in addition to known threats — useful for compliance.

07

## What Happens, Concretely, When Something Gets Blocked

The mechanics are simpler and less dramatic than people sometimes expect — and that simplicity is the whole point. A user's device sends a DNS query. The filtering resolver checks it against its threat intelligence and classification systems in single-digit milliseconds. If the domain is flagged, the resolver doesn't return the real IP. Instead one of these outcomes occurs:

🚫 NXDOMAIN — domain "doesn't exist" ⚠️ Redirect to block-page with explanation ⬛ Null / unroutable address

Notice what _didn't_ happen in any of these: no malicious code executed. No payload was downloaded and then caught by antivirus after the fact. No credential-harvesting page ever rendered. The connection was refused at the earliest possible moment, before it ever really began. **Prevention at the address-lookup stage, not detection-and-cleanup after something has already run.**

This is also why DNS filtering tends to be relatively invisible in daily use when it's working correctly. Most of the time nothing happens, because most domains people visit are entirely legitimate. The filtering layer is only ever noticeable in the moments it's actively protecting someone — and even then, from the user's side, it usually just looks like a broken link. That invisibility is a feature: a security control that constantly interrupts people with dramatic warnings trains them to click through warnings faster, which defeats the purpose.

08

## Where DNS Filtering Sits Relative to Your Other Defenses

DNS filtering is not a replacement for a firewall, endpoint protection, or email security. It's a complementary layer that happens to sit somewhere those other tools structurally can't reach.

Tool

Signal it uses

Covers unmanaged devices?

Catches non-email delivery?

Intervenes before connection?

🔥 Firewall

IP addresses & ports

Partial

Partial

Partial

💻 Endpoint / AV

File & process behavior

No — agent required

Partial

No — reacts post-execution

📧 Email Security

Email content & links

No

No — inbox only

Partial

🛡️ DNS Filtering

Domain names & patterns

Yes — all devices

Yes — any channel

Yes — before connection forms

Think of it like a bank's security: cameras, guards, alarms, and a vault door — each covering a different failure mode of the others. None of them make the rest obsolete.

09

## Deploying DNS Filtering Without Breaking Everyone's Workday

Rolling it out across a real organization with real people who will absolutely notice and complain if something legitimate stops working is where a lot of otherwise sound security initiatives quietly stumble. Here's a practical framework:

01

#### Start in monitoring mode, not blocking mode

Run in a log-and-classify-only mode first for a couple of weeks. This surfaces your actual baseline traffic — all the SaaS tools, internal services, and background processes making DNS calls nobody documented — and shows how much risky traffic is already flowing unnoticed.

02

#### Cover roaming devices, not just the office network

A meaningful share of work now happens on home WiFi, coffee shops, and airports. A roaming client deployed silently through Jamf, Intune, Kandji, or Workspace ONE closes that gap without asking anyone to remember to turn something on manually.

03

#### Tier your policy instead of one blanket rule

A finance team processing wire transfers has a genuinely different risk profile than general office staff. Build sensible defaults for the broad organization, tighter enforcement for higher-risk groups, and a fast, clear exception process for legitimate collisions.

04

#### Feed logs into wherever your team already watches

DNS query logs are an underused data source for detection and incident response. Streaming into Splunk, Sentinel, Datadog, or Elastic means DNS-layer signals get correlated with everything else you're already watching, instead of sitting in isolation as one more tab nobody checks.

05

#### Manage policy as code where you can

Managing policies through a Terraform provider — with drift detection and version history — brings the same operational discipline to [DNS security](https://olladns.com/blog/what-is-dns-security-a-complete-guide-to-protecting-your-network-in-2026/ "What Is DNS Security?") that most teams already demand of their infrastructure elsewhere. "Who approved this exception, and when" becomes a one-line git blame.

06

#### Plan the rollback before you need it

Any change to DNS resolution deserves a tested fallback plan. What happens if the filtering resolver has an outage? Who has authority to revert, and how quickly? Teams that skip this develop a lasting grudge against DNS filtering when the real gap was a missing runbook.

10

## Common Objections, Addressed Honestly

A handful of pushbacks come up often enough that they're worth answering directly, without the marketing gloss.

🤔

"Won't this slow down browsing for everyone?"

✅

A well-built filtering resolver typically responds in single-digit milliseconds — often faster than a default ISP resolver, because dedicated security resolvers tend to be better engineered and better peered. Where slowdowns do occur, it's almost always a specific misconfiguration, not an inherent property of filtering itself.

🤔

"We're too small to be worth targeting."

✅

Phishing-as-a-service kits and automated malware campaigns aren't hand-selecting victims based on company size — they're casting wide, largely automated nets. A nine-person office is exactly as reachable by a mass phishing campaign as a large enterprise.

🤔

"Encrypted DNS (DoH/DoT) makes filtering pointless, right?"

✅

Encryption protects the query in transit from being read by anyone on the network path in between. What it doesn't do is prevent the resolver you've deliberately chosen from applying policy once the query arrives. Encryption and filtering happen at the same trusted endpoint — they're not in tension with each other.

🤔

"Doesn't this just create a false sense of security?"

✅

Only if it's deployed and then forgotten about — which is a fair risk with almost any security tool. Treated as one deliberate layer among several, reviewed and tuned, it earns its keep. Treated as a checked box, sure, it can quietly stop being useful while everyone assumes it's still working.

🤔

"What about traffic that bypasses our configured DNS entirely?"

⚡

This is a real and honest limitation. A sufficiently motivated piece of malware, or a user who deliberately changes device DNS settings, can route around a filtering setup. This is exactly why network-level enforcement restricting outbound DNS to only the sanctioned resolver is important — but "most" bypass paths closed is doing real work in that sentence and it's worth knowing upfront.

11

## What to Actually Look for When Evaluating a Provider

If you're comparing options rather than taking any single vendor's word for it, a handful of questions separate the genuinely strong choices from the merely adequate ones.

⚡

#### Detection speed on newly registered infrastructure

Ask specifically how fast they flag newly registered malicious infrastructure — not just blocklist size. A provider that shows median detection measured in minutes operates in a fundamentally different tier than one leaning on static feeds that update once or twice a day.

📊

#### False-positive rates, measured — not just claimed

A filter that blocks aggressively but constantly flags legitimate business traffic will get quietly disabled within weeks of rollout. The most sophisticated filtering engine in the world is worthless the moment someone turns it off because the help desk can't keep up with complaints.

🌍

#### Roaming device coverage

Check whether protection genuinely follows roaming devices or evaporates the moment someone leaves the office network. Confirm the deployment story for your MDM platform — a rollout that requires manually touching every laptop quietly stalls around device number thirty.

🔗

#### SIEM & identity integration

Look at whether logs integrate with the tools your security team already lives in day to day, and whether policy can be tied to identity — through Entra ID, Okta, or Google Workspace — rather than IP ranges that shift every time someone moves desks or reconnects to Wi-Fi.

Ask directly about behavioral and structural detection, not just blocklist matching, since that's the single clearest line between filtering that keeps pace with how threats operate today and filtering that's a well-organized list running a few months behind.

And read the provider's actual trust and security posture rather than the marketing page alone. What's the real state of their compliance certifications — completed, or "in progress," and since when? What do they retain, for how long, and where does it physically live? You're routing a meaningful share of your organization's sensitive traffic metadata through this provider's infrastructure, so their own security discipline matters just as much as their feature list.

12

## Frequently Asked Questions

Is DNS filtering the same thing as DNS security?

Not quite — filtering is one major piece of the broader DNS security discipline, not the whole of it. DNS security also covers things like protecting the DNS infrastructure itself against spoofing and tampering and encrypting queries in transit. Filtering specifically refers to the part where a resolver decides whether to answer a given lookup.

Does DNS filtering stop zero-day malware it's never seen before?

It can, though, not through recognition of the specific malware sample itself. Behavioral and structural detection — recognizing DGA patterns, unusual query volumes, or a domain's suspicious registration characteristics — can catch previously unseen [command-and-control](https://olladns.com/security.html "Block C2 with olladns") infrastructure even when the malware binary itself has never been analyzed by anyone.

Will DNS filtering block legitimate websites by mistake?

Occasionally, yes, and this is exactly why false-positive rate is such an important question when choosing a provider. A well-tuned system combining multiple signals, rather than relying on one blunt category list, keeps this rate low, and a fast, clear exception process handles the cases that do slip through.

Can DNS filtering work if my organization uses encrypted DNS (DoH or DoT)?

Yes. Encryption protects the query from being read or altered on its way to the resolver; it has no bearing on whether the resolver you've chosen applies policy once the query arrives. A properly built filtering service supports encrypted transport and still fully inspects and filters the traffic.

Does DNS filtering replace the need for a firewall or antivirus?

No, and it isn't meant to. Each of those tools sees a different slice of the problem — a firewall watches IPs and ports, antivirus watches device behavior, DNS filtering watches domain lookups across every device on the network regardless of whether it has an agent installed. They're complementary layers.

How quickly can DNS filtering catch a brand-new phishing domain?

This varies significantly by provider and is worth pressing on directly during evaluation. Reputation-based lists that update once daily are close to useless against phishing infrastructure that lives for a matter of hours. Systems built around registration-age analysis, structural brand-similarity scoring, and behavioral signals can flag malicious domains within minutes of them going live, well before any human report exists.

What happens on a user's screen when a domain gets blocked?

Most commonly, either the page simply fails to load, appearing to the user like a broken or dead link, or the resolver redirects to a plain warning page explaining that the destination was blocked and why. There's typically no dramatic pop-up or interruption — the connection is quietly declined before it ever really starts.

Does DNS filtering cover devices that aren't managed by IT, like guest Wi-Fi or IoT devices?

Yes, when it's deployed at the network or resolver level rather than only through a device-specific agent. Every device that connects to the network still must perform DNS lookups to function, which means resolver-level filtering covers unmanaged and guest devices the same way it covers managed laptops.

Can attackers just bypass DNS filtering entirely?

To some degree, yes, and it's worth being upfront about this rather than overselling the control. A device or piece of malware that's configured to ignore the network's assigned DNS resolver and query a different one directly can route around filtering. This is exactly why organizations pair DNS filtering with network-level rules that restrict outbound DNS traffic to only the sanctioned resolver, closing off most — though realistically not literally all — of that bypass path.

Is DNS filtering only useful for blocking phishing and malware, or does it do more?

Threat blocking tends to get the most attention, but the same mechanism supports content and category policy too — restricting access to specific categories of sites for compliance reasons, managing acceptable use on a school or corporate network, and giving security teams a genuinely rich, otherwise-underused stream of visibility into what every device on the network is actually trying to reach.

13

## The Bigger Picture

Step back far enough and DNS filtering is just a bet on timing. Every attack, no matter how sophisticated the payload eventually becomes, must ask a simple question first: where does this domain live? That question happens before the fake login page renders, before the ransomware payload downloads, before stolen data starts leaking out one encoded query at a time. It is, structurally, one of the earliest and most universal points at which a defender gets a genuine shot at saying no.

That doesn't make it sufficient on its own, and nothing in this piece should be read as suggesting it is. A determined attacker with time and resources can find ways around any single layer, and DNS filtering has real, honestly-stated limits — it can be bypassed by traffic that ignores the configured resolver entirely, it depends heavily on the quality and speed of the threat intelligence behind it, and it says nothing about threats that don't touch domain resolution at all, like an attacker already inside the network moving laterally between machines that already trust each other. It's one deliberate layer in a stack, not a replacement for the rest of that stack.

But as one layer among several, it's a remarkably efficient one, precisely because of where it sits and how little it asks of the rest of your environment to be effective. It doesn't require every single device to run a heavy agent. It doesn't require inspecting the contents of every file that crosses the network. It requires pointing to your resolvers somewhere that's paying attention and treating a protocol most organizations still think of as invisible plumbing with the seriousness that its role in nearly every modern attack chain genuinely warrants.

The lookup happens whether anyone's watching or not. DNS filtering is simply the decision to be the one watching.

<div class="post-footer" style="margin-top: 3rem; margin-bottom: 1rem; border-top: none; padding-top: 0; text-align: center;">
  <a class="btn" href="https://olladns.com">Learn more about OllaDNS →</a>
</div>
</div>
