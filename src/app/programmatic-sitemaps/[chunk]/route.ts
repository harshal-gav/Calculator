import { NextResponse } from 'next/server';
import registry from '@/data/programmable-registry.json';

// Google allows 50,000 URLs per sitemap, we use 10,000 to be safe on generation time
const BATCH_SIZE = 10000;

export async function GET(request: Request, { params }: { params: Promise<{ chunk: string }> }) {
  const { chunk } = await params;
  // Extract chunk sequence out of filenames like "sitemap-1.xml" or "1"
  const chunkId = parseInt(chunk.replace(/\D/g, ''), 10);

  if (isNaN(chunkId) || chunkId <= 0) {
    return new NextResponse('Invalid sitemap chunk', { status: 400 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.calculator-all.com';
  const urls: string[] = [];

  // 1. Base Parameter-driven URLs (from existing registry)
  const calculators = Object.keys(registry);

  for (const calcId of calculators) {
    const config = (registry as any)[calcId];
    const v1 = config.parameters.val1;
    const v2 = config.parameters.val2;

    for (const amt of v1) {
      for (const dur of v2) {
        const slug = `${amt}-${dur}-units`;
        urls.push(`${siteUrl}/programmatic-seo/${calcId}/${slug}`);
      }
    }
  }

  // 2. Keyword-driven URLs (Mapped from CSV)
  try {
    const keywordMapping = require('@/data/keyword-mapping.json');
    if (Array.isArray(keywordMapping)) {
      keywordMapping.forEach((item: any) => {
        urls.push(`${siteUrl}/programmatic-seo/${item.calculatorId}/${item.slug}`);
      });
    }
  } catch (e) {
    console.error("Keyword mapping not found or invalid", e);
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
