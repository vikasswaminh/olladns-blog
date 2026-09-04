const fs = require('fs');
const path = require('path');
const dir = './src/content/blog';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
const blogs = files.map(f => {
    const content = fs.readFileSync(path.join(dir, f), 'utf-8');
    const titleMatch = content.match(/title:\s*["'](.*?)["']/);
    const dateMatch = content.match(/pubDate:\s*(.*?)\n/);
    
    let title = titleMatch ? titleMatch[1] : 'No title';
    let dateStr = dateMatch ? dateMatch[1].trim().replace(/['"]/g, '') : null;
    let date = dateStr ? new Date(dateStr) : new Date(0);
    
    return { file: f, title: title, date: date };
});

blogs.sort((a,b) => a.date - b.date);

blogs.forEach((b, i) => {
    console.log(`${i+1}. ${b.title} (${b.date.toISOString().split('T')[0]}) [${b.file}]`);
});
