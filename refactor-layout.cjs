const fs = require('fs');
const file = 'src/content/blog/dns-security-automation-how-to-manage-dns-policies-as-code.md';
let content = fs.readFileSync(file, 'utf8');

// 1. Clean out custom CSS blocks
content = content.replace(/<style>[\s\S]*?<\/style>\s*/g, '');

// 2. Convert Key Takeaways feature-grid to grid-list
content = content.replace(/<div class="feature-grid">[\s\S]*?<\/div>\s*<\/div>\s*<!-- this closes \.feature-grid -->/g, function(match) {
  return match; // We'll rewrite this manually below to ensure it's clean
});

// Let's just do targeted replacements for the layouts I added.

// 2.1 Remove alert box
content = content.replace(
  /<div class="alert-box">[\s\S]*?<p style="margin:0;"><strong>⚠️ PITFALL TO AVOID:<\/strong> ([\s\S]*?)<\/p>\s*<\/div>/g,
  '$1'
);

// 2.2 Remove callout boxes
content = content.replace(
  /<div class="callout-box">\s*<p>(.*?)<\/p>\s*<\/div>/g,
  '$1'
);

// 2.3 Remove Comparison Grid
content = content.replace(
  /<div class="comparison-grid">[\s\S]*?<\/div>\s*The automation tool figures out what needs to change to make reality match that description, and only changes what's necessary./g,
  `An imperative approach is a list of steps. Click here, then here, add this domain, then that one, toggle this setting. It describes a process. A declarative approach instead describes an end state. It says, in effect, "this policy should have exactly these blocklist entries, this category configuration, and these site assignments," without specifying the individual steps needed to get there. The automation tool figures out what needs to change to make reality match that description, and only changes what's necessary.`
);

// 2.4 Revert Stack Diagram
content = content.replace(
  /<div class="stack-diagram">[\s\S]*?<\/div>/g,
  `#### 🔌 A DNS security platform with a real API\n\nEverything downstream depends on this. If your DNS security provider only exposes a web console with no programmatic way to read or write policy, none of what follows is possible. A REST API covering policies, blocklists, sites, identity mappings, and integrations is the foundation everything else builds on.\n\n#### 🏗️ An infrastructure as code provider\n\nMost commonly a Terraform provider purpose built for the platform, translating structured configuration files into API calls, tracking state, and calculating exactly what needs to change between the current live configuration and the one described in your files.\n\n#### 🗄️ A version control repository\n\nWhere your policy configuration files live, usually the same platform your engineering team already uses. This is what gives you history, blame, branches, and pull requests for policy changes, the same tooling already trusted for application code.\n\n#### 🤖 A CI/CD pipeline\n\nThe automation layer that runs a plan on every proposed change, requires approval before anything gets applied, and executes the apply step once approved, removing manual, and hoc application of policy changes entirely from the equation.\n\n#### 🔍 Drift detection\n\nA scheduled or continuous check comparing the live state of your DNS security platform against what your configuration files say should be, flagging any divergence so it can be investigated and either reconciled into code or explicitly reverted.\n\n#### 🧠 Threat intelligence and identity integrations\n\nThe upstream and downstream connections, threat feeds that can trigger automated policy updates, and identity providers like Entra ID, Okta, or Google Workspace that let policy be expressed in terms of users and groups rather than static IP ranges.`
);

