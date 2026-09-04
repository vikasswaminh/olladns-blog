const fs = require('fs');

let layoutPath = 'src/layouts/PostLayout.astro';
let layoutContent = fs.readFileSync(layoutPath, 'utf8');

// The left sidebar currently looks like this:
/*
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
*/

let newLeftSidebar = `      <!-- Left Sidebar: Recent Posts -->
      <aside class="left-navigation-sidebar" style="position: sticky; top: 90px; margin: 0;">
        <h3 class="recent-posts-title" style="margin-top: 0;">ALL BLOG POSTS</h3>
        <div class="recent-posts-list" style="background: var(--bg); border: 1px solid var(--border); border-radius: 12px; padding: 0;">
          {recentPosts.map((p, index) => (
            <a href={\`/\${p.slug}/\`} style={\`display: block; padding: 1rem; text-decoration: none; color: var(--text-main); \${index !== recentPosts.length - 1 ? 'border-bottom: 1px solid var(--border);' : ''}\`}>
              <h4 style="margin: 0; font-size: 0.95rem; font-weight: 500; line-height: 1.4;">{p.data.title}</h4>
            </a>
          ))}
        </div>
      </aside>`;

layoutContent = layoutContent.replace(/<!-- Left Sidebar: Recent Posts -->[\s\S]*?<\/aside>/, newLeftSidebar);

// Also apply the exact same treatment to the right sidebar (OllaDNS Navigation Links)
/*
      <!-- Right Sidebar: OllaDNS Navigation Links -->
      <aside class="recent-posts-sidebar" style="position: sticky; top: 90px; margin: 0;">
        <h3 class="recent-posts-title" style="margin-top: 0;">OLLADNS</h3>
        <div class="navigation-links" style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2.5rem;">
          <a href="https://olladns.com" class="recent-post-card" style="text-decoration: none; display: block; border-left: 3px solid transparent; padding: 0.75rem 1rem;">
            <h4 style="margin: 0; font-size: 0.95rem;">Return to main OllaDNS homepage</h4>
          </a>
...
        </div>
      </aside>
*/

let newRightSidebar = `      <!-- Right Sidebar: OllaDNS Navigation Links -->
      <aside class="recent-posts-sidebar" style="position: sticky; top: 90px; margin: 0;">
        <h3 class="recent-posts-title" style="margin-top: 0;">OLLADNS</h3>
        <div class="navigation-links" style="background: var(--bg); border: 1px solid var(--border); border-radius: 12px; padding: 0; display: flex; flex-direction: column; margin-bottom: 2.5rem;">
          <a href="https://olladns.com" style="display: block; padding: 1rem; text-decoration: none; color: var(--text-main); border-bottom: 1px solid var(--border);">
            <h4 style="margin: 0; font-size: 0.95rem; font-weight: 500; line-height: 1.4;">Return to main OllaDNS homepage</h4>
          </a>
          <a href="https://olladns.com/products" style="display: block; padding: 1rem; text-decoration: none; color: var(--text-main); border-bottom: 1px solid var(--border);">
            <h4 style="margin: 0; font-size: 0.95rem; font-weight: 500; line-height: 1.4;">Explore the protective DNS platform</h4>
          </a>
          <a href="https://olladns.com/solutions" style="display: block; padding: 1rem; text-decoration: none; color: var(--text-main);">
            <h4 style="margin: 0; font-size: 0.95rem; font-weight: 500; line-height: 1.4;">Discover industry-specific solutions</h4>
          </a>
        </div>
      </aside>`;

layoutContent = layoutContent.replace(/<!-- Right Sidebar: OllaDNS Navigation Links -->[\s\S]*?<\/aside>/, newRightSidebar);

fs.writeFileSync(layoutPath, layoutContent);
console.log('Updated sidebars to use a single box with dividers.');
