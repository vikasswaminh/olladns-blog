// ─────────────────────────────────────────────────────────────────────────────
//  PER-PROJECT BRANDING  ·  the ONLY file that changes between blog repos.
//  Owner-locked via CODEOWNERS — the SEO team does not edit this (see CONTRIBUTING.md).
// ─────────────────────────────────────────────────────────────────────────────
export const SITE = {
  brand: 'OllaDNS',
  title: 'OllaDNS Blog',
  description: 'Guides, tips, and product updates from the OllaDNS team.',
  url: 'https://olladns.com/blog',
  marketingUrl: 'https://olladns.com',
  marketingLabel: 'olladns.com',
  author: 'OllaDNS Team',
  accent: '#2f6fed',
  tagline: 'DNS that just works.',
  locale: 'en',
} as const;

export const NAV = [
  { label: 'Blog', href: '/' },
  { label: 'Tags', href: '/tags/' },
  { label: 'About', href: '/about/' },
];
