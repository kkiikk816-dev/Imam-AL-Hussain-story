const fs = require('fs');
const content = fs.readFileSync('src/data/martyrs.ts', 'utf-8');
const names = [...content.matchAll(/name:\s*"([^"]+)"/g)].map(m => m[1]);
console.log(names);
