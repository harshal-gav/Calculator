const fs = require('fs');
const path = require('path');

const srcAppDir = path.join(__dirname, '../src/app');
const registryPath = path.join(__dirname, '../src/data/programmable-registry.json');
const sitemapIndexPath = path.join(__dirname, '../src/data/sitemap-registry.json');

const categories = fs.readdirSync(srcAppDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && dirent.name.startsWith('(') && dirent.name.endsWith(')'))
  .map(dirent => dirent.name);

const registry = {};
let totalTrackableCalculators = 0;

function generateRange(start, step, count) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(start + (i * step));
  }
  return arr;
}

function getHeuristicParameters(category, calcName) {
  let v1 = [];
  let v2 = [];
  
  // We need roughly 2000 combinations per calculator (2000 * 266 = 530,000 URLs).
  // So V1 length = 50, V2 length = 40. (50 * 40 = 2000)

  if (category === 'financial') {
    if (calcName.includes('loan') || calcName.includes('mortgage') || calcName.includes('emi')) {
      v1 = generateRange(10000, 10000, 50); // 10k to 500k
      v2 = generateRange(1, 1, 40); // 1 to 40 years
    } else if (calcName.includes('tax') || calcName.includes('salary')) {
      v1 = generateRange(20000, 5000, 50); // 20k to 265k income
      v2 = generateRange(1, 1, 40); // 1% to 40% deductions
    } else {
      v1 = generateRange(1000, 1000, 50); // 1k to 50k
      v2 = generateRange(1, 1, 40); 
    }
  } else if (category === 'health') {
    if (calcName.includes('bmi') || calcName.includes('bmr') || calcName.includes('calorie')) {
      v1 = generateRange(40, 2, 50); // 40kg to 138kg
      v2 = generateRange(140, 1, 40); // 140cm to 179cm
    } else {
      v1 = generateRange(10, 1, 50); // 10 to 59 age
      v2 = generateRange(1, 1, 40); 
    }
  } else if (category === 'everyday') {
    if (calcName.includes('age') || calcName.includes('dog') || calcName.includes('cat')) {
      v1 = generateRange(1, 1, 50); // 1 to 50 years
      v2 = generateRange(0, 1, 40); // 0 to 39 months (for permutations)
    } else if (calcName.includes('discount') || calcName.includes('tip')) {
      v1 = generateRange(10, 5, 50); // $10 to $255 bill
      v2 = generateRange(1, 1, 40); // 1% to 40% discount
    } else {
      v1 = generateRange(10, 20, 50);
      v2 = generateRange(1, 2, 40);
    }
  } else if (category === 'math' || category === 'science') {
    v1 = generateRange(10, 10, 50); 
    v2 = generateRange(1, 1, 40); 
  } else {
    // Universal fallback
    v1 = generateRange(1, 5, 50);
    v2 = generateRange(1, 2, 40);
  }
  
  return { val1: v1, val2: v2 };
}

for (const cat of categories) {
  const catPath = path.join(srcAppDir, cat);
  const calculators = fs.readdirSync(catPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && (dirent.name.includes('-calculator') || dirent.name.includes('-converter')))
    .map(dirent => dirent.name);

  for (const calc of calculators) {
    const calcCleanName = calc.replace('-calculator', '').replace('-converter', '').replace(/-/g, ' ');
    const title = calcCleanName.charAt(0).toUpperCase() + calcCleanName.slice(1);
    
    const categoryClean = cat.replace('(', '').replace(')', '');
    const { val1, val2 } = getHeuristicParameters(categoryClean, calc);
    
    registry[calc] = {
      title: `${title} Tools`,
      category: categoryClean,
      parameters: { val1, val2 },
      permutations: val1.length * val2.length
    };
    totalTrackableCalculators++;
  }
}

if (!fs.existsSync(path.dirname(registryPath))) fs.mkdirSync(path.dirname(registryPath), { recursive: true });
fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));

console.log(`Successfully mapped ${totalTrackableCalculators} calculators!`);

const chunkLimit = 10000;
let totalPermutations = Object.values(registry).reduce((acc, curr) => acc + curr.permutations, 0);
console.log(`Total generated SEO permutations: ${totalPermutations}`);

const neededChunks = Math.ceil(totalPermutations / chunkLimit);
fs.writeFileSync(sitemapIndexPath, JSON.stringify({ totalSitemaps: neededChunks, calculatorsIncluded: totalTrackableCalculators }, null, 2));
console.log(`Sitemap Chunks allocated: ${neededChunks}`);
