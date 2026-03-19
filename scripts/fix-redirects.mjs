import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirsToProcess = [
  path.join(__dirname, '../src/app'),
  path.join(__dirname, '../src/components')
];

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.isFile() && (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      // Replace href="/something" with href="/something/"
      const hrefRegex = /href="\/([a-zA-Z0-9-]+)"/g;
      if (hrefRegex.test(content)) {
        content = content.replace(hrefRegex, 'href="/$1/"');
        modified = true;
      }

      // Replace path: "/something" with path: "/something/"
      const pathRegex = /path:\s*["']\/([a-zA-Z0-9-]+)["']/g;
      if (pathRegex.test(content)) {
        content = content.replace(pathRegex, 'path: "/$1/"');
        modified = true;
      }

      // Replace href={'/something'} with href={'/something/'}
      const hrefObjRegex = /href=\{\s*["']\/([a-zA-Z0-9-]+)["']\s*\}/g;
      if (hrefObjRegex.test(content)) {
        content = content.replace(hrefObjRegex, 'href={"/$1/"}');
        modified = true;
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log("Updated: " + fullPath);
      }
    }
  }
}

dirsToProcess.forEach(dir => processDirectory(dir));
console.log("Finished adding trailing slashes to internal links.");
