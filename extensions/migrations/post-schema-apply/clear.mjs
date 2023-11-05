/**
 * Remove every migration file from ../ contaning TEMP. in the name
 */

import fs from 'fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

clear()

async function clear() {

  const parentDir = `${__dirname}/../`;

  const migrationFiles = fs.readdirSync(parentDir)
    .filter((file) => /^[0-9]+[A-Z]?-[^.]+\.(?:mjs|js|ts)$/.test(file));

  for (const file of migrationFiles) {
    if (file.includes('-TEMP-')) {
      const source = `${parentDir}${file}`;
      fs.unlinkSync(source);
    }
  }
}