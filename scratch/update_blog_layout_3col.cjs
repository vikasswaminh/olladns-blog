const fs = require('fs');

// 1. Revert global.css to use 3 columns
let cssPath = 'src/styles/global.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Replace 2-column layout back with 3-column layout
cssContent = cssContent.replace(
  'grid-template-columns: 260px minmax(0, 1fr);',
  'grid-template-columns: 240px minmax(0, 1fr) 260px;'
);

fs.writeFileSync(cssPath, cssContent);
console.log('Restored global.css to 3-column layout.');


// 2. Rewrite PostLayout.astro
let layoutPath = 'src/layouts/PostLayout.astro';
let layoutContent = fs.readFileSync(layoutPath, 'utf8');

// The layout block currently has <div class="post-content-layout"> with a left navigation sidebar and the prose.
let oldLayoutBlock = /<div class="post-content-layout">[\s\S]*?<\/div>\s*<\/article>/;
let newLayoutBlock = `<div class="post-content-layout">
      
      <!-- Left Sidebar: Recent Posts -->
      <aside class="left-navigation-sidebar" style="position: sticky; top: 90px; margin: 0;">
        <h3 class="recent-posts-title" style="margin-top: 0;">ALL BLOG POSTS</h3>
        <div class="recent-posts-list">
          {recentPosts.map(p => (
            <a href={\`/\${p.slug}/\`} class="recent-post-card">
              <h4>{p.data.title}</h4>
            </a>
          ))}
        </div>
      </aside>

      <!-- Center: Main Article -->
      <div class="prose">
        <slot />
      </div>

      <!-- Right Sidebar: OllaDNS Navigation Links -->
      <aside class="recent-posts-sidebar" style="position: sticky; top: 90px; margin: 0;">
        <h3 class="recent-posts-title" style="margin-top: 0;">OLLADNS</h3>
        <div class="navigation-links" style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2.5rem;">
          <a href="https://olladns.com" class="recent-post-card" style="text-decoration: none; display: block; border-left: 3px solid transparent; padding: 0.75rem 1rem;">
            <h4 style="margin: 0; font-size: 0.95rem;">Return to main OllaDNS homepage</h4>
          </a>
          <a href="https://olladns.com/products" class="recent-post-card" style="text-decoration: none; display: block; border-left: 3px solid transparent; padding: 0.75rem 1rem;">
            <h4 style="margin: 0; font-size: 0.95rem;">Explore the protective DNS platform</h4>
          </a>
          <a href="https://olladns.com/solutions" class="recent-post-card" style="text-decoration: none; display: block; border-left: 3px solid transparent; padding: 0.75rem 1rem;">
            <h4 style="margin: 0; font-size: 0.95rem;">Discover industry-specific solutions</h4>
          </a>
        </div>
      </aside>

    </div>
  </article>`;

layoutContent = layoutContent.replace(oldLayoutBlock, newLayoutBlock);
fs.writeFileSync(layoutPath, layoutContent);
console.log('Restored 3-column layout in PostLayout.astro and split sidebars.');
