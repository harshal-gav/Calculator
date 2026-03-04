const fs = require('fs');
const path = require('path');

const srcAppDir = path.join(__dirname, '../src/app');
const publicDir = path.join(__dirname, '../public');
const sitemapPath = path.join(publicDir, 'sitemap.xml');

const baseUrl = 'https://www.calculator-all.com';

// Function to recursively find all route directories
function getRoutes(dir, basePath = '') {
    let routes = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        if (entry.isDirectory()) {
            // Ignore route groups like (financial)
            const isRouteGroup = entry.name.startsWith('(') && entry.name.endsWith(')');

            const fullPath = path.join(dir, entry.name);
            const routePath = isRouteGroup ? basePath : `${basePath}/${entry.name}`;

            // Check if it has a page.tsx
            if (fs.existsSync(path.join(fullPath, 'page.tsx')) && routePath !== '') {
                routes.push(routePath);
            }

            routes = routes.concat(getRoutes(fullPath, routePath));
        }
    }

    return routes;
}

const routes = getRoutes(srcAppDir);
// Remove duplicates just in case
const uniqueRoutes = [...new Set(routes)];

const date = new Date().toISOString();

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<!-- Auto-generated sitemap -->
`;

// Add home page
xml += `  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

// Add all other pages
for (const route of uniqueRoutes) {
    xml += `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
}

xml += `</urlset>`;

fs.writeFileSync(sitemapPath, xml);
console.log(`Successfully generated sitemap.xml with ${uniqueRoutes.length + 1} URLs.`);
