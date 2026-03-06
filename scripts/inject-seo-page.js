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
            // Absolute final catchall
            buckets.get('scientific-calculator')?.add(keyword);
            mapped = true;
        }
    }

    if (!mapped) buckets.get('scientific-calculator')?.add(keyword);
});

// 4. Inject into page.tsx CalculatorSEO whatIsIt prop
let updatedCount = 0;

buckets.forEach((keywordSet, folder) => {
    if (keywordSet.size === 0) return;

    // Pick the top 20 keywords maximum to avoid crazy bloat on the DOM, or just 10
    const keywordsArray = Array.from(keywordSet).slice(0, 15);
    const folderPath = existingCalculators.get(folder);
    if (!folderPath) return;

    const pagePath = path.join(folderPath, 'page.tsx');
    if (fs.existsSync(pagePath)) {
        let content = fs.readFileSync(pagePath, 'utf-8');

        // We look for whatIsIt={  <> .... </> } and insert a <p> right before the </>
        // Basic regex approach assuming whatIsIt always uses a Fragment <> </>.

        // Skip if already injected
        if (content.includes('className="mt-4 text-sm text-gray-500"><strong>Related Terms:</strong>')) {
            return;
        }

        const relatedTermsHtml = `\n                        <p className="mt-4 text-sm text-gray-500"><strong>Related Terms:</strong> ${keywordsArray.map(k => k.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')).join(', ')}</p>\n                    `;

        // We find the </p> inside whatIsIt component or just the closing </> tag of the whatIsIt block.
        // It's safer to just inject it right before `</>` in the whatIsIt block.
        // Regex: (whatIsIt=\{\s*<>\s*([\s\S]*?))(</>)
        const match = content.match(/(whatIsIt=\{\s*<>\s*[\s\S]*?)(<\/>)/);

        if (match) {
            content = content.replace(/(whatIsIt=\{\s*<>\s*[\s\S]*?)(<\/>)/, `$1${relatedTermsHtml}$2`);
            fs.writeFileSync(pagePath, content);
            updatedCount++;
        }
    }
});

console.log(`\nDONE! Execution Summary:`);
console.log(`- Successfully injected USA SEO related terms UI into the whatIsIt block of ${updatedCount} existing calculator page.tsx layouts.`);
