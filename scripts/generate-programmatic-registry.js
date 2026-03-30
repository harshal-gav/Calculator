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

// Heuristic parameter generation based on category & name
function getHeuristicParameters(category, calcName) {
  let v1 = [];
  let v2 = [];
  
  if (category === 'financial') {
    if (calcName.includes('loan') || calcName.includes('mortgage') || calcName.includes('emi')) {
      v1 = [50000, 100000, 250000, 500000, 1000000]; // Principal amounts
      v2 = [5, 10, 15, 20, 30]; // Years
    } else if (calcName.includes('tax') || calcName.includes('salary')) {
      v1 = [30000, 50000, 75000, 100000, 150000]; // Income
      v2 = [0, 5, 10, 20]; // Deductions / Rates
    } else {
      v1 = [1000, 5000, 10000, 20000, 50000]; // Standard Investment
      v2 = [1, 2, 3, 5, 10]; // Years
    }
  } else if (category === 'health') {
    if (calcName.includes('bmi') || calcName.includes('bmr') || calcName.includes('calorie')) {
      v1 = [50, 60, 70, 80, 90, 100]; // Weight in Kg
      v2 = [150, 160, 170, 180, 190]; // Height in Cm
    } else {
      v1 = [20, 30, 40, 50, 60]; // Age etc
      v2 = [1, 2, 3, 4, 5]; 
    }
  } else if (category === 'everyday') {
    if (calcName.includes('age') || calcName.includes('dog') || calcName.includes('cat')) {
      v1 = [1, 5, 10, 15, 20]; // Years
      v2 = [0, 1, 6, 12]; // Months
    } else if (calcName.includes('discount') || calcName.includes('tip')) {
      v1 = [10, 50, 100, 500, 1000]; // Bill amounts
      v2 = [5, 10, 15, 20, 25]; // Percentages
    } else {
      v1 = [10, 20, 50, 100];
      v2 = [1, 5, 10];
    }
  } else if (category === 'math' || category === 'science') {
    v1 = [1, 10, 25, 50, 100]; // generic sequences
    v2 = [2, 5, 10, 20]; 
  } else {
    // Universal fallback
    v1 = [10, 50, 100, 500];
    v2 = [1, 2, 5, 10];
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
      parameters: {
        val1: val1,
        val2: val2
      },
      permutations: val1.length * val2.length
    };
    totalTrackableCalculators++;
  }
}

// Ensure dir exists
if (!fs.existsSync(path.dirname(registryPath))) {
  fs.mkdirSync(path.dirname(registryPath), { recursive: true });
}

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));

console.log(`Successfully mapped ${totalTrackableCalculators} categorised & heuristic calculators!`);

const chunkLimit = 10000;
let totalPermutations = Object.values(registry).reduce((acc, curr) => acc + curr.permutations, 0);

console.log(`Total generated SEO permutations: ${totalPermutations}`);

const neededChunks = Math.ceil(totalPermutations / chunkLimit);

const sitemapRegistry = {
  totalSitemaps: neededChunks,
  calculatorsIncluded: totalTrackableCalculators
};

fs.writeFileSync(sitemapIndexPath, JSON.stringify(sitemapRegistry, null, 2));
console.log(`Sitemap Chunks allocated: ${neededChunks}`);
