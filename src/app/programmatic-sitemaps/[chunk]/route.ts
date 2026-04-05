import { NextResponse } from 'next/server';
import registry from '@/data/programmable-registry.json';
import fs from 'fs';
import path from 'path';

// Google allows 50,000 URLs per sitemap, we use 10,000 to be safe on generation time
const BATCH_SIZE = 10000;

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.calculator-all.com';

/** Loads a keyword mapping JSON file by name (e.g. "compound-interest-calculator") */
function loadKeywordMapping(name: string): any[] | null {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', `keyword-mapping-${name}.json`);
    const content = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function buildXmlSitemap(urls: string[], priority = '0.8'): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`;
}

export async function GET(_request: Request, { params }: { params: Promise<{ chunk: string }> }) {
  const { chunk } = await params;

  // ── Keyword Sitemaps ──────────────────────────────────────────────────────
  // Pattern: keywords-{calculator-name}.xml  →  keyword-mapping-{calculator-name}.json
  // Also supports bare "keywords" (→ mapping-0) and "keywords-1" (→ mapping-1) for legacy
  if (chunk.startsWith('keywords')) {
    const chunkName = chunk.replace(/\.xml$/, '');
    const namedMatch = chunkName.match(/^keywords-(.+)$/);

    let mapping: any[] | null = null;

    if (namedMatch) {
      const mappingName = namedMatch[1];
      // First try: exact named mapping (e.g. keyword-mapping-compound-interest-calculator.json)
      mapping = loadKeywordMapping(mappingName);
      // Legacy fallback: "keywords-1" → keyword-mapping-1.json
      if (!mapping && chunkName === 'keywords-1') {
        mapping = loadKeywordMapping('1');
      }
    } else {
      // Bare "keywords" → keyword-mapping-0.json
      mapping = loadKeywordMapping('0');
    }

    if (!mapping) {
      return new NextResponse('Keywords Mapping not found', { status: 404 });
    }

    const keywordUrls = mapping.map(
      (item: any) => `${SITE_URL}/programmatic-seo/${item.calculatorId}/${item.slug}`
    );

    return new NextResponse(buildXmlSitemap(keywordUrls, '0.8'), {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=86400, stale-while-revalidate',
        'Content-Type': 'text/xml',
      },
    });
  }

  // ── Numeric Chunk Sitemaps ─────────────────────────────────────────────────
  // Pattern: {number}.xml or just {number}  →  parameter-driven URL batch
  const chunkId = parseInt(chunk.replace(/\D/g, ''), 10);

  if (isNaN(chunkId) || chunkId <= 0) {
    return new NextResponse('Invalid sitemap chunk', { status: 400 });
  }

  const urls: string[] = [];
  const calculators = Object.keys(registry);

  for (const calcId of calculators) {
    const config = (registry as any)[calcId];
    const v1 = config.parameters.val1;
    const v2 = config.parameters.val2;

    for (const amt of v1) {
      for (const dur of v2) {
        const slug = `${amt}-${dur}-units`;
        urls.push(`${SITE_URL}/programmatic-seo/${calcId}/${slug}`);
      }
    }
  }

  const startIndex = (chunkId - 1) * BATCH_SIZE;
  const batch = urls.slice(startIndex, chunkId * BATCH_SIZE);

  if (batch.length === 0) {
    return new NextResponse('Sitemap Chunk not found', { status: 404 });
  }

  return new NextResponse(buildXmlSitemap(batch, '0.7'), {
    status: 200,
    headers: {
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
      'Content-Type': 'text/xml',
    },
  });
}
