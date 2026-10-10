import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(root, 'lovecount-app');

const ICONS = [
  'apple-touch-icon.png',
  'apple-touch-icon-152.png',
  'apple-touch-icon-167.png',
  'icon-192.png',
  'icon-512.png',
  'icon.png',
  'favicon.png',
  'android-icon-foreground.png',
  'logo.svg'
];

const VERCEL = {
  $schema: 'https://openapi.vercel.sh/vercel.json',
  trailingSlash: false,
  headers: [
    {
      source: '/sw.js',
      headers: [
        { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
        { key: 'Service-Worker-Allowed', value: '/' }
      ]
    },
    {
      source: '/manifest.webmanifest',
      headers: [
        { key: 'Cache-Control', value: 'no-cache' },
        { key: 'Content-Type', value: 'application/manifest+json' }
      ]
    },
    {
      source: '/index.html',
      headers: [{ key: 'Cache-Control', value: 'no-cache' }]
    },
    {
      source: '/assets/(.*)',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
    },
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
      ]
    }
  ]
};

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, 'assets'), { recursive: true });

fs.copyFileSync(path.join(root, 'index.html'), path.join(out, 'index.html'));
fs.copyFileSync(path.join(root, 'manifest.webmanifest'), path.join(out, 'manifest.webmanifest'));
fs.copyFileSync(path.join(root, 'sw.js'), path.join(out, 'sw.js'));

let n = 0;
for (const f of ICONS) {
  const src = path.join(root, 'assets', f);
  if (!fs.existsSync(src)) continue;
  fs.copyFileSync(src, path.join(out, 'assets', f));
  n += 1;
}

fs.writeFileSync(path.join(out, 'vercel.json'), JSON.stringify(VERCEL, null, 2) + '\n');

const kb = (f) => Math.round(fs.statSync(path.join(out, f)).size / 1024);
console.log('pwa build ready: index.html ' + kb('index.html') + 'kb, ' + n + ' icons, sw.js ' + kb('sw.js') + 'kb');
