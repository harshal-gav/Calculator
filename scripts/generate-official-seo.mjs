import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Configuration
const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
const TARGET_DIR = './src/data/seo-content/official/';
const APP_DIR = './src/app/';
const MODEL_NAME = 'gemini-1.5-pro'; // Pro for high quality/length

if (!API_KEY) {
  console.error('Error: GOOGLE_GENERATIVE_AI_API_KEY environment variable is required.');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

/**
 * Finds all "official" calculator directories in src/app
 */
function getCalculatorIds() {
  const ids = [];
  const categories = fs.readdirSync(APP_DIR).filter(f => f.startsWith('('));
  
  for (const category of categories) {
    const categoryPath = path.join(APP_DIR, category);
    const calcs = fs.readdirSync(categoryPath).filter(f => {
      const p = path.join(categoryPath, f);
      return fs.lstatSync(p).isDirectory() && fs.existsSync(path.join(p, 'page.tsx'));
    });
    ids.push(...calcs);
  }
  return [...new Set(ids)];
}

/**
 * Generates SEO content for a specific calculator
 */
async function generateSeoContent(calculatorId) {
  const prompt = `
    You are an expert SEO content strategist and a subject matter expert in mathematical tools.
    Generate a comprehensive, 5,000-word Master Guide for a calculator called "${calculatorId.replace(/-/g, ' ')}".
    
    The content must be structured as a JSON object with the following keys:
    1. "calculatorId": "${calculatorId}"
    2. "title": A catchy, SEO-optimized title (70-90 characters).
    3. "whatIsIt": A detailed explanation (1,000+ words) of the tool's history, conceptual foundation, and utility. Divide into paragraphs with double newlines.
    4. "formula": A technical breakdown (500+ words) of the mathematical logic, using LaTeX-style notation where applicable (e.g. $A = P(1+r/n)^{nt}$).
    5. "example": A detailed case study or step-by-step walkthrough (500+ words).
    6. "useCases": 5+ strategic scenarios where this tool is indispensable (800+ words).
    7. "faqs": An array of 5-10 high-quality questions and detailed answers ({ "question": "...", "answer": "..." }).
    8. "deepDive": A "Philosophy of [Topic]" or "Expert Analysis" section (1,500+ words) that explores edge cases, future trends, or advanced theory.
    9. "glossary": An array of 10+ terms ({ "term": "...", "definition": "..." }).

    CRITICAL RULES:
    - Content must be HUMAN-LIKE, authoritative, and deeply resourceful.
    - Total word count MUST be approximately 5,000 words.
    - Return ONLY the raw JSON string. Do not include markdown code blocks.
    - Ensure all double quotes inside the text are escaped or replaced with single quotes.
    - Do not use invalid JSON escape characters like \\_ (use _ instead).
    - Use double newlines (\\n\\n) for paragraph breaks within the string values.
  `;

  try {
    console.log(`Generating content for: ${calculatorId}...`);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean up response if the model included markdown blocks by accident
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    // Validate JSON
    try {
      JSON.parse(text);
    } catch (e) {
      console.error(`Error: Model returned invalid JSON for ${calculatorId}. Raw response: ${text.substring(0, 100)}...`);
      return;
    }

    const filePath = path.join(TARGET_DIR, `${calculatorId}.json`);
    fs.writeFileSync(filePath, text);
    console.log(`Success: Saved to ${filePath}`);
  } catch (error) {
    console.error(`Failed to generate ${calculatorId}:`, error.message);
  }
}

/**
 * Main execution
 */
async function main() {
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
  }

  const ids = getCalculatorIds();
  console.log(`Found ${ids.length} official calculators.`);

  for (const id of ids) {
    const filePath = path.join(TARGET_DIR, `${id}.json`);
    if (fs.existsSync(filePath)) {
      console.log(`Skipping ${id} (ALREADY EXISTS)`);
      continue;
    }
    await generateSeoContent(id);
    // Add a delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
}

main();
