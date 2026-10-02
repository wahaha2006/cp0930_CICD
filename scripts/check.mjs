import { readFile, mkdir, copyFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { Script } from 'node:vm';

const html = await readFile('index.html', 'utf8');
assert.match(html, /<!doctype html>/i, 'Missing HTML document declaration');
assert.match(html, /<title>[^<]+<\/title>/i, 'Missing page title');
assert.ok(/<h1\b[^>]*>[\s\S]+?<\/h1>/i.test(html), 'Missing website heading');
assert.doesNotMatch(html, /(?:file:\/\/\/|C:\\Users\\)/i, 'Local filesystem reference cannot be deployed');
let count = 0;
for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
  if (/\bsrc\s*=|\btype\s*=\s*["'](?:application\/ld\+json|application\/json|module)["']/i.test(match[1])) continue;
  new Script(match[2], { filename: `inline-script-${++count}.js` });
}
assert.ok(count > 0, 'Missing interactive scripts');
await mkdir('dist', { recursive: true });
await copyFile('index.html', 'dist/index.html');
console.log(`Page checks passed; ${count} script(s) compiled. Only index.html will be published.`);
