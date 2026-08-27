// ─────────────────────────────────────────────────────────────────────────────
//  PER-PROJECT BRANDING  ·  the ONLY file that changes between blog repos.
//  Owner-locked via CODEOWNERS — the SEO team does not edit this (see CONTRIBUTING.md).
// ─────────────────────────────────────────────────────────────────────────────
export const SITE = {
  brand: 'OllaDNS',
  title: 'OllaDNS Blog',
  description: 'Guides, tips, and product updates from the OllaDNS team.',
  url: 'https://blogs.olladns.com',
  marketingUrl: 'https://olladns.com',
  marketingLabel: 'olladns.com',
  author: 'OllaDNS Team',
  accent: '#f97316',
  tagline: 'DNS that just works.',
  locale: 'en',
} as const;

export const NAV = [
  { label: 'Blog', href: '/' },
  { label: 'Tags', href: '/tags/' },
  { label: 'About', href: '/about/' },
];
