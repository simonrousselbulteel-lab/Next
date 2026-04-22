import { rm, mkdir, copyFile } from 'fs/promises';
import { existsSync } from 'fs';

// Remove the dummy JS file emitted by the CSS-only vite build
const dummyJs = 'dist/style.js';
if (existsSync(dummyJs)) await rm(dummyJs);

// Copy built token CSS files into dist/tokens/
await mkdir('dist/tokens', { recursive: true });
await copyFile('tokens/build/variables.css', 'dist/tokens/variables.css');
await copyFile('tokens/build/semantic.css', 'dist/tokens/semantic.css');

console.log('post-build: dist/tokens/ populated, dummy JS removed.');
