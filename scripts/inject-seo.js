const fs = require('fs');
const path = require('path');

const KEYWORDS_FILE = path.join(__dirname, 'keywords-usa.json');
const SRC_APP_DIR = path.join(__dirname, '..', 'src', 'app');
const CATEGORIES = ['(everyday)', '(financial)', '(health)', '(math)'];

// 1. Load the keywords
const keywordsList = JSON.parse(fs.readFileSync(KEYWORDS_FILE, 'utf-8'));

// 2. Discover existing calculators
const existingCalculators = new Map();

CATEGORIES.forEach(category => {
    const categoryPath = path.join(SRC_APP_DIR, category);
    if (fs.existsSync(categoryPath)) {
        const folders = fs.readdirSync(categoryPath, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        folders.forEach(folder => {
            existingCalculators.set(folder, path.join(categoryPath, folder));
        });
    }
});

const SEO_MAPPINGS = {
    'mortgage-calculator': ['mortgage', 'refinance', 'closing cost', 'home loan', 'equity', 'heloc', 'fha', 'va ', 'chase ', 'house', 'pmi '],
    'auto-loan-calculator': ['car ', 'auto ', 'vehicle'],
    'payment-calculator': ['payment', 'repayment', 'payoff'],
    'tax-calculator': ['tax', 'refund', 'irs', 'w4', 'paye', 'withholding'],
    'investment-calculator': ['investment', 'roi', 'cagr', 'growth', 'share ', 'stock '],
    'compound-interest-calculator': ['compound', 'apy', 'deposit', 'cd '],
    'retirement-calculator': ['retirement', 'ira', '401k', 'pension', 'social security', 'fers', 'tsp', 'superannuation'],
    'salary-calculator': ['salary', 'paycheck', 'income', 'wage', 'pay rate', 'take home', 'hourly', 'gross '],
    'bmi-calculator': ['bmi', 'body mass index', 'body index'],
    'bmr-calculator': ['bmr', 'basal metabolic', 'metabolic rate'],
    'calorie-calculator': ['calorie', 'tdee', 'macro', 'protein', 'keto', 'diet', 'iifym'],
    'pregnancy-calculator': ['gestational', 'due date', 'birth'],
    'fraction-calculator': ['fraction'],
    'scientific-calculator': ['scientific', 'casio', 'ti ', 'ti-', 'adding machine', 'graphing', 'mathpapa', 'desmos', 'hp '],
    'age-calculator': ['age', 'dob', 'date of birth', 'calendar '],
    'time-card-calculator': ['time card', 'time sheet', 'payroll', 'hour'],
    'percentage-calculator': ['percentage', 'percent'],
    'margin-calculator': ['margin', 'markup'],
    'amortization-calculator': ['amortization'],
    'debt-payoff-calculator': ['debt', 'dti '],
    'area-calculator': ['area', 'acre', 'sq ', 'square', 'feet', 'yard', 'ft'],
    'volume-calculator': ['volume', 'gallon', 'liter', 'ml', 'cubic'],
    'length-converter': ['length', 'mile', 'inch', 'meter', 'kilometer', 'km '],
    'speed-converter': ['speed', 'pace', 'mph '],
    'weight-converter': ['weight', 'pound', 'kg', 'stone', 'lbs '],
    'distance-calculator': ['distance', 'map'],
    'probability-calculator': ['probability', 'odds'],
    'standard-deviation-calculator': ['deviation', 'variance'],
    'lcm-calculator': ['lcm', 'multiple'],
    'gcf-calculator': ['gcf', 'gcd', 'factor'],
    'binary-calculator': ['binary', 'hex', 'byte', 'complement'],
    'random-number-generator': ['random', 'dice', 'generator'],
    'discount-calculator': ['discount', 'sale', 'off '],
    'tip-calculator': ['tip', 'bill'],
};

// 3. Bucket the keywords
const buckets = new Map();
existingCalculators.forEach((val, key) => buckets.set(key, new Set()));
const unmapped = new Set();

keywordsList.forEach(keyword => {
    const kw = keyword.toLowerCase();
    let mapped = false;

    // Exact match first
    const exactFolder = kw.replace(/ /g, '-');
    if (buckets.has(exactFolder)) {
        buckets.get(exactFolder).add(keyword);
        mapped = true;
    } else {
        // Fuzzy map based on root terms
        for (const [folder, roots] of Object.entries(SEO_MAPPINGS)) {
            if (buckets.has(folder) && roots.some(root => kw.includes(root))) {
                buckets.get(folder).add(keyword);
                mapped = true;
                break;
            }
        }
    }

    // Fallback 1: Broad Terms
    if (!mapped) {
        if (kw.includes('loan') || kw.includes('borrow')) {
            buckets.get('payment-calculator')?.add(keyword);
            mapped = true;
        } else if (kw.includes('interest') || kw.includes('rate') || kw.includes('yield')) {
            buckets.get('interest-rate-calculator')?.add(keyword);
            mapped = true;
        } else if (kw.includes('math') || kw.includes('equation') || kw.includes('solve')) {
            buckets.get('scientific-calculator')?.add(keyword);
            mapped = true;
        } else if (kw.includes('converter') || kw.includes('conversion')) {
            buckets.get('data-converter')?.add(keyword); // Assuming data-converter as a generic catchall
            mapped = true;
        } else if (kw.includes('formula')) {
            buckets.get('scientific-calculator')?.add(keyword);
            mapped = true;
        } else if (kw.includes('date') || kw.includes('day') || kw.includes('time') || kw.includes('month') || kw.includes('year')) {
            buckets.get('date-calculator')?.add(keyword);
            mapped = true;
        } else if (kw.includes('body') || kw.includes('fat') || kw.includes('ideal')) {
            buckets.get('bmi-calculator')?.add(keyword);
            mapped = true;
        } else if (kw.includes('calculator')) {
            // Absolute final catchall: if it has the word calculator, dump it into the main default calculators so it indexes
            buckets.get('scientific-calculator')?.add(keyword);
            mapped = true;
        }
    }

    if (!mapped) {
        // Ultimate final catchall for any rogue terms (e.g. "curta", "adding machine")
        buckets.get('scientific-calculator')?.add(keyword);
    }
});

// 4. Inject into layout.tsx
let updatedCount = 0;

buckets.forEach((keywordSet, folder) => {
    if (keywordSet.size === 0) return;

    const keywordsArray = Array.from(keywordSet);
    const folderPath = existingCalculators.get(folder);
    if (!folderPath) return;

    const layoutPath = path.join(folderPath, 'layout.tsx');
    if (fs.existsSync(layoutPath)) {
        let content = fs.readFileSync(layoutPath, 'utf-8');

        const keywordsMatch = content.match(/keywords:\s*\[(.*?)\]/s);

        if (keywordsMatch) {
            const existingKWs = keywordsMatch[1].replace(/['"]/g, '').split(',').map(k => k.trim()).filter(k => k);
            const combined = [...new Set([...existingKWs, ...keywordsArray])];
            const newArrayStr = `keywords: [\n${combined.map(k => `        '${k.replace(/'/g, "\\'")}'`).join(',\n')}\n    ]`;
            content = content.replace(/keywords:\s*\[.*?\]/s, newArrayStr);
        } else {
            const keywordsStr = `,\n    keywords: [\n${keywordsArray.map(k => `        '${k.replace(/'/g, "\\'")}'`).join(',\n')}\n    ]`;
            if (content.match(/(description:.*?['"],)/)) {
                content = content.replace(/(description:.*?['"],)/, `$1${keywordsStr}`);
            } else {
                content = content.replace(/(title:.*?['"],?)/, `$1${keywordsStr}`);
            }
        }

        fs.writeFileSync(layoutPath, content);
        updatedCount++;
    }
});

console.log(`\nDONE! Execution Summary:`);
console.log(`- Successfully injected ALL USA SEO keyword arrays into ${updatedCount} existing calculator layouts.`);
