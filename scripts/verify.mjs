import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { setTimeout } from 'node:timers/promises';

const url = 'https://chenpu-little-world-98e6.surge.sh/';
const digest = value => createHash('sha256').update(value).digest('hex');
const expected = digest(await readFile('dist/index.html'));
for (let attempt = 1; attempt <= 6; attempt++) {
  try {
    const response = await fetch(`${url}?release=${process.env.GITHUB_SHA || Date.now()}`, {
      signal: AbortSignal.timeout(30000), cache: 'no-store'
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    if (digest(Buffer.from(await response.arrayBuffer())) !== expected) throw new Error('Published content does not match this release');
    console.log(`Verified latest release: ${url}`);
    process.exit(0);
  } catch (error) {
    console.log(`Verification ${attempt}/6: ${error.message}`);
    if (attempt < 6) await setTimeout(10000);
  }
}
throw new Error('Unable to verify published release');
