const fs = require('fs');

// 1. Update global.css to use 2 columns instead of 3
let cssPath = 'src/styles/global.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Replace 3-column layout with 2-column layout
cssContent = cssContent.replace(
  'grid-template-columns: 240px minmax(0, 1fr) 260px;',
  'grid-template-columns: 260px minmax(0, 1fr);'
);

fs.writeFileSync(cssPath, cssContent);
console.log('Updated global.css to 2-column layout.');


// 2. Update PostLayout.astro
let layoutPath = 'src/layouts/PostLayout.astro';
let layoutContent = fs.readFileSync(layoutPath, 'utf8');

// Remove the import for TableOfContents
layoutContent = layoutContent.replace("import TableOfContents from '../components/TableOfContents.astro';\n", "");

// The layout content block looks like this:
/*
    <div class="post-content-layout">
      {headings && headings.length > 0 && <TableOfContents headings={headings} />}
      <div class="prose">
        <slot />
      </div>
      <aside class="recent-posts-sidebar">
        <h3 class="recent-posts-title">RECENT POSTS</h3>
        <div class="recent-posts-list">
          {recentPosts.map(p => (
            <a href={`/${p.slug}/`} class="recent-post-card">
              <h4>{p.data.title}</h4>
            </a>
          ))}
        </div>
      </aside>
    </div>
*/

let newSidebar = `
      <aside class="left-navigation-sidebar" style="position: sticky; top: 90px; margin: 0;">
        <h3 class="recent-posts-title" style="margin-top: 0;">OLLADNS</h3>
        <div class="navigation-links" style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2.5rem;">
          <a href="https://olladns.com" class="recent-post-card" style="text-decoration: none; display: block; border-left: 3px solid transparent; padding: 0.75rem 1rem;">
            <h4 style="margin: 0; font-size: 0.95rem;">Home</h4>
          </a>
          <a href="https://olladns.com/products" class="recent-post-card" style="text-decoration: none; display: block; border-left: 3px solid transparent; padding: 0.75rem 1rem;">
            <h4 style="margin: 0; font-size: 0.95rem;">Products</h4>
          </a>
          <a href="https://olladns.com/solutions" class="recent-post-card" style="text-decoration: none; display: block; border-left: 3px solid transparent; padding: 0.75rem 1rem;">
            <h4 style="margin: 0; font-size: 0.95rem;">Solutions</h4>
          </a>
        </div>

        <h3 class="recent-posts-title">RECENT POSTS</h3>
        <div class="recent-posts-list">
          {recentPosts.map(p => (
            <a href={\`/\${p.slug}/\`} class="recent-post-card">
              <h4>{p.data.title}</h4>
            </a>
          ))}
        </div>
      </aside>
`;

let oldLayoutBlock = /<div class="post-content-layout">[\s\S]*?<\/div>\s*<\/article>/;
let newLayoutBlock = `<div class="post-content-layout">
${newSidebar}
      <div class="prose">
        <slot />
      </div>
    </div>
  </article>`;

layoutContent = layoutContent.replace(oldLayoutBlock, newLayoutBlock);
fs.writeFileSync(layoutPath, layoutContent);
console.log('Updated PostLayout.astro layout.');
