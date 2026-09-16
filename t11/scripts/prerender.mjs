import { readFile, writeFile } from 'node:fs/promises';
import { render } from '../.sites-runtime/ssr/entry-server.js';
const path = new URL('../dist/index.source.html', import.meta.url);
const template = await readFile(path, 'utf8');
if (!template.includes('<div id="root"></div>')) throw new Error('Missing root for prerender');
await writeFile(new URL('../dist/index.html', import.meta.url), template.replace('<div id="root"></div>', () => `<div id="root">${render()}</div>`));
console.log('HTML prerendered: content available before JavaScript.');
