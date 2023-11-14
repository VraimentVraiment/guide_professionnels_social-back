/**
 * This script copies all migration files from the `extensions/migrations/post-schema-apply` directory
 * to the `extensions/migrations` directory.
 * We need those migrations to run after the schema has been applied.
 * 
 * @see https://github.com/directus/directus/discussions/9165
 */

import fs from 'fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

run()

async function run() {
	const migrationFiles = fs.readdirSync(__dirname)
    .filter((file) => /^[0-9]+[A-Z]?-[^.]+\.(?:mjs|js|ts)$/.test(file));

  for (const file of migrationFiles) {
    const source = `${__dirname}/${file}`;
    const destination = `${__dirname}/../${file.replace('-', '-TEMP-')}`;
    fs.copyFileSync(source, destination);
  }
}