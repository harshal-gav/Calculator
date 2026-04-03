import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSV_FILE = path.join(__dirname, '..', 'Keyword Stats 2026-04-03 at 11_55_51.csv');
const REGISTRY_FILE = path.join(__dirname, '..', 'src', 'data', 'programmable-registry.json');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'keyword-mapping.json');

// 1. Load Registry
const registry = JSON.parse(fs.readFileSync(REGISTRY_FILE, 'utf-8'));
const calculatorIds = Object.keys(registry);
const calculatorMetadata = calculatorIds.map(id => ({
    id,
    title: registry[id].title.toLowerCase(),
    tokens: [...new Set([
        ...id.split('-'),
        ...registry[id].title.toLowerCase().split(' '),
        registry[id].category
    ])].filter(t => t.length > 2)
}));

// 2. Parse CSV (Handling UTF-16LE or UTF-8)
let csvContent;
try {
    const rawBuffer = fs.readFileSync(CSV_FILE);
    // Detect UTF-16LE by checking for null bytes or BOM
    if (rawBuffer[0] === 0xFF && rawBuffer[1] === 0xFE) {
        csvContent = rawBuffer.toString('utf16le');
    } else {
        csvContent = rawBuffer.toString('utf-8');
    }
} catch (e) {
    console.error("Could not read CSV file:", e);
    process.exit(1);
}

const lines = csvContent.split(/\r?\n/).filter(line => line.trim().length > 0);
const headers = lines[0].split('\t'); // Usually tab-separated from Google
const keywordsRaw = lines.slice(1).map(line => line.split('\t')[0].trim()).filter(k => k.length > 0);

console.log(`Found ${keywordsRaw.length} keywords in CSV.`);

// 3. Mapping Logic (Token-based similarity)
function findBestCalculator(keyword) {
    const kTokens = keyword.toLowerCase().split(' ').filter(t => t.length > 2);
    let bestMatch = null;
    let highestScore = 0;

    calculatorMetadata.forEach(calc => {
        let score = 0;
        kTokens.forEach(kt => {
            if (calc.tokens.includes(kt)) score += 2;
            else {
                // Partial match
                calc.tokens.forEach(ct => {
                    if (ct.includes(kt) || kt.includes(ct)) score += 1;
                });
            }
        });

        // Boost if the ID is actually in the keyword
        if (keyword.toLowerCase().includes(calc.id.replace('-calculator', ''))) {
            score += 5;
        }

        if (score > highestScore) {
            highestScore = score;
            bestMatch = calc.id;
        }
    });

    // Fallback if no good match
    return highestScore >= 1 ? bestMatch : 'miscellaneous-calculator'; 
}

// 4. Generate Mapping
const mapping = keywordsRaw.map(keyword => {
    const calculatorId = findBestCalculator(keyword);
    const slug = keyword.toLowerCase().trim().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
    return {
        keyword,
        calculatorId,
        slug
    };
});

// 5. Save
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(mapping, null, 2));

console.log(`Mapping Complete! Saved ${mapping.length} entries to ${OUTPUT_FILE}`);
const unmappedCount = mapping.filter(m => m.calculatorId === 'miscellaneous-calculator').length;
console.log(`- High Confidence Matches: ${mapping.length - unmappedCount}`);
console.log(`- Fallback (Miscellaneous): ${unmappedCount}`);
