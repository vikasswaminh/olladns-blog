const fs = require('fs');
const path = require('path');

const cssToAppend = `
/* Premium Blog Component Styles */
/* Grid Cards */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}
.premium-card {
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 1.75rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.premium-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.06);
}
.card-icon {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #DA291C;
}
.premium-card h4 {
  margin: 0 0 0.75rem 0;
  font-size: 1.1rem;
}
.premium-card p {
  margin: 0;
  font-size: 0.95rem;
  color: #555;
  line-height: 1.5;
}

/* Comparison Layout */
.comparison-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2.5rem 0;
}
.comp-side {
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  overflow: hidden;
}
.comp-header {
  padding: 1.5rem;
  background: #f9fafb;
  border-bottom: 1px solid #eaeaea;
  text-align: center;
  font-weight: 600;
}
.comp-header.pro {
  background: #fdf2f2;
  color: #DA291C;
}
.comp-body {
  padding: 1.5rem;
}
.comp-body ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.comp-body li {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  position: relative;
  font-size: 0.95rem;
  color: #444;
}
.comp-body li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #ccc;
}
.comp-body.pro li::before {
  content: '✓';
  color: #DA291C;
  font-weight: bold;
}

/* Action Cards */
.action-card {
  display: flex;
  background: #fff;
  border: 1px solid #eaeaea;
  border-left: 4px solid #ccc;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}
.action-card.red { border-left-color: #DA291C; }
.action-card.green { border-left-color: #10B981; }
.action-card.yellow { border-left-color: #F59E0B; }
.action-content h4 { margin: 0 0 0.5rem 0; font-size: 1.05rem; }
.action-content p { margin: 0; font-size: 0.95rem; color: #555; }

/* Summary Box */
.summary-box {
  background: #111;
  color: #fff;
  border-radius: 16px;
  padding: 2.5rem;
  margin: 3rem 0;
}
.summary-box h3 {
  color: #fff;
  margin-top: 0;
  margin-bottom: 1.5rem;
}
.summary-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.summary-list li {
  display: flex;
  margin-bottom: 1.25rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #e5e5e5;
}
.summary-list li::before {
  content: '→';
  color: #DA291C;
  margin-right: 1rem;
  font-weight: bold;
}

/* Related Articles */
.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}
.related-card {
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  display: block;
  transition: all 0.2s;
}
.related-card:hover {
  border-color: #DA291C;
  box-shadow: 0 4px 12px rgba(218, 41, 28, 0.08);
}
.related-tag {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #DA291C;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: block;
}
.related-card h4 { margin: 0 0 0.75rem 0; font-size: 1.1rem; }
.related-card p { margin: 0; font-size: 0.9rem; color: #666; }

/* Final CTA */
.cta-block {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #fdf2f2 0%, #fff 100%);
  border-radius: 16px;
  border: 1px solid #fce8e8;
  margin: 4rem 0 2rem;
}
.cta-block h2 { margin-top: 0; font-size: 1.75rem; color: #111; }
.cta-block p { font-size: 1.1rem; color: #555; max-width: 600px; margin: 0 auto 2rem; }
.cta-button {
  display: inline-block;
  background: #DA291C;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s;
}
.cta-button:hover { background: #b71f15; color: #fff; }

@media (max-width: 768px) {
  .comparison-container { grid-template-columns: 1fr; }
}
`;

const globalCssPath = path.join(__dirname, '../src/styles/global.css');
fs.appendFileSync(globalCssPath, cssToAppend);
console.log('Appended missing CSS to global.css');