// 2.5 Key Takeaways Grid List
// I need to parse out the grid-feature-cards and put them in <li><span><strong>Title:</strong> Description</span></li>
const takeawaysRegex = /<div class="feature-grid">\s*<div class="grid-feature-card">\s*<div class="grid-feature-card-header">\s*<span class="feature-num">01<\/span>\s*<h4>(.*?)<\/h4>\s*<\/div>\s*<p>(.*?)<\/p>\s*<\/div>[\s\S]*?<div class="grid-feature-card">\s*<div class="grid-feature-card-header">\s*<span class="feature-num">02<\/span>\s*<h4>(.*?)<\/h4>\s*<\/div>\s*<p>(.*?)<\/p>\s*<\/div>[\s\S]*?<div class="grid-feature-card">\s*<div class="grid-feature-card-header">\s*<span class="feature-num">03<\/span>\s*<h4>(.*?)<\/h4>\s*<\/div>\s*<p>(.*?)<\/p>\s*<\/div>[\s\S]*?<div class="grid-feature-card">\s*<div class="grid-feature-card-header">\s*<span class="feature-num">04<\/span>\s*<h4>(.*?)<\/h4>\s*<\/div>\s*<p>(.*?)<\/p>\s*<\/div>[\s\S]*?<div class="grid-feature-card">\s*<div class="grid-feature-card-header">\s*<span class="feature-num">05<\/span>\s*<h4>(.*?)<\/h4>\s*<\/div>\s*<p>(.*?)<\/p>\s*<\/div>\s*<\/div>/;

content = content.replace(takeawaysRegex, function(match, t1, d1, t2, d2, t3, d3, t4, d4, t5, d5) {
  return `<ul class="grid-list">
  <li><span><strong>${t1}:</strong> ${d1}</span></li>
  <li><span><strong>${t2}:</strong> ${d2}</span></li>
  <li><span><strong>${t3}:</strong> ${d3}</span></li>
  <li><span><strong>${t4}:</strong> ${d4}</span></li>
  <li><span><strong>${t5}:</strong> ${d5}</span></li>
</ul>`;
});

// Also remove `<!-- this closes ...` comments that I added before just to be clean
content = content.replace(/<!-- this closes.*?-->/g, '');

// 3. Add Numbers to Headings
let counter = 1;
content = content.replace(/\n## (.*?)\n/g, function(match, p1) {
  if (p1.includes('The Console Nobody Trusts Anymore')) {
    counter = 1;
  } else if (p1.includes('Bringing It All Together')) {
    // maybe no number for the conclusion? dns-filtering-explained uses a number for the last one too.
    // wait, actually let's see.
  }
  const numStr = counter.toString().padStart(2, '0');
  counter++;
  return `\n\n${numStr}\n\n## ${p1}\n`;
});

// 4. CI/CD flow with down arrows
// Let's manually replace the "The sequence generally looks like this..." paragraph with a structured step list.
const cicdOld = `The sequence generally looks like this. A change is proposed, as a pull request against the policy repository, describing a specific, intentional modification, tightening a category filter, adding a site, updating an identity group mapping, whatever it is. A pipeline automatically runs a plan against that proposed change, calculating precisely what would be added, removed, or modified in the live environment if it were applied, without applying anything yet. That plan output gets attached to the pull request, in plain, human readable terms, so a reviewer can see exactly what's about to change before approving anything.

A teammate reviews the proposed change and the calculated plan together, the same way they'd review any other infrastructure change, checking that the diff matches the stated intent and that nothing unexpected is bundled into the same change. Once approved and merged, the pipeline runs the apply step automatically, making the actual change against the live platform, and records the outcome. The whole sequence, from proposal to applied change, leaves a complete, permanent record.`;

const cicdNew = `#### Propose Change
A change is proposed as a pull request against the policy repository, describing a specific, intentional modification (tightening a category, adding a site, updating an identity group mapping).

↓

#### Plan
A pipeline automatically runs a plan against that proposed change, calculating precisely what would be added, removed, or modified in the live environment if it were applied, without applying anything yet. That plan output gets attached to the pull request.

↓

#### Review
A teammate reviews the proposed change and the calculated plan together, checking that the diff matches the stated intent and that nothing unexpected is bundled into the same change.

↓

#### Apply
Once approved and merged, the pipeline runs the apply step automatically, making the actual change against the live platform, and records the outcome.`;

content = content.replace(cicdOld, cicdNew);

fs.writeFileSync(file, content);
console.log('Done refactoring');
