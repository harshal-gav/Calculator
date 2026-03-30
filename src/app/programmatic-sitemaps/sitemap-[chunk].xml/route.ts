import { NextResponse } from 'next/server';
import registry from '@/data/programmable-registry.json';

// Google allows 50,000 URLs per sitemap, we use 10,000 to be safe on generation time
const BATCH_SIZE = 10000;

export async function GET(request: Request, { params }: { params: Promise<{ chunk: string }> }) {
  const { chunk } = await params;
  const chunkId = parseInt(chunk, 10);

  if (isNaN(chunkId)) {
    return new NextResponse('Invalid sitemap chunk', { status: 400 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.calculator-all.com';
  const urls: string[] = [];

  // Iterate over 266 calculators to build universal SEO links
  const calculators = Object.keys(registry);

  for (const calcId of calculators) {
    const config = (registry as any)[calcId];
    
    // Using generative parameters established during scripts/generate-programmatic-registry.ts
    const v1 = config.parameters.val1;
    const v2 = config.parameters.val2;

    for (const amt of v1) {
      for (const dur of v2) {
        // Universal Slug Formatter
        const slug = `${amt}-${dur}-units`;
        urls.push(`${siteUrl}/programmatic-seo/${calcId}/${slug}`);
      }
    }
  }

  // Segment the 532,000 URLs into their respective 10,000 chunk slice
  const startIndex = (chunkId - 1) * BATCH_SIZE;
  const endIndex = chunkId * BATCH_SIZE;
  const batch = urls.slice(startIndex, endIndex);

  // If they request a chunk that doesn't exist anymore (e.g. chunk 999 where there's no urls)
  if (batch.length === 0) {
    return new NextResponse('Sitemap Chunk not found', { status: 404 });
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${batch.map((url) => {
        return `
          <url>
            <loc>${url}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.7</priority>
          </url>
        `;
      }).join('')}
    </urlset>
  `;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
      'Content-Type': 'text/xml',
    },
  });
}
