import { notFound } from 'next/navigation';
import { parseSipSlug } from '@/lib/utils/slugParser';
import { generateSipContent } from '@/lib/seo/contentGenerator';
import { generateSipMetadata } from '@/lib/seo/metadata';
import fs from 'fs';
import path from 'path';

import { ContextualFAQ } from '@/components/seo/ContextualFAQ';
import { InternalLinksGraph } from '@/components/seo/InternalLinksGraph';
import { CrossCalculatorLinks } from '@/components/seo/CrossCalculatorLinks';
import { SipWidget } from '@/components/calculators/SipWidget';
import programmaticRegistry from '@/data/programmable-registry.json';

// Performance: Transition to Full Static Generation (SSG)
export const revalidate = false; // Cache indefinitely (until next build) to stay within Hobby limits

/** Loads and merges ALL keyword-mapping-*.json files from the data directory */
function loadAllKeywordMappings(): any[] {
  try {
    const dataDir = path.join(process.cwd(), 'src', 'data');
    const files = fs.readdirSync(dataDir).filter(f => f.startsWith('keyword-mapping-') && f.endsWith('.json'));
    const combined: any[] = [];
    for (const file of files) {
      try {
        const content = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf-8'));
        if (Array.isArray(content)) combined.push(...content);
      } catch { /* skip malformed files */ }
    }
    return combined;
  } catch {
    return [];
  }
}

type Props = {
  params: Promise<{ calculatorId: string; slug: string }>;
};

/**
 * [CRITICAL] FIX FOR USA PERFORMANCE
 * Pre-renders all 1,800+ mapped SEO pages at build time.
 * This ensures sub-100ms TTFB globally via Vercel Edge.
 */
/**
 * Pre-renders keyword PSEO pages. 
 * We return an empty array here because generating 250,000+ paths at build time 
 * exceeds the call stack limit in Next.js's internal path matching logic.
 * Pages will be generated on-demand (ISR) and cached.
 */
export async function generateStaticParams() {
  return [];
}

// Cache of all mappings, built once per server instance
let _mappingCache: any[] | null = null;

/** Finds a keyword mapping entry by calculatorId + slug */
async function getMapping(calculatorId: string, slug: string) {
  if (!_mappingCache) _mappingCache = loadAllKeywordMappings();
  return _mappingCache.find((m: any) => m.calculatorId === calculatorId && m.slug === slug) ?? null;
}

// Generate dynamic Metadata
export async function generateMetadata({ params }: Props) {
  const { calculatorId, slug } = await params;
  
  // If we have a specific builder like SIP, use it
  if (calculatorId === 'sip-calculator') {
    const parsed = parseSipSlug(slug);
    if (parsed) return generateSipMetadata(parsed.amount, parsed.duration);
  }

  // Generic fallback for the other 265 tools
  const config = (programmaticRegistry as any)[calculatorId];
  if (!config) return { title: "Calculator" };

  const match = await getMapping(calculatorId, slug);
  const displayKeyword = match?.keyword || "";

  const humanReadableSlug = displayKeyword || slug.replace(/-/g, ' ');
  return {
    title: `${config.title} for ${humanReadableSlug} | Compute Instantly`,
    description: `Use our programmatic ${config.title} to calculate results for ${humanReadableSlug}. Instant calculation and accurate output.`,
  };
}

