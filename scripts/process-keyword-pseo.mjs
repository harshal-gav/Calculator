import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define all CSV files to process
const CSV_FILES = [
    path.join(__dirname, '..', 'Keyword Stats 2026-04-03 at 11_55_51.csv'),
    path.join(__dirname, '..', 'calculator_keyword.csv')
].filter(f => fs.existsSync(f));

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

// 2. Mapping Logic (Token-based similarity)
function findBestCalculator(keyword) {
    const kTokens = keyword.toLowerCase().split(' ').filter(t => t.length > 2);
    let bestMatch = null;
    let highestScore = 0;

    calculatorMetadata.forEach(calc => {
        let score = 0;
        kTokens.forEach(kt => {
            if (calc.tokens.includes(kt)) score += 2;
            else {
                calc.tokens.forEach(ct => {
                    if (ct.includes(kt) || kt.includes(ct)) score += 1;
                });
            }
        });

        if (keyword.toLowerCase().includes(calc.id.replace('-calculator', ''))) {
            score += 5;
        }

        if (score > highestScore) {
            highestScore = score;
            bestMatch = calc.id;
        }
    });

    return highestScore >= 1 ? bestMatch : 'miscellaneous-calculator'; 
}

// 3. Process each CSV
let allKeywords = new Set();
let finalMapping = [];

CSV_FILES.forEach(csvFile => {
    let csvContent;
    const rawBuffer = fs.readFileSync(csvFile);
    if (rawBuffer[0] === 0xFF && rawBuffer[1] === 0xFE) {
        csvContent = rawBuffer.toString('utf16le');
    } else {
        csvContent = rawBuffer.toString('utf-8');
    }

    const lines = csvContent.split(/\r?\n/).filter(line => line.trim().length > 0);
    const keywordsRaw = lines.slice(1).map(line => line.split('\t')[0].trim()).filter(k => k.length > 0);

    keywordsRaw.forEach(keyword => {
        if (!allKeywords.has(keyword.toLowerCase())) {
            allKeywords.add(keyword.toLowerCase());
            const calculatorId = findBestCalculator(keyword);
            const slug = keyword.toLowerCase().trim().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
            finalMapping.push({
                keyword,
                calculatorId,
                slug
            });
        }
    });
});

// 4. Save
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalMapping, null, 2));

console.log(`Processing Complete!`);
console.log(`- Files processed: ${CSV_FILES.length}`);
console.log(`- Total unique keywords: ${finalMapping.length}`);
const unmappedCount = finalMapping.filter(m => m.calculatorId === 'miscellaneous-calculator').length;
console.log(`- High Confidence Matches: ${finalMapping.length - unmappedCount}`);
console.log(`- Fallback (Miscellaneous): ${unmappedCount}`);
