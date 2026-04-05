import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.calculator-all.com';
  
  // 1. Get all keyword mapping files (newly added from CSVs)
  const dataDir = path.join(process.cwd(), 'src', 'data');
  const files = fs.readdirSync(dataDir).filter(f => f.startsWith('keyword-mapping-') && f.endsWith('.json'));
  
  const keywordSitemaps = files
    .map(f => {
      const name = f.replace('keyword-mapping-', '').replace('.json', '');
      
      // Map to exact filenames seen in Google Search Console screenshot
      if (name === '0') {
        return `${siteUrl}/programmatic-sitemaps/keywords.xml`;
      }
      if (name === '1') {
        return `${siteUrl}/programmatic-sitemaps/keywords-1.xml`;
      }
      
      // New CSV-based mappings
      return `${siteUrl}/programmatic-sitemaps/keywords-${name}.xml`;
    })
    .sort() // Consistent order
    .filter(Boolean);

  // 2. Build the Keyword-specific Index XML
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Sitemap Index for all ${keywordSitemaps.length} keyword-based SEO categories -->
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
