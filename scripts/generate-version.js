import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pkg from '../package.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const content = `// Auto-generated file - do not edit manually
export const APP_VERSION = '${pkg.version}';
`;

const outputPath = join(__dirname, '../src/version.ts');
writeFileSync(outputPath, content, 'utf-8');

console.log(`✓ Generated version.ts with version ${pkg.version}`);
