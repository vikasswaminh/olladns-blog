const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/content/blog/response-policy-zones-rpz-how-real-time-dns-blocking-actually-works.md');
const content = fs.readFileSync(filePath, 'utf8');

const targetStart = '<div class="workflow-container">';
// The end is the premium-text paragraph
const targetEnd = '<p class="premium-text">The critical detail that makes this workable at real world scale is that the comparison step is designed to be extremely fast. It\'s not running a query through a separate, heavyweight inspection engine. It\'s a look up against a zone using fundamentally efficient mechanisms. That\'s why a resolver applying RPZ can answer in single digit milliseconds.</p>';

const startIndex = content.indexOf(targetStart);
// Wait, there is another workflow-container later! We want the FIRST ONE.
// The targetEnd is unique.
const endIndex = content.indexOf(targetEnd) + targetEnd.length;

if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
    const replacement = `<style>
.unified-mechanism-card {
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
  margin: 3rem 0;
}
.unified-mech-header {
  text-align: center;
  font-weight: 700;
  letter-spacing: 1px;
  color: #DA291C;
  text-transform: uppercase;
  margin-bottom: 2.5rem;
  font-size: 0.95rem;
}
.unified-mech-steps {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 2.5rem;
}
.unified-mech-step {
  flex: 1;
  text-align: center;
}
.unified-mech-icon {
  width: 54px;
  height: 54px;
  background: #fdf2f2;
  color: #DA291C;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.4rem;
  margin: 0 auto 1.25rem;
}
.unified-mech-step h4 {
  margin: 0 0 0.75rem 0;
  font-size: 1.05rem;
  color: #111;
}
.unified-mech-step p {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
}
.unified-mech-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  font-size: 1.75rem;
  padding-top: 12px;
}
.unified-mech-divider {
  height: 1px;
  background: #eaeaea;
  margin: 2.5rem 0;
}
.unified-mech-explanation {
  font-size: 1rem;
  color: #444;
  line-height: 1.7;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}
@media (max-width: 768px) {
  .unified-mech-steps {
    flex-direction: column;
    align-items: center;
  }
  .unified-mech-step {
    margin-bottom: 1.5rem;
  }
  .unified-mech-arrow {
    transform: rotate(90deg);
    padding-top: 0;
    margin-bottom: 1.5rem;
  }
}
</style>

<div class="unified-mechanism-card">
  <div class="unified-mech-header">Mechanism</div>
  
  <div class="unified-mech-steps">
    <div class="unified-mech-step">
      <div class="unified-mech-icon">1</div>
      <h4>The Request</h4>
      <p>Device sends a normal DNS query.</p>
    </div>
    <div class="unified-mech-arrow">→</div>
    <div class="unified-mech-step">
      <div class="unified-mech-icon">2</div>
      <h4>RPZ Check</h4>
      <p>Resolver checks query against configured RPZs.</p>
    </div>
    <div class="unified-mech-arrow">→</div>
    <div class="unified-mech-step">
      <div class="unified-mech-icon">3</div>
      <h4>Evaluation</h4>
      <p>If a match is found, defined action takes over.</p>
    </div>
    <div class="unified-mech-arrow">→</div>
    <div class="unified-mech-step">
      <div class="unified-mech-icon">4</div>
      <h4>Enforcement</h4>
      <p>Resolver returns policy action & logs the event.</p>
    </div>
  </div>

  <div class="unified-mech-divider"></div>
  
  <div class="unified-mech-explanation">
    The critical detail that makes this workable at real world scale is that the comparison step is designed to be extremely fast. It's not running a query through a separate, heavyweight inspection engine. It's a look up against a zone using fundamentally efficient mechanisms. That's why a resolver applying RPZ can answer in single digit milliseconds.
  </div>
</div>`;

    const newContent = content.slice(0, startIndex) + replacement + content.slice(endIndex);
    fs.writeFileSync(filePath, newContent);
    console.log('Successfully replaced mechanism section.');
} else {
    console.log('Could not find start or end index.');
}
