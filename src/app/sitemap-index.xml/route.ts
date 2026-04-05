import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.calculator-all.com';
  
  // 1. Get all keyword mapping files to generate sitemap URLs
  const dataDir = path.join(process.cwd(), 'src', 'data');
  const files = fs.readdirSync(dataDir).filter(f => f.startsWith('keyword-mapping-') && f.endsWith('.json'));
  
  const keywordSitemaps = files
    .map(f => {
      const name = f.replace('keyword-mapping-', '').replace('.json', '');
      if (name === '0' || name === '1') return null; // Skip legacy numeric ones if we use them differently
      return `${siteUrl}/programmatic-sitemaps/keywords-${name}.xml`;
    })
    .filter(Boolean);

  // 2. Add the 54 parameter-driven sitemap chunks
  const numericSitemaps = Array.from({ length: 54 }, (_, i) => `${siteUrl}/programmatic-sitemaps/${i + 1}.xml`);

  // 3. Build the Index XML
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Static Sitemap -->
  <sitemap>
    <loc>${siteUrl}/sitemap.xml</loc>
  </sitemap>
  
  <!-- Programmatic Variable Chunks (1-54) -->
  ${numericSitemaps.map(url => `  <sitemap>
    <loc>${url}</loc>
  </sitemap>`).join('\n')}

  <!-- Programmatic Keyword-based Sitemaps (${keywordSitemaps.length}000+ URLs) -->
  ${keywordSitemaps.map(url => `  <sitemap>
    <loc>${url}</loc>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  return new NextResponse(sitemapIndex, {
    status: 200,
    headers: {
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
      'Content-Type': 'text/xml',
    },
  });
}
