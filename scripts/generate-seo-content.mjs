import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const APP_DIR = path.join(ROOT_DIR, 'src/app');

// Extract API Key
const envContent = fs.readFileSync(path.join(ROOT_DIR, '.env.local'), 'utf-8');
const keyMatch = envContent.match(/GOOGLE_GEMINI_API_KEY=(.+)/);
if (!keyMatch) {
  console.error("❌ GOOGLE_GEMINI_API_KEY not found in .env.local");
  process.exit(1);
}
const API_KEY = keyMatch[1].trim();
const genAI = new GoogleGenerativeAI(API_KEY);

// SCHEMAS
const textSchema = {
  type: SchemaType.OBJECT,
  properties: {
    content: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING }, description: "Minimum 15-20 very long paragraphs." }
  },
  required: ["content"]
};

const practicalSchema = {
  type: SchemaType.OBJECT,
  properties: {
    useCases: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING }, description: "15 detailed use cases." },
    faqs: { 
      type: SchemaType.ARRAY, 
      items: { 
        type: SchemaType.OBJECT, 
        properties: { question: { type: SchemaType.STRING }, answer: { type: SchemaType.STRING } } 
      },
      description: "15 exhaustive FAQs with multi-paragraph answers."
    }
  },
  required: ["useCases", "faqs"]
};

const glossarySchema = {
  type: SchemaType.OBJECT,
  properties: {
    terms: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: { term: { type: SchemaType.STRING }, definition: { type: SchemaType.STRING } }
      },
      description: "25+ technical terms and definitions."
    }
  },
  required: ["terms"]
};

const metadataSchema = {
  type: SchemaType.OBJECT,
  properties: {
    related: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: { name: { type: SchemaType.STRING }, desc: { type: SchemaType.STRING } }
      }
    }
  },
  required: ["related"]
};

// HELPERS
async function callGemini(prompt, schema) {
  const model = genAI.getGenerativeModel({
    model: "gemini-flash-latest",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
      temperature: 0.9,
    }
  });

  try {
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch (e) {
    console.error("❌ Gemini Error:", e.message);
    return null;
  }
}

async function generate10kWords(calculatorName) {
  console.log(`\n💎 STARTING 10,000+ WORD MISSION FOR: ${calculatorName}`);
  
  console.log("  [1/6] Phase: Evolutionary Theory & Philosophy (2,000 words)...");
  const intro = await callGemini(`Write a 2000-word academic introduction for "${calculatorName}". Cover history, logic, and societal impact. No markdown.`, textSchema);
  
  console.log("  [2/6] Phase: Mathematical & Algorithmic Sovereignty (2,000 words)...");
  const technical = await callGemini(`Explain the math of "${calculatorName}" over 15 paragraphs and 5 detailed examples. No markdown.`, textSchema);
  
  console.log("  [3/6] Phase: Industrial Use Cases & Expert FAQ (2,000 words)...");
  const practical = await callGemini(`Identify 15 pro use cases and 15 complex FAQs for "${calculatorName}". No markdown.`, practicalSchema);
  
  console.log("  [4/6] Phase: Comprehensive Glossary (1,500 words)...");
  const glossary = await callGemini(`Define 25+ technical terms related to "${calculatorName}". No markdown.`, glossarySchema);
  
  console.log("  [5/6] Phase: The Mega Deep Dive Analysis (3,000 words)...");
  const deepDive = await callGemini(`Write a 3000-word expert analysis on the future, limitations, and advanced strategies of "${calculatorName}". No markdown.`, textSchema);

  console.log("  [6/6] Phase: Connectivity Metadata...");
  const metadata = await callGemini(`Suggest 4 related tools for "${calculatorName}".`, metadataSchema);

  if (!intro || !technical || !practical || !glossary || !deepDive || !metadata) return null;

  return {
    whatIsIt: intro.content,
    formula: technical.content,
    useCases: practical.useCases,
    faqs: practical.faqs,
    glossary: glossary.terms,
    deepDive: deepDive.content,
    related: metadata.related
  };
}

function buildJSX(title, data) {
  const wrapP = (arr) => (arr || []).map(p => `            <p>${p.replace(/'/g, "&apos;").replace(/"/g, "&quot;")}</p>`).join('\n');
  const wrapU = (arr) => (arr || []).map(u => `            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm transition-hover hover:border-indigo-200">\n              <p className="text-slate-700 font-medium leading-relaxed">${u.replace(/'/g, "&apos;").replace(/"/g, "&quot;")}</p>\n            </div>`).join('\n');
  
  const faqs = (data.faqs || []).map(f => `          {
            question: "${f.question.replace(/"/g, '\\"')}",
            answer: "${f.answer.replace(/"/g, '\\"')}",
          }`).join(',\n');
          
  const glossary = (data.glossary || []).map(g => `          {
            term: "${g.term.replace(/"/g, '\\"')}",
            definition: "${g.definition.replace(/"/g, '\\"')}",
          }`).join(',\n');

  const related = (data.related || []).map(r => `          {
            name: "${r.name.replace(/"/g, '\\"')}",
            path: "/${r.name.toLowerCase().replace(/\s+/g, '-')}/",
            desc: "${r.desc.replace(/"/g, '\\"')}",
          }`).join(',\n');

  return `<CalculatorSEO
        title="${title}"
        whatIsIt={
          <>
${wrapP(data.whatIsIt)}
          </>
        }
        formula={
          <>
${wrapP(data.formula)}
          </>
        }
        example={
          <>
            <p>See our detailed examples and mathematical walkthroughs above in the Technical section.</p>
          </>
        }
        useCases={
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
${wrapU(data.useCases)}
          </div>
        }
        faqs={[
${faqs}
        ]}
        glossary={[
${glossary}
        ]}
        deepDive={
          <>
${wrapP(data.deepDive)}
          </>
        }
        relatedCalculators={[
${related}
        ]}
      />`;
}

// MAIN LOOP (same as before but using the new generate10kWords)
async function run() {
  const pages = fs.readdirSync(APP_DIR, { recursive: true })
    .filter(f => f.endsWith('page.tsx'))
    .map(f => path.join(APP_DIR, f))
    .filter(f => fs.readFileSync(f, 'utf-8').includes('<CalculatorSEO'));

  for (const pagePath of pages) {
    let content = fs.readFileSync(pagePath, 'utf-8');
    const wordCount = content.split(/\s+/).length;
    
    // Target 10,000 words. If less than 8,000, rebuild.
    if (wordCount > 9000) {
      console.log(`⏭️  Skipping ${path.basename(path.dirname(pagePath))} - Already massive.`);
      continue;
    }

    const titleMatch = content.match(/title="([^"]+)"/);
    const title = titleMatch ? titleMatch[1] : path.basename(path.dirname(pagePath));
    
    const data = await generate10kWords(title);
    if (data) {
      const regex = /<CalculatorSEO[\s\S]*?\/>/;
      const newJSX = buildJSX(title, data);
      fs.writeFileSync(pagePath, content.replace(regex, newJSX), 'utf-8');
      console.log(`✅ SUCCESS: ${title} updated to 10k+ words.`);
      await new Promise(r => setTimeout(r, 10000));
    }
  }
}

run();
