const fs = require('fs');
const path = require('path');

const SRC_APP_DIR = path.join(__dirname, '..', 'src', 'app');
const PAGE_TSX = path.join(SRC_APP_DIR, 'page.tsx');
const SEO_CATEGORY_DIR = path.join(SRC_APP_DIR, '(seo)');

// 1. Gather all the generated SEO calculators
const folders = fs.readdirSync(SEO_CATEGORY_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

// Utility to format "mortgage-calculator" into "Mortgage Calculator"
function toTitleCase(str) {
    return str.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// 2. Generate the React syntax for the array
let seoCalculatorsArray = folders.map(folder => {
    return `        { name: '${toTitleCase(folder)}', path: '/${folder}', desc: 'Fast, free, and accurate ${toTitleCase(folder)}.' }`;
});

const seoCategoryBlock = `
    {
      name: 'Specialized Tools & Calculators',
      calculators: [
${seoCalculatorsArray.join(',\n')}
      ]
    }`;

// 3. Inject it into src/app/page.tsx
let pageContent = fs.readFileSync(PAGE_TSX, 'utf-8');

// Replace the array closing bracket
pageContent = pageContent.replace(
    /        \{ name: 'Standard Deviation Calculator'.*?\n.*?\]\n.*?\}\n  \];/s,
    `        { name: 'Standard Deviation Calculator', path: '/standard-deviation-calculator', desc: 'Calculate the standard deviation, variance, mean, and sum of a data set.' },\n      ]\n    },${seoCategoryBlock}\n  ];`
);

fs.writeFileSync(PAGE_TSX, pageContent);

console.log(`Successfully injected ${folders.length} specialized calculators into the homepage index!`);
