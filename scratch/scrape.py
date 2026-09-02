import urllib.request
import re
import os
from bs4 import BeautifulSoup

urls = [
    'https://olladns.com/blog/dns-over-https-doh-complete-guide/',
    'https://olladns.com/blog/dns-filtering-explained/',
    'https://olladns.com/blog/dns-firewall-explained-how-dns-firewalls-protect-networks/',
    'https://olladns.com/blog/what-is-dns-how-domain-name-system-works/',
    'https://olladns.com/blog/what-is-dns-security-a-complete-guide-to-protecting-your-network-in-2026/'
]

out_dir = 'src/content/blog'

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        soup = BeautifulSoup(html, 'html.parser')
        
        # Extract title
        og_title = soup.find('meta', property='og:title')
        title = og_title['content'].split('·')[0].strip() if og_title else soup.title.string.strip()
        
        # Extract description
        og_desc = soup.find('meta', property='og:description')
        desc = og_desc['content'] if og_desc else ''
        
        # Extract date
        og_date = soup.find('meta', property='article:published_time')
        pub_date = og_date['content'] if og_date else '2026-08-01'
        
        # Extract section
        og_section = soup.find('meta', property='article:section')
        section = og_section['content'] if og_section else 'Guide'
        
        # Extract body
        body = soup.find('article', class_='post-body')
        if not body:
            print(f"Skipping {url}: No post-body")
            continue
            
        # Remove toc
        toc = body.find(class_='post-toc')
        if toc:
            toc.decompose()
            
        content = str(body)
        
        # Generate markdown frontmatter
        md = f"""---
title: "{title.replace('"', '\\"')}"
description: "{desc.replace('"', '\\"')}"
pubDate: {pub_date}
tags: ["{section}"]
---

{content}
"""
        slug = url.strip('/').split('/')[-1]
        
        filepath = os.path.join(out_dir, f"{slug}.md")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(md)
            
        print(f"Saved {slug}")
        
    except Exception as e:
        print(f"Error on {url}: {e}")
