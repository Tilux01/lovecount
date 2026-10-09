import { APP_HTML } from './src/shell.js';
import fs from 'fs';
fs.writeFileSync('index.html', APP_HTML);
