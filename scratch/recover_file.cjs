const fs = require('fs');

let path = 'src/content/blog/what-is-protective-dns.md';
let content = fs.readFileSync(path, 'utf8');

// The file was corrupted starting from `description:`
// Let's remove the corrupted first part (everything up to `<div class="feature-grid">`)
let gridStart = content.indexOf('<style>\n.feature-grid {');
let remainingContent = content.substring(gridStart);

let recoveredStart = `---
title: "What Is Protective DNS? How It Blocks Cyber Threats at the Resolver"
description: "A comprehensive guide to how Protective DNS works, what it blocks, and how to deploy it effectively."
pubDate: 2026-09-02T00:00:00.000Z
author: "olladns Security Team"
tags: ["Guide"]
---

<div class="content-card">

01

## So, What Exactly Is Protective DNS?
Protective DNS, sometimes written as PDNS, sometimes just called DNS filtering, sometimes bundled into a broader DNS security pitch, is a security control that inspects DNS queries in real time and blocks resolution for domains that are known or suspected to be malicious, before a connection to that domain can ever be established.

It's worth being precise about what that sentence means, because DNS filtering gets used loosely in a lot of marketing copy.

A protective DNS service sits between your devices and the open internet's DNS infrastructure. Every time something on your network, a laptop, a phone, a server, a smart TV in the conference room, whatever it might be, tries to look up a domain name, that query goes to the protective DNS resolver first, instead of going straight to a generic public resolver or your ISP's default one.

The resolver checks that query against a constantly updated set of threat intelligence: known phishing domains, known malware command and control infrastructure, domains showing the statistical fingerprints of algorithmic generation, freshly registered domains that look suspiciously similar to a trusted brand, and categories your organization has chosen to restrict. If the domain comes back clean, the query resolves normally and the user never notices anything happened. If the domain is flagged, the resolver refuses to hand back the real IP address, sometimes returning nothing, sometimes redirecting to a page explaining that the connection simply never forms.

This is a genuinely different model from most security tooling, and it's worth pausing on why. Most security controls are reactive by nature. They inspect something that's already arrived, a file, a network packet, an email attachment, and try to determine, after the fact, whether it's dangerous. Protective DNS is preventive in a much more literal sense. It intervenes before the thing arrives at all, because the domain lookup is a prerequisite step that happens before any content, payload, or connection exists on your network.

There's an analogy that tends to land well here. Imagine airport security, but instead of screening passengers as they walk through a metal detector, you could simply know, in advance, that a particular flight's destination airport has been flagged as compromised, and just not let the plane take off. That's roughly the difference between protective DNS and most other security layers. It's not screening the payload as it arrives. It's refusing to let the journey start in the first place.

02

## How the Resolver Becomes a Security Checkpoint
To understand why protective DNS works so well, it helps to understand exactly where in the DNS resolution process it sits, and why that position is so valuable.

When a device wants to reach a domain, it's trying to load a webpage, or malware on that device is trying to reach a command server, it doesn't just magically know the IP address. It asks a resolver. That resolver is configured somewhere. Sometimes it's assigned automatically by your ISP, sometimes it's a public resolver someone manually configured, and in an organization running protective DNS, it's the protective DNS provider's resolver.

Under normal, unprotected circumstances, that resolver's only job is translation. It takes the domain name, works out the corresponding IP address, either from its own cache or by walking the chain of root servers, top level domain servers, and the domain's authoritative nameserver, and hands the answer straight back. It doesn't ask whether the domain is dangerous. It doesn't care. It's not built to care. It's built to be fast and accurate at translation, full stop.

Protective DNS changes that contract. Instead of blind translation, every query gets evaluated against threat intelligence before an answer is returned. This evaluation typically happens in milliseconds, genuinely single digit millisecond territory on a well-built system, so from the user's perspective there's no perceptible delay for most legitimate queries. The security check is invisible until it catches something.

This is the mechanism that makes protective DNS so powerful as an interception point. It doesn't matter what the delivery method was. It doesn't matter if the malicious link arrived through email, a text message, a QR code someone scanned off a poster, a compromised website serving a malicious ad, or a USB drive with a shortcut file on it. All those roads eventually converge on the same action, a device trying to resolve a domain name, and protective DNS is watching that convergence point, not any one of the individual roads leading to it.

Contrast with a tool like email security, which only sees threats that arrive through email. Or antivirus, which only sees threats on devices where the agent is installed and running, leaving guest devices, IoT gadgets, and unmanaged BYOD hardware completely uncovered. Protective DNS, applied at the network resolver level, covers every device that resolves a domain through it, regardless of what security software is or isn't installed locally. That universality is one of its biggest structural advantages.

It's also worth noting that the checkpoint isn't a single monolithic gate. A mature protective DNS deployment usually enforces this check at multiple points simultaneously: at the network level for anything connected to the corporate network, and through a lightweight roaming client on managed devices so the protection travels with the laptop out the door, onto home WiFi, into a coffee shop, wherever the device actually goes. Because a huge share of modern work doesn't happen inside a nicely fenced office network anymore, and protection that stops at the office door isn't protecting much of anything.

03

## What Protective DNS Actually Blocks
It's one thing to say it blocks malicious domains. That's true but abstract. Let's get specific about the categories of threats protective DNS is stopping in practice, because each one exploits DNS a little differently.

`;

content = recoveredStart + remainingContent;
fs.writeFileSync(path, content);
console.log('Recovered file content and fixed frontmatter.');
