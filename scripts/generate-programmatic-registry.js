const fs = require('fs');
const path = require('path');

const srcAppDir = path.join(__dirname, '../src/app');
const registryPath = path.join(__dirname, '../src/data/programmable-registry.json');
const sitemapIndexPath = path.join(__dirname, '../src/data/sitemap-registry.json');

// Get categories
const categories = fs.readdirSync(srcAppDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && dirent.name.startsWith('(') && dirent.name.endsWith(')'))
  .map(dirent => dirent.name);

const registry = {};
let totalTrackableCalculators = 0;

for (const cat of categories) {
  const catPath = path.join(srcAppDir, cat);
  const calculators = fs.readdirSync(catPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name.includes('-calculator') || dirent.name.includes('-converter'))
    .map(dirent => dirent.name);

  for (const calc of calculators) {
    const calcCleanName = calc.replace('-calculator', '').replace('-converter', '').replace(/-/g, ' ');
    const title = calcCleanName.charAt(0).toUpperCase() + calcCleanName.slice(1);
    
    // Assign a generic seed parameter generation based on popular numbers to bootstrap it without needing 300 human-written math files
    // E.g [1000, 5000, 10000] & [1, 5, 10]
    registry[calc] = {
      title: `${title} Tools`,
      category: cat.replace('(', '').replace(')', ''),
      parameters: {
        val1: [1000, 5000, 10000, 25000, 50000],
        val2: [1, 2, 5, 10, 15, 30]
      },
      permutations: 5 * 6 // 30 per calculator minimum
    };
    totalTrackableCalculators++;
  }
}

// Ensure dir exists
if (!fs.existsSync(path.dirname(registryPath))) {
  fs.mkdirSync(path.dirname(registryPath), { recursive: true });
}

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));

console.log(`Successfully mapped ${totalTrackableCalculators} existing calculators!`);
console.log(`Total generated SEO permutations: ${totalTrackableCalculators * 30}`);

const chunkLimit = 10000;
const totalPermutations = totalTrackableCalculators * 30;
const neededChunks = Math.ceil(totalPermutations / chunkLimit);

const sitemapRegistry = {
  totalSitemaps: neededChunks,
  calculatorsIncluded: totalTrackableCalculators
};

fs.writeFileSync(sitemapIndexPath, JSON.stringify(sitemapRegistry, null, 2));
console.log(`Sitemap Chunks allocated: ${neededChunks}`);