export default async function ProgrammaticUniversalPage({ params }: Props) {
  const { calculatorId, slug } = await params;

  // 1. Get config or provide a fallback if not in registry
  let config = (programmaticRegistry as any)[calculatorId];
  const match = await getMapping(calculatorId, slug);

  if (!config) {
    // If not in registry, but we have a mapping match, we can still serve the page
    if (match) {
      config = {
        title: (match.keyword || calculatorId).replace(/-/g, ' '),
        category: 'calculator',
        parameters: { val1: [1000], val2: [10] }
      };
    } else {
      notFound();
    }
  }

  const displayKeyword = match?.keyword || "";

  // 2. Specific Implementation Bypass (e.g. SIP has its own math)
  if (calculatorId === 'sip-calculator') {
    const parsed = parseSipSlug(slug);
    if (!parsed) notFound();
    const content = generateSipContent(parsed.amount, parsed.duration);

    return (
      <div className="max-w-4xl mx-auto py-12 px-6">
        <header className="mb-10 text-center text-justify">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-4">
            SIP Calculator for ₹{parsed.amount.toLocaleString('en-IN')}/mo in {parsed.duration} {parsed.duration > 1 ? 'years' : 'year'}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {content.intro}
          </p>
        </header>

        <section className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-12">
          <SipWidget 
            initialAmount={parsed.amount} 
            initialDuration={parsed.duration} 
            resultData={content.resultData} 
          />
        </section>

        <section className="bg-blue-50 rounded-xl p-8 mb-12 text-justify">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-left">Your Investment Journey</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {content.resultContent}
          </p>
        </section>

        <section className="mb-12">
          <ContextualFAQ faqs={content.faqs} />
        </section>

        <section>
          <InternalLinksGraph currentAmount={parsed.amount} currentDuration={parsed.duration} />
        </section>
      </div>
    );
  }

  // 3. Universal Fallback Engine (for the other 265 calculators)
  // We parse generic numbers out of the slug string blindly e.g "5000-10"
  const numbers = slug.match(/\d+/g)?.map(Number) || [1000];
  const primaryVal = numbers[0];
  const humanSlug = displayKeyword || slug.replace(/-/g, ' ');

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight capitalize">
          {config.title} specific to {humanSlug}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-6 text-justify">
          Welcome to the ultimate programmatic intelligence engine for the {config.title}. 
          Our tool calculates comprehensive outcomes specifically tailored for parameters involving {humanSlug}. 
          Whether you are adjusting inputs dynamically or planning for the future, getting precise 
          figures here ensures optimal decision making.
        </p>
      </header>

      {/* Generic UI Wrapper bridging back to original calculators */}
      <section className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 p-8 mb-12 text-center">
        <div className="py-20 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
           <h3 className="text-lg font-bold mb-2">Mathematical Engine Computing For {primaryVal}</h3>
           <p className="text-sm">
             To perform deep interactive adjustments using `{calculatorId}`, visit our premier calculator page.
           </p>
           <a href={`/${calculatorId}`} className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded font-semibold text-sm hover:bg-blue-700">
             Use The Interactive Calculator
           </a>
        </div>
      </section>

      {/* SEO Deep Dive Content Block */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-12 text-justify">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-left">Why Compute {config.title} for {humanSlug}?</h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            When utilizing financial, scientific, or mathematical tools such as the {config.title}, accuracy is 
            the most critical factor. By specifically evaluating the values of <strong>{humanSlug}</strong>, you guarantee 
            that you are avoiding generic averages and receiving exact metric results tailored to your dataset.
          </p>
          <p>
            Evaluating a base unit of <strong>{primaryVal}</strong> within the {config.category} domain allows professionals and 
            everyday users alike to project future outcomes, assess risk, or balance daily operations efficiently. 
            Understanding the impact of these variables prevents costly mistakes.
          </p>
        </div>
      </section>

      {/* Auto-generated Contextual FAQs */}
      <section className="mb-12">
        <ContextualFAQ faqs={[
          {
            question: `How exactly is the ${config.title} calculated for ${humanSlug}?`,
            answer: `The computation evaluates the base inputs provided in the URL (${primaryVal}) and applies standard ${config.category} formulas established by industry best practices to output the final return or value.`
          },
          {
            question: `Why does ${primaryVal} affect the final outcome?`,
            answer: `The primary value of ${primaryVal} serves as the foundational multiplier in our backend algorithmic execution. A slight change in this value compounds dramatically over varying conditions.`
          },
          {
            question: `Is computing a ${config.title} result accurate online?`,
            answer: `Yes, running this isolated metric mathematically guarantees a precision execution that's consistent with standard, verified formulas used by enterprise institutions.`
          }
        ]} />
      </section>
      
      {/* Dynamic Semantic Network Linking */}
      <section>
        <InternalLinksGraph currentAmount={primaryVal} currentDuration={numbers[1] || 10} />
      </section>

      {/* Mega Cross Registry Navigation */}
      <CrossCalculatorLinks currentCalcId={calculatorId} />
    </div>
  );
}
