import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appDir = path.join(__dirname, '../src/app');

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.isFile() && (entry.name === 'layout.tsx' || entry.name === 'page.tsx')) {
      // Skip the root app layout and page, as we already handled them.
      if (fullPath === path.join(appDir, 'layout.tsx') || fullPath === path.join(appDir, 'page.tsx')) {
          continue;
      }

      const parentDirName = path.basename(dir);
      
      // If the parent dir is a group folder or the root app dir, it's not a valid unique route.
      // (Like src/app/(math)/page.tsx which doesn't exist, but if it did it'd be bad)
      if (parentDirName.startsWith('(') && parentDirName.endsWith(')') || parentDirName === 'app') {
          continue;
      }
      
      const canonicalPath = `/${parentDirName}/`;

      let content = fs.readFileSync(fullPath, 'utf8');

      // Check if metadata is exported at all
      const metadataRegex = /export\s+const\s+metadata(?:\s*:\s*Metadata)?\s*=\s*\{/;
      
      if (metadataRegex.test(content)) {
          // If alternates is already in there, skip it
          if (content.includes('alternates:')) {
              continue;
          }

          content = content.replace(metadataRegex, `export const metadata: Metadata = {\n  alternates: {\n    canonical: '${canonicalPath}',\n  },`);
          
          // Make sure Metadata is imported if it wasn't already (since we cast it as ": Metadata")
          if (!content.includes('import { Metadata }') && !content.includes('import type { Metadata }')) {
            content = `import { Metadata } from "next";\n` + content;
          }

          fs.writeFileSync(fullPath, content, 'utf8');
          console.log(`Injected canonical ${canonicalPath} into ${fullPath}`);
      }
    }
  }
}

processDirectory(appDir);
console.log("Finished injecting canonical alternate URLs.");
