import { NextResponse } from 'next/server';
import registry from '@/data/programmable-registry.json';
import fs from 'fs';
import path from 'path';

// Google allows 50,000 URLs per sitemap, we use 10,000 as requested by the user
const GLOBAL_BATCH_SIZE = 10000;

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.calculator-all.com';

/** Loads all keywords from all mapping files in src/data/ and returns a sorted list of absolute URLs */
function getAllKeywordUrls(): string[] {
  const dataDir = path.join(process.cwd(), 'src', 'data');
  const files = fs.readdirSync(dataDir)
    .filter(f => f.startsWith('keyword-mapping-') && f.endsWith('.json'))
    .sort((a, b) => {
        // Ensure 0 and 1 come first for continuity
        if (a === 'keyword-mapping-0.json') return -1;
        if (b === 'keyword-mapping-0.json') return 1;
        if (a === 'keyword-mapping-1.json') return -1;
        if (b === 'keyword-mapping-1.json') return 1;
        return a.localeCompare(b);
    });

  const allUrls: string[] = [];

  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(dataDir, file), 'utf-8');
      const mapping = JSON.parse(content);
      if (Array.isArray(mapping)) {
        for (const item of mapping) {
          if (item.calculatorId && item.slug) {
            // Include trailing slash to match canonical URL configuration
            allUrls.push(`${SITE_URL}/programmatic-seo/${item.calculatorId}/${item.slug}/`);
          }
        }
      }
    } catch (e) {
      console.error(`Error loading ${file}:`, e);
    }
  }

  return allUrls;
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
  const chunkName = chunk.replace(/\.xml$/, '');

  // ── Keyword Sitemaps (Consolidated 10k Batches) ────────────────────────────
  // Pattern: keywords-{number}.xml  (e.g. keywords-1.xml)
  // Also supports bare "keywords" as keywords-1 for legacy redirects
  if (chunkName.startsWith('keywords')) {
    const pageNumStr = chunkName.match(/\d+/)?.[0];
    const pageNum = pageNumStr ? parseInt(pageNumStr, 10) : 1;

    if (pageNum <= 0) {
      return new NextResponse('Invalid keywords chunk', { status: 400 });
    }

    const allUrls = getAllKeywordUrls();
    const startIndex = (pageNum - 1) * GLOBAL_BATCH_SIZE;
    const batch = allUrls.slice(startIndex, pageNum * GLOBAL_BATCH_SIZE);

    if (batch.length === 0) {
      return new NextResponse('Keywords Sitemap Chunk not found', { status: 404 });
    }

    return new NextResponse(buildXmlSitemap(batch, '0.8'), {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=86400, stale-while-revalidate',
        'Content-Type': 'text/xml',
      },
    });
  }

  // ── Numeric Chunk Sitemaps (Legacy 1-54 batching logic) ─────────────────────
  // Pattern: sitemap-{number}.xml or just numeric {number}
  const chunkId = parseInt(chunkName.replace(/\D/g, ''), 10);

  if (isNaN(chunkId) || chunkId <= 0) {
    return new NextResponse('Invalid sitemap chunk', { status: 400 });
  }

  const urls: string[] = [];
  const calculators = Object.keys(registry);

  // Note: legacy chunks use a 10,000 batch size now to be consistent
  for (const calcId of calculators) {
    const config = (registry as any)[calcId];
    const v1 = config.parameters.val1;
    const v2 = config.parameters.val2;

    for (const amt of v1) {
      for (const dur of v2) {
        const slug = `${amt}-${dur}-units`;
        // Ensure trailing slash here too
        urls.push(`${SITE_URL}/programmatic-seo/${calcId}/${slug}/`);
      }
    }
  }

  const startIndex = (chunkId - 1) * GLOBAL_BATCH_SIZE;
  const batch = urls.slice(startIndex, chunkId * GLOBAL_BATCH_SIZE);

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
