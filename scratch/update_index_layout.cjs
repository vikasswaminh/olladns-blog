const fs = require('fs');

let path = 'src/pages/index.astro';
let content = fs.readFileSync(path, 'utf8');

// The main content section currently starts like this:
/*
    <!-- Main Content -->
    <main class="super-main-content">

      <div class="sidebar-header" style="margin-bottom: 0.5rem; display: flex; align-items: center; height: 32px; gap: 1rem;">
*/

let titleHtml = `
    <!-- Main Content -->
    <main class="super-main-content">
      
      <div class="blog-hero-section" style="margin-bottom: 3rem; padding-bottom: 2rem; border-bottom: 1px solid var(--border);">
        <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--text-main); letter-spacing: -0.02em;">
          OllaDNS <span style="color: #ff69b4;">Blog</span>
        </h1>
        <p style="font-size: 1.25rem; color: var(--text-muted); margin: 0;">
          Guides, tips, and product updates from the OllaDNS team.
        </p>
      </div>

      <div class="sidebar-header" style="margin-bottom: 1.5rem; display: flex; align-items: center; height: 32px; gap: 1rem;">
`;

content = content.replace(
  `    <!-- Main Content -->
    <main class="super-main-content">

      <div class="sidebar-header" style="margin-bottom: 0.5rem; display: flex; align-items: center; height: 32px; gap: 1rem;">`,
  titleHtml
);

// We should also change the badge in the featured card to match the solid pink style from the image
content = content.replace(
  `class="badge-premium badge-orange mb-3" style="align-self: flex-start;"`,
  `class="badge-accent mb-3" style="align-self: flex-start; background-color: #ff69b4; color: white;"`
);

// We will also change the NEWEST ARTICLES and ALL BLOG POSTS badges to pink to match the image, and OLLADNS to blue
content = content.replace(
  `<span class="badge-accent">ALL BLOG POSTS</span>`,
  `<span class="badge-accent" style="background-color: #d84594; color: white;">ALL BLOG POSTS</span>`
);
content = content.replace(
  `<span class="badge-accent">NEWEST ARTICLES</span>`,
  `<span class="badge-accent" style="background-color: #d84594; color: white;">NEWEST ARTICLES</span>`
);
content = content.replace(
  `<span class="badge-accent">OLLADNS</span>`,
  `<span class="badge-accent" style="background-color: #2b6cb0; color: white;">OLLADNS</span>`
);


fs.writeFileSync(path, content);
console.log('Added main title section and updated badge colors to match the reference image.');
