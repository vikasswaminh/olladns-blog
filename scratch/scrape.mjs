import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import TurndownService from 'turndown';

const urls = [
  'https://olladns.com/blog/dns-over-https-doh-complete-guide/',
  'https://olladns.com/blog/dns-filtering-explained/',
  'https://olladns.com/blog/dns-firewall-explained-how-dns-firewalls-protect-networks/',
  'https://olladns.com/blog/what-is-dns-how-domain-name-system-works/',
  'https://olladns.com/blog/what-is-dns-security-a-complete-guide-to-protecting-your-network-in-2026/'
];

const outDir = path.resolve('src/content/blog');
const turndownService = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });

async function run() {
  for (const url of urls) {
    try {
      console.log('Fetching ' + url);
      const res = await fetch(url);
      const html = await res.text();
      const dom = new JSDOM(html);
      const document = dom.window.document;

      const title = document.querySelector('meta[property="og:title"]')?.content?.split('·')[0].trim() || document.title;
      const description = document.querySelector('meta[property="og:description"]')?.content || '';
      const pubDate = document.querySelector('meta[property="article:published_time"]')?.content || new Date().toISOString();
      const author = document.querySelector('meta[property="article:author"]')?.content || 'OllaDNS Team';
      const section = document.querySelector('meta[property="article:section"]')?.content || 'Guide';

      const slug = url.split('/').filter(Boolean).pop();

      const articleNode = document.querySelector('article.post-body');
      if (!articleNode) {
        console.log('Could not find article.post-body for ' + url);
        continue;
      }

      // Remove unwanted elements
      const toc = articleNode.querySelector('.post-toc');
      if (toc) toc.remove();

      let markdown = turndownService.turndown(articleNode.innerHTML);

      const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
pubDate: ${new Date(pubDate).toISOString()}
author: "${author}"
tags: ["${section}"]
---
`;

      const finalContent = frontmatter + '\n' + markdown;
      fs.writeFileSync(path.join(outDir, `${slug}.md`), finalContent);
      console.log('Saved ' + slug);
    } catch (err) {
      console.error('Failed on ' + url, err);
    }
  }
}

run();
