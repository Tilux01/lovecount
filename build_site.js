import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(fileURLToPath(import.meta.url));
const site = path.join(root, 'site');
const srcDir = path.join(root, 'landing-assets');

let html = fs.readFileSync(path.join(root, 'landing.html'), 'utf8');
const siteUrl = (process.env.SITE_URL || '').replace(/\/+$/, '');

if (siteUrl) {
  html = html.replace(/<meta property="og:image" content="([^"]+)">/, (m, v) => {
    const abs = /^https?:/.test(v) ? v : siteUrl + '/' + v.replace(/^\.?\//, '');
    return '<meta property="og:image" content="' + abs + '">';
  });
  if (/property="og:url"/.test(html)) {
    html = html.replace(/<meta property="og:url" content="[^"]*">/, '<meta property="og:url" content="' + siteUrl + '/">');
  } else {
    html = html.replace('<meta property="og:title"', '<meta property="og:url" content="' + siteUrl + '/">\n<meta property="og:title"');
  }
  if (/rel="canonical"/.test(html)) {
    html = html.replace(/<link rel="canonical" href="[^"]*">/, '<link rel="canonical" href="' + siteUrl + '/">');
  } else {
    html = html.replace('<link rel="icon"', '<link rel="canonical" href="' + siteUrl + '/">\n<link rel="icon"');
  }
}

fs.mkdirSync(site, { recursive: true });
fs.rmSync(path.join(site, 'landing-assets'), { recursive: true, force: true });
fs.cpSync(srcDir, path.join(site, 'landing-assets'), { recursive: true });
fs.writeFileSync(path.join(site, 'index.html'), html);

const bytes = fs.statSync(path.join(site, 'index.html')).size;
const count = fs.readdirSync(path.join(site, 'landing-assets')).length;
console.log('site ready: index.html ' + bytes + ' bytes, ' + count + ' assets' + (siteUrl ? ' , canonical ' + siteUrl : ''));
