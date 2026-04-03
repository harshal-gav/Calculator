import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define CSV files separately to maintain separate mapping files
const CSV_SOURCES = [
    { 
        file: path.join(__dirname, '..', 'Keyword Stats 2026-04-03 at 11_55_51.csv'), 
        output: path.join(__dirname, '..', 'src', 'data', 'keyword-mapping-0.json') 
    },
    { 
        file: path.join(__dirname, '..', 'calculator_keyword.csv'), 
        output: path.join(__dirname, '..', 'src', 'data', 'keyword-mapping-1.json') 
    }
];

const REGISTRY_FILE = path.join(__dirname, '..', 'src', 'data', 'programmable-registry.json');

// 1. Load Registry Metadata once
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

// 2. Mapping Logic
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

// 3. Process each Source independently
CSV_SOURCES.forEach(source => {
    if (!fs.existsSync(source.file)) return;

    let csvContent;
    const rawBuffer = fs.readFileSync(source.file);
    if (rawBuffer[0] === 0xFF && rawBuffer[1] === 0xFE) {
        csvContent = rawBuffer.toString('utf16le');
    } else {
        csvContent = rawBuffer.toString('utf-8');
    }

    const lines = csvContent.split(/\r?\n/).filter(line => line.trim().length > 0);
    const keywordsRaw = lines.slice(1).map(line => line.split('\t')[0].trim()).filter(k => k.length > 0);

    const mapping = keywordsRaw.map(keyword => {
        const calculatorId = findBestCalculator(keyword);
        const slug = keyword.toLowerCase().trim().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
        return { keyword, calculatorId, slug };
    });

    fs.writeFileSync(source.output, JSON.stringify(mapping, null, 2));
    console.log(`Processed ${source.file} -> ${source.output} (${mapping.length} keywords)`);
});
