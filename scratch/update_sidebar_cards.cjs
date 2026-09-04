const fs = require('fs');

let layoutPath = 'src/layouts/PostLayout.astro';
let layoutContent = fs.readFileSync(layoutPath, 'utf8');

// The layout block currently has the unified boxes:
/*
      <!-- Left Sidebar: Recent Posts -->
      <aside class="left-navigation-sidebar" style="position: sticky; top: 90px; margin: 0;">
        <h3 class="recent-posts-title" style="margin-top: 0;">ALL BLOG POSTS</h3>
        <div class="recent-posts-list" style="background: var(--bg); border: 1px solid var(--border); border-radius: 12px; padding: 0;">
*/

let newLeftSidebar = `      <!-- Left Sidebar: Recent Posts -->
      <aside class="left-navigation-sidebar" style="position: sticky; top: 90px; margin: 0;">
        <div style="margin-bottom: 1.5rem;">
          <span class="badge-accent" style="background-color: #d84594; color: white;">ALL BLOG POSTS</span>
        </div>
        <div class="recent-posts-list" style="display: flex; flex-direction: column; gap: 1rem;">
          {recentPosts.map((p) => (
            <a href={\`/\${p.slug}/\`} class="sidebar-card">
              <h4 style="margin: 0; font-size: 0.9rem; font-weight: 500; line-height: 1.5; color: var(--text-main);">{p.data.title}</h4>
            </a>
          ))}
        </div>
      </aside>`;

layoutContent = layoutContent.replace(/<!-- Left Sidebar: Recent Posts -->[\s\S]*?<\/aside>/, newLeftSidebar);

let newRightSidebar = `      <!-- Right Sidebar: OllaDNS Navigation Links -->
      <aside class="recent-posts-sidebar" style="position: sticky; top: 90px; margin: 0;">
        <div style="margin-bottom: 1.5rem;">
          <span class="badge-accent" style="background-color: #d84594; color: white;">OLLADNS</span>
        </div>
        <div class="navigation-links" style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2.5rem;">
          <a href="https://olladns.com" class="sidebar-card">
            <h4 style="margin: 0; font-size: 0.9rem; font-weight: 500; line-height: 1.5; color: var(--text-main);">Return to main OllaDNS homepage</h4>
          </a>
          <a href="https://olladns.com/products" class="sidebar-card">
            <h4 style="margin: 0; font-size: 0.9rem; font-weight: 500; line-height: 1.5; color: var(--text-main);">Explore the protective DNS platform</h4>
          </a>
          <a href="https://olladns.com/solutions" class="sidebar-card">
            <h4 style="margin: 0; font-size: 0.9rem; font-weight: 500; line-height: 1.5; color: var(--text-main);">Discover industry-specific solutions</h4>
          </a>
        </div>
      </aside>`;

layoutContent = layoutContent.replace(/<!-- Right Sidebar: OllaDNS Navigation Links -->[\s\S]*?<\/aside>/, newRightSidebar);

fs.writeFileSync(layoutPath, layoutContent);

let cssPath = 'src/styles/global.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

let sidebarCardCss = `
.sidebar-card {
  display: block;
  background: var(--bg);
  border: 1px solid color-mix(in srgb, var(--accent) 20%, var(--border));
  border-radius: 8px;
  padding: 1.25rem 1rem;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}
.sidebar-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  border-color: var(--accent);
}
`;

if (!cssContent.includes('.sidebar-card')) {
  cssContent += sidebarCardCss;
  fs.writeFileSync(cssPath, cssContent);
}

console.log('Updated sidebars to use individual pill badges and separate styled cards.');
